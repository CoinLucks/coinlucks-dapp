import { Tabs, Tab } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";

import { useBetGameBasicContext } from "@/context/BetGameBasicContext";
import useBetGameStats from "@/hooks/game/useBetGameStats";
import useBetStakingPool from "@/hooks/game/useBetStakingPool";

import JackpotPool from "./JackpotPool";
import LeaderboardSection from "./LeaderboardSection";
import StakePool from "./StakePool";
import StakeSection from "./StakeSection";

const Stake = () => {
  const t = useTranslations("pool");
  const { chainId, gameName } = useBetGameBasicContext();
  const { gameStats, fetchStatus: gameFetchStatus } = useBetGameStats(
    chainId,
    gameName
  );
  const {
    balance,
    poolStats,
    fetchStatus: poolFetchStatus,
  } = useBetStakingPool(chainId, gameName);

  return (
    <main className="flex flex-col min-w-[350px] max-w-[376px] max-md:w-full max-md:max-w-full max-md:min-w-min max-md:mt-4">
      <section className="flex flex-col p-4 max-md:px-5 w-full rounded-xl bg-background-700">
        <div className="flex-grow-1">
          <Tabs variant="underlined">
            <Tab key="pools" title={t("pools")}>
              <JackpotPool
                chainId={chainId}
                gameStats={gameStats}
                fetchStatus={gameFetchStatus}
              />
              <StakePool
                chainId={chainId}
                poolStats={poolStats}
                fetchStatus={poolFetchStatus}
                balance={balance}
              />
              <LeaderboardSection />
            </Tab>
            <Tab key="myStaking" title={t("my_stake")}>
              <StakeSection />
            </Tab>
          </Tabs>
        </div>
      </section>
    </main>
  );
};

export default Stake;
