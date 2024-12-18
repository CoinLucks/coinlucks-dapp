import { Address } from "viem";

import { BetStats, BetStatus } from "@/types/bet";

import { publicClient } from "../publicClient";
import { loadContractAbi } from "../useContractAbi";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function queryBetResultWithRetry(
  chainId: number,
  contractAddress: Address,
  betId: number,
  maxRetries = 20,
  initialDelay = 3000,
  backoffFactor = 1
) {
  let currentDelay = initialDelay;
  const client = publicClient(chainId);
  const abi = await loadContractAbi(chainId, contractAddress);

  const readDrawNumbers = async (betId: bigint) => {
    const numbers: number[] = [];
    let index = 0n;

    while (true) {
      try {
        const result = await client.readContract({
          address: contractAddress,
          abi,
          functionName: "drawNumbers",
          args: [betId, index],
        });
        numbers.push(Number(result));
        index++;
      } catch (error) {
        break;
      }
    }
    return numbers;
  };

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const [player, betAmount, betStatus, winAmount] =
        (await client.readContract({
          address: contractAddress,
          abi: abi,
          functionName: "bets",
          args: [BigInt(betId)],
        })) as any[];

      if (betStatus && betStatus != BetStatus.Pending) {
        const drawNumbers = await readDrawNumbers(BigInt(betId));
        return {
          player,
          betAmount,
          betStatus,
          winAmount,
          drawNumbers: drawNumbers,
        } as BetStats;
      }

      console.log(
        `Attempt ${
          attempt + 1
        }: Bet Result not ready, retrying in ${currentDelay}ms...`
      );
      await sleep(currentDelay);

      currentDelay = Math.floor(currentDelay * backoffFactor);
    } catch (error) {
      console.error(`Error on attempt ${attempt + 1}:`, error);

      if (attempt === maxRetries - 1) {
        throw error;
      }
      await sleep(currentDelay);
      currentDelay = Math.floor(currentDelay * backoffFactor);
    }
  }

  throw new Error("Max retries reached. Unable to get bet result.");
}
