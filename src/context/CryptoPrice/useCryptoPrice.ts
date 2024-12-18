import { useQuery } from "react-query";

import { SLOW_INTERVAL } from "@/constants/interval";
import { getBNBPriceFromOracle } from "@/hooks/useBNBPrice";

/**
 * Chainlink feed doesn't tend to up date that quickly.
 * Refresh every 5 minutes.
 */
const PRICE_REFRESH_INTERVAL = 60 * 1000 * 5; // 5 minutes

/**
 * Return the current price of Crypto in USD.
 * @example 1234.69
 */
export function useCryptoPrice() {
  return useQuery(
    "cryptoPrice",
    async () => {
      return getBNBPriceFromOracle().then((value: any) => ([
        { name: "BNB", price: Number(value) },
        { name: "tBNB", price: Number(value) }
      ]));
      // return axios
      //   .get<CryptoPrice[]>(`${AppConfig.apiHost}/api/prices`)
      //   .then((res: any) => (res.data.state == true ? res.data.data : null));
    },
    {
      staleTime: PRICE_REFRESH_INTERVAL,
      refetchInterval: SLOW_INTERVAL,
      enabled: true,
    }
  );
}
