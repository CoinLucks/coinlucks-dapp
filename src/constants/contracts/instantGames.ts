import { BetGame } from "@/types/bet/bet";

export const instantGames = (chainId: number): BetGame[] => {
  return [
    {
      id: "1",
      chainId: chainId,
      playType: "scratchers",
      name: "Scratch69",
      address: "",
      staking: "",
      desc: "Scratch69_desc"
    },
    {
      id: "2",
      chainId: chainId,
      playType: "dices",
      name: "DiceShake",
      address: "",
      staking: "",
      desc: "DiceShake_desc"
    },
    {
      id: "3",
      chainId: chainId,
      playType: "flips",
      name: "CoinFlip",
      address: "",
      staking: "",
      desc: "CoinFlip_desc"
    },
  ];
};
