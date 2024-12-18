import { Icon } from "@iconify/react";
import { Chip } from "@nextui-org/react";
import React from "react";
import { Address } from "viem";

import { useBetGameResultContext } from "@/context/BetGameResultContext";
import { useRefetchContext } from "@/context/RefetchContext";
import { BetStatus } from "@/types/bet";

const BetResult = ({
  chainId,
  contractAddress,
  betId,
  triggerKey,
  callback,
}: {
  chainId: number;
  contractAddress: Address;
  betId: number;
  triggerKey?: String;
  callback?: any;
}) => {
  const { triggerRefetch } = useRefetchContext();
  const { betResult, queryBet } = useBetGameResultContext();

  React.useEffect(() => {
    if (!betResult.result && !betResult.loading && !betResult.error) {
      queryBet({ chainId, contractAddress, betId });
    }

    if (betResult.result) {
      if (triggerKey) {
        triggerRefetch(triggerKey);
      }
      if (callback) {
        callback();
      }
    }
  }, [betId, betResult, queryBet]);

  if (betId && betResult.loading) return <Chip>Pending Draw</Chip>;

  if (!betResult.result) return <></>;

  if (betResult.result.betStatus == BetStatus.Won) {
    return (
      <Chip
        startContent={<Icon icon={"bx:wink-smile"} width={20} />}
        variant="flat"
        color="success"
      >
        Won
      </Chip>
    );
  }

  if (betResult.result.betStatus == BetStatus.Lost) {
    return (
      <Chip
        variant="flat"
        startContent={<Icon icon={"tabler:mood-sad-dizzy"} width={20} />}
      >
        Lost
      </Chip>
    );
  }
};

export default BetResult;
