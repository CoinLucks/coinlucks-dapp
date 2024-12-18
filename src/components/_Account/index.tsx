"use client";

import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import React from "react";

import Container from "@/components/Container";
import { BetStatus } from "@/types/bet/bet";

import BetActivity from "./Profile/BetActivity";
import BetHistoryList from "./Profile/BetActivity/BetHistoryList";
import UserProfile from "./Profile/UserProfile";
import Statistic from "./Statistic";

const AccountPage = (props: { id: string }) => {
  const t = useTranslations("account");
  return (
    <Container>
      <div className="flex flex-row max-md:flex-col">
        <UserProfile id={props.id} />
        <div className="flex flex-col flex-1 shrink flex-grow pl-6 max-md:pl-0 max-md:mt-4">
          <Statistic id={props.id} />
          <Tabs
            size="md"
            aria-label="Options"
            classNames={{
              tabList: "gap-3 self-start px-5 pl-0 bg-transparent",
              cursor: "whitespace-nowrap rounded-xl bg-gradient-yellow",
              tab: "justify-center px-5 py-5 bg-background-600 rounded-xl mt-6",
              tabContent: "!text-pm font-bold text-foreground",
            }}
          >
            <Tab key="activity" title={t("activity")}>
              <Card>
                <CardBody className="bg-background-700">
                  <BetActivity
                    ListTemplate={BetHistoryList}
                    filterOpt={{
                      chainIds: "",
                      first: 10,
                      player: props.id,
                      orderBy: "createdAt",
                      orderDirection: "desc",
                    }}
                  />
                </CardBody>
              </Card>
            </Tab>
            <Tab key="wins" title={t("wins")}>
              <Card>
                <CardBody className="bg-background-700">
                  <BetActivity
                    ListTemplate={BetHistoryList}
                    filterOpt={{
                      chainIds: "",
                      first: 10,
                      player: props.id,
                      betStatus: BetStatus.Won,
                      orderBy: "betAmount",
                      orderDirection: "desc",
                    }}
                  />
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>
    </Container>
  );
};

export default AccountPage;
