import React from "react";
import { Address, formatEther } from "viem";

import CryptoCurrency from "@/components/CryptoCurrency";
import UserLink from "@/components/UserLink";
import { ContractNames } from "@/constants/contracts/names";
import useBetStakingPlayerStats from "@/hooks/game/useBetStakingPlayerStats";
import { StakingPlayer } from "@/types/bet/bet.staking";
import { Native } from "@/types/token";
import { getShortAddress } from "@/utils/address";


const LeaderboardItem = ({
  rank,
  item,
  token,
  gameName,
}: {
  rank: number;
  item: StakingPlayer;
  token: Native;
  gameName?: ContractNames;
}) => {
  const { playerStats, fetchStatus, refetch } = useBetStakingPlayerStats(
    item.chainId!,
    gameName!,
    item.player.id as Address
  );

  return (
    <div className="flex gap-6 items-center px-6 py-1 mt-2 w-full rounded-xl max-md:px-5 border border-divider">
      <div className="flex flex-1 shrink gap-2 items-center self-stretch my-auto basis-0">
        <div className="flex overflow-hidden flex-col self-stretch my-auto w-10">
          <div className="flex justify-center items-center text-xl font-bold leading-6 text-foreground-700">
            {rank}
          </div>
        </div>
        <div className="flex flex-col items-start my-auto">
          <div className="text-xs text-foreground">
            <UserLink
              className="justify-start min-h-[48px]"
              textWrapperClassName="flex flex-col text-sm justify-center"
              textClassName="ml-1 whitespace-nowrap text-ellipsis text-sm overflow-hidden max-w-32"
              id={item.player?.id}
              name={item.player?.name || getShortAddress(item.player?.id)}
              address={item.player?.id}
              avatar={item.player?.avatar}
              showIcon={true}
              showName={true}
              size={{ width: 32, height: 32 }}
            >
              <CryptoCurrency
                className="flex flex-row text-xs leading-none text-foreground-700"
                token={token.symbol}
                value={Number(item.amount).toFixed(4)}
                display="Crypto"
                showSuffix={false}
                showIcon={true}
                iconSize={{ width: "18px", height: "18px" }}
              />
            </UserLink>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 justify-end shrink gap-1 items-center my-auto text-xs font-bold leading-none text-foreground whitespace-nowrap basis-0">
        <div className="my-auto">
          <CryptoCurrency
            className="flex flex-row"
            token={token.symbol}
            value={Number(item.claims).toFixed(4)}
            display="Crypto"
            showSuffix={false}
            showIcon={true}
            iconSize={{ width: "18px", height: "18px" }}
          />
        </div>
        <div className="my-auto font-normal ">
          {playerStats.pendingRewards ? (
            <CryptoCurrency
              className="flex flex-row"
              token={token.symbol}
              value={Number(formatEther(playerStats.pendingRewards)).toFixed(4)}
              display="Crypto"
              showSuffix={false}
              showIcon={true}
              iconSize={{ width: "18px", height: "18px" }}
            />
          ) : (
            <span>-</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardItem;
