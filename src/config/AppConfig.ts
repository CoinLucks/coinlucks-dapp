// FIXME: Update this configuration file based on your project information
export const AppConfig = {
  name: "CoinLucks",
  host: process.env.NEXT_PUBLIC_HOST,
  apiHost: process.env.NEXT_PUBLIC_API_HOST,
  defaultChainId: Number(process.env.NEXT_PUBLIC_DEFAULT_CHAIN || '5611'),
  ipfsGateway: "https://purple-peaceful-galliform-606.mypinata.cloud",
};
