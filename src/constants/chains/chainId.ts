export enum ChainId {
  ETHEREUM = 1,
  BNB = 56,
  BNB_TESTNET = 97,
  OPBNB_TESTNET = 5611,
  OPBNB = 204,
  LOCALHOST = 1337
}

export const testnetChainIds = [
  ChainId.BNB_TESTNET,
  ChainId.OPBNB_TESTNET,
  ChainId.LOCALHOST
]

export const isTestnet = (chainId: number) => {
  return testnetChainIds.includes(chainId);
}