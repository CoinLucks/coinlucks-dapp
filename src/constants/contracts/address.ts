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
      address: "0x322813Fd9A801c5507c9de605d63CEA4f2CE6c44",
    },
    [ContractNames.Referral]: {
      address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    },
    [ContractNames.DiceShake]: {
      address: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
      staking: "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e",
    },
    [ContractNames.CoinFlip]: {
      address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
      staking: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    },
    [ContractNames.Scratch69]: {
      address: "0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1",
      staking: "0x68B1D87F95878fE05B998F19b66F4baba5De1aed",
    },
  },
  [ChainId.ETHEREUM]: {
    [ContractNames.RaffleContract]: {
      address: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
    },
    [ContractNames.Referral]: {
      address: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
    },
  },
  [ChainId.BNB]: {
    [ContractNames.RaffleContract]: {
      address: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
    },
    [ContractNames.Referral]: {
      address: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
    },
  },
  [ChainId.BNB_TESTNET]: {
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
      address: "0x6d50a93e2717B1f58886E9004941107EC658ab7D",
    },
    [ContractNames.Referral]: {
      address: "0xAE8794fE674a8519abB023B93a836F542515a61E",
    },
    [ContractNames.DiceShake]: {
      address: "0x2Bff3954d1Af8020Ca73FC16dfBE12B98f5dd38C",
      staking: "0xD4CFACBc0c5af3c1a950A0Ec496D9F76e97e03C1",
    },
    [ContractNames.CoinFlip]: {
      address: "0xc38Be75604c74214b64E6a32a8987B674E38b3B6",
      staking: "0xf187dC4A165e2bD46D5b77C30e7f6Bd77a8bEc6a",
    },
    [ContractNames.Scratch69]: {
      address: "0xA1c7eeD137BC103AfF5ff4EA3F7021542677618B",
      staking: "0xFb4d157dC7a8484a10A65D9B29f832e2E6A91B02",
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
