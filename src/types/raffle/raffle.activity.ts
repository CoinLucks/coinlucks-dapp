import type { Raffle } from "..";
import { User } from "../user";

export type RaffleActivity = {
  id: string;
  user: User;
  ticketId: number;
  ticketCount: number;
  currentSize: number;
  cost: number;
  note?: string;
  createdAt: string;
  txHash?: string;
};
