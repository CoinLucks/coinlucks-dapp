"use client";

import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import { useTranslations } from "next-intl";

import AllBets from "../../BetGame/History/AllBets";
import HighRollers from "../../BetGame/History/HighRollers";
import JackpotWins from "../../BetGame/History/JackpotWins";
import MyBets from "../../BetGame/History/MyBets";
import RareWins from "../../BetGame/History/RareWins";
import StreakWins from "../../BetGame/History/StreakWins";
import TopPlayers from "../../BetGame/History/TopPlayers";

import BetHistoryList from "./BetHistoryList";

const GameHistory = () => {
  const t = useTranslations("games");
  return (
    <div className="flex flex-col w-full mt-4">
      <Tabs
        size="md"
        aria-label="Options"
        classNames={{
          tabList: "gap-3 self-start px-5 pl-0 bg-transparent",
          cursor: "whitespace-nowrap rounded-xl bg-gradient-yellow",
          tab: "justify-center px-5 py-5 bg-background-600 rounded-xl",
          tabContent: "!text-pm font-bold text-foreground",
        }}
      >
        <Tab key="allBets" title={t("list.tab.all")}>
          <Card>
            <CardBody className="bg-background-700">
              <AllBets ListTemplate={BetHistoryList} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="myBets" title={t("list.tab.my_bets")}>
          <Card>
            <CardBody className="bg-background-700">
              <MyBets ListTemplate={BetHistoryList} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="highRollers" title={t("list.tab.high_rollers")}>
          <Card>
            <CardBody className="bg-background-700">
              <HighRollers ListTemplate={BetHistoryList} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="rareWins" title={t("list.tab.rare_wins")}>
          <Card>
            <CardBody className="bg-background-700">
              <RareWins ListTemplate={BetHistoryList} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="jackpotWins" title={t("list.tab.jackpot")}>
          <Card>
            <CardBody className="bg-background-700">
              <JackpotWins ListTemplate={BetHistoryList} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="winStreak" title={t("list.tab.streak_wins")}>
          <Card>
            <CardBody className="bg-background-700">
              <StreakWins ListTemplate={BetHistoryList} />
            </CardBody>
          </Card>
        </Tab>
        <Tab key="topPlayers" title={t("list.tab.top_player")}>
          <Card>
            <CardBody className="bg-background-700">
              <TopPlayers />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

export default GameHistory;
