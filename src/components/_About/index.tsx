"use client";

import { Image } from "@nextui-org/react";
import React from "react";

import Container from "@/components/Container";

const AboutPage = () => {
  return (
    <>
      <Container>
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col w-[65%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow px-5 max-md:mt-10 max-md:max-w-full">
              <div className="text-h5 font-bold leading-9 text-foreground max-md:max-w-full">
                About CoinLucks
              </div>
              <div className="mt-4 text-ps text-foreground-800 max-md:max-w-full">
                $LUCK is the unified token of CoinLucks platform launched on BSC.
                GAM’s unique mining solution, by placing bets, and Staking
                opportunity became a hallmark of the CoinLucks project.
              </div>
              <div className="mt-10 text-pm font-bold text-foreground max-md:max-w-full">
                CertiK Audit
              </div>
              <div className="mt-2 text-ps text-foreground-800 max-md:max-w-full">
                $LUCK is certified by CertiK - the leading blockchain security
                company. Having great trust from users, we received the official
                confirmation of reliability and security.
              </div>
              <div className="flex gap-2 self-start py-2 mt-2 text-ps font-bold rounded-xl">
                <div className="bg-clip-text bg-[linear-gradient(84deg,#FAD620_-15.55%,#FACE1E_7.79%,#FACA2D_24.27%,#FAC020_42.92%,#FAAE0A_99.04%)]">
                  Check $LUCK Audit
                </div>
                <Image
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/7991aa47c8980a2177630fb44f6bc4e6c1112aaeafca5253f2b0fbfe3adc9035?"
                  className="shrink-0 aspect-[0.96] w-[23px]"
                />
              </div>
              <div className="mt-6 text-pm font-bold text-foreground max-md:max-w-full">
                How to use $LUCK tokens?
              </div>
              <div className="mt-2 text-ps text-foreground-800 max-md:max-w-full">
                If you find yourself a lucky owner of $LUCK tokens, you will
                definitely enjoy a wide range of options to use them. Let`&apos;`s take
                a quick overview of the ultimate opportunities users can achieve
                on CoinLucks owning $LUCK tokens.
              </div>
              <div className="mt-6 text-pm font-bold text-foreground max-md:max-w-full">
                Playing
              </div>
              <div className="mt-2 text-ps text-foreground-800 max-md:max-w-full">
                $LUCK token is available for making bets while playing games with
                a min bet of 0,00000001 $LUCK. Tempt your fortune in authentic
                Dice and Hilo, make a lucky spin in Circle, place winning bets
                in Mines, and Plinko
              </div>
              <div className="mt-6 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                  <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col max-md:mt-6">
                      <div className="text-pm font-bold text-foreground">
                        Exchange
                      </div>
                      <div className="mt-2 text-ps text-foreground-800">
                        $LUCK can be purchased on one of the TOP exchanges.
                        F-cross exchange is the fastest and easiest way to buy
                        $LUCK.
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                    <Image
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/6580fc17af42acd86e5b88ee090b5be637a5c2de8e8f805354fa91a84f4dce3b?"
                      className="grow w-full aspect-[2] max-md:mt-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[35%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col text-ps max-md:mt-10">
              <div className="flex flex-col px-6 pt-6 pb-7 w-full rounded-xl bg-background-700 max-md:px-5">
                <div className="text-lg font-bold leading-7 text-foreground">
                  $LUCK Token
                </div>
                <div className="flex gap-5 justify-between mt-6 whitespace-nowrap">
                  <div className="text-foreground-800">Price</div>
                  <div className="flex gap-1 justify-between pr-5 font-bold text-right text-foreground">
                    <div>$1.20</div>
                    <Image
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/58669d5b8bd7d19ecdf020344c62d075df1d5eee828def88a4972f7ab361f2fa?"
                      className="shrink-0 my-auto aspect-square w-[18px]"
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-between mt-2 whitespace-nowrap">
                  <div className="text-foreground-800">Ticker</div>
                  <div className="font-bold text-right text-foreground">$LUCK</div>
                </div>
                <div className="flex gap-5 justify-between mt-2">
                  <div className="text-foreground-800">Name</div>
                  <div className="font-bold text-right text-foreground">
                    $LUCK Token
                  </div>
                </div>
                <div className="flex gap-5 justify-between mt-2">
                  <div className="text-foreground-800">Contract address</div>
                  <div className="font-bold text-right text-foreground">
                    0xbb4669...882d
                  </div>
                </div>
                <div className="flex gap-5 justify-between mt-2">
                  <div className="text-foreground-800">Chain</div>
                  <div className="font-bold text-right text-foreground">
                    BNB Chain (BEP-20)
                  </div>
                </div>
                <div className="flex gap-5 justify-between mt-2">
                  <div className="text-foreground-800">Max supply</div>
                  <div className="font-bold text-right text-foreground">
                    7 000 000 000 $LUCK
                  </div>
                </div>
                <div className="flex gap-5 justify-between mt-2">
                  <div className="text-foreground-800">Circulating supply</div>
                  <div className="font-bold text-right text-foreground">
                    4 526 883 092 $LUCK
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-6 mt-2 w-full rounded-xl bg-background-700 max-md:px-5">
                <div className="flex gap-5 justify-between">
                  <div className="text-foreground-800">Total burnt amount</div>
                  <div className="self-start font-bold text-right text-foreground">
                    2 526 889 021 $LUCK
                  </div>
                </div>
                <div className="flex gap-5 justify-between mt-2">
                  <div className="text-foreground-800">From total supply</div>
                  <div className="font-bold text-right text-foreground">35.62%</div>
                </div>
                <div className="flex gap-2 py-2 pr-9 mt-6 font-bold rounded-xl max-md:pr-5">
                  <div className="bg-clip-text bg-[linear-gradient(84deg,#FAD620_-15.55%,#FACE1E_7.79%,#FACA2D_24.27%,#FAC020_42.92%,#FAAE0A_99.04%)]">
                    Burn Contract
                  </div>
                  <Image
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/a3ccc0ec4abaca61f3f77e179c0cf3985c990abbe3102338bb34db97f46b2d96?"
                    className="shrink-0 aspect-[0.96] w-[23px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AboutPage;
