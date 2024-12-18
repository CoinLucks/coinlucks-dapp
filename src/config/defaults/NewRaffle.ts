import { Raffle, RaffleStatus } from "@/types/raffle/raffle";

export const NewRaffle: Raffle | any = {
  status: RaffleStatus.CREATED,
  hasFree: true,
  maxPerUser: 0,
  currencyCode: "",
  note: "",
};
