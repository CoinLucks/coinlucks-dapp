import { ChainId } from "@/constants/chains/chainId";
import { ContractAddress } from "@/hooks/useContractAbi";

import { ContractNames } from "./names";

type AddressMapping = {
  [chainId in ChainId]?: {
    [contractName in ContractNames]?: ContractAddress;
  };
};

export const DeployAddress: AddressMapping = {
  [ChainId.LOCALHOST]: {
    [ContractNames.RaffleContract]: {
      address: "0x5c74c94173F05dA1720953407cbb920F3DF9f887",
    },
    [ContractNames.Referral]: {
      address: "0x0355B7B8cb128fA5692729Ab3AAa199C1753f726",
    },
    [ContractNames.DiceShake]: {
      address: "0x8198f5d8F8CfFE8f9C413d98a0A55aEB8ab9FbB7",
      staking: "0xf4B146FbA71F41E0592668ffbF264F1D186b2Ca8",
    },
    [ContractNames.CoinFlip]: {
      address: "0x2B0d36FACD61B71CC05ab8F3D2355ec3631C0dd5",
      staking: "0x46b142DD1E924FAb83eCc3c08e4D46E82f005e0E",
    },
    [ContractNames.Scratch69]: {
      address: "0x7A9Ec1d04904907De0ED7b6839CcdD59c3716AC9",
      staking: "0x4631BCAbD6dF18D94796344963cB60d44a4136b6",
    },
  },
  [ChainId.OPBNB]: {
    [ContractNames.RaffleContract]: {
      address: "0xd1A0b428e8894f6Ddc98D33c75efd6b792a89844",
    },
    [ContractNames.Referral]: {
      address: "0x3DF3B3F2395325020FA84b2322c59A80697769c8",
    },
    [ContractNames.DiceShake]: {
      address: "0x2b8981ebDf4f476Ea4eF1084601381D25a8d7322",
      staking: "0xB0f049f84dC6Cd409F73B1A8032FcD424B2D51a7",
    },
    [ContractNames.CoinFlip]: {
      address: "0xa2FfDc31bc068e85F8862CF86316e299d1D4a721",
      staking: "0x0E0dc0A7059bd82156b343DE9f032Ec083e93eFD",
    },
    [ContractNames.Scratch69]: {
      address: "0x2463Cc71E05F65AD0e166C9d59EC5eCBEFe55F2c",
      staking: "0x94f3aA5931ab7Be9B0630AcceCFF3D86FF708A8A",
    },
  },
  [ChainId.OPBNB_TESTNET]: {
    [ContractNames.RaffleContract]: {
      address: "0x4B6b2BCe6e7c52185d81d2b4B3e15d614228d3fC",
    },
    [ContractNames.Referral]: {
      address: "0x5618A7AfF8175218E35eEec7a1C3E8431CABB03c",
    },
    [ContractNames.DiceShake]: {
      address: "0xc9f642B913D2772374c5b235B2Fa58d235DB8f0D",
      staking: "0xDAAD91eeF9066e259Fa63a55463EF14Ee749386b",
    },
    [ContractNames.CoinFlip]: {
      address: "0x55A5f64215868891521bFe1715D5bAC4c5c530F9",
      staking: "0x324640a4ec6d6055fb3b5124763ad15D7618f614",
    },
    [ContractNames.Scratch69]: {
      address: "0x4209bfe46b3118E4d8807Bd06aE918640A6cf179",
      staking: "0x353F5B915b439FB9282422f5C23EfffF9753873d",
    },
  },
};

export const getDeploysByName = (chainId: string, name?: ContractNames): any => {
  const contracts = DeployAddress[chainId as unknown as ChainId];
  if (!contracts || !name) {
    return undefined;
  }
  return {
    name: name as ContractNames,
    address: contracts[name]?.address,
    abi: name,
  };
};

export const getStakingDeploysByName = (
  chainId: string,
  name: ContractNames
): any => {
  const contracts = DeployAddress[chainId as unknown as ChainId];
  if (!contracts) {
    return undefined;
  }
  return {
    name: name as ContractNames,
    address: contracts[name]?.staking,
    abi: name,
  };
};

export const getDeploysByAddress = (chainId: ChainId, address: string) => {
  const contracts = DeployAddress[chainId];
  if (!contracts) {
    return undefined;
  }

  for (const contractName in contracts) {
    if (contracts.hasOwnProperty(contractName)) {
      const contract = contracts[contractName as ContractNames];
      if (contract && contract.address === address) {
        return {
          name: contractName as ContractNames,
          address: contract.address,
          abi: contractName,
        };
      }
      if (contract && contract.staking === address) {
        return {
          name: contractName as ContractNames,
          address: contract.staking,
          abi: "BetGameStaking",
        };
      }
    }
  }

  return undefined;
};
