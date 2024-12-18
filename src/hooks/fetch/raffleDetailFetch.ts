import { AppConfig } from "@/config";
import type { RaffleDetailQueryOpts } from "@/types";
import { formatQueryParams } from "@/utils/queryParams";

export async function raffleDetailFetch(opts: RaffleDetailQueryOpts) {
  try {
    const data = await fetch(
      `${AppConfig.apiHost}/api/raffles/${opts.chainId}/${opts.chainId}_${
        opts.id
      }?${formatQueryParams({})}`
    );
    return data && (await data.json());
  } catch (ex) {
    return {
      data: null,
    };
  }
}
