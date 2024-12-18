import { Raffle, RaffleStatus } from "./raffle";

export const TEN_MINS = 10 * 60 * 1000;
export const TWO_MINS = 2 * 60 * 1000;
export const getRaffleStatus = (item: Raffle) => {
  if (item.status == RaffleStatus.ONGOING) {
    if (item.endTime < new Date().getTime() + TWO_MINS) {
      return RaffleStatus.FAILED;
    }
  }
  return item.status;
};
