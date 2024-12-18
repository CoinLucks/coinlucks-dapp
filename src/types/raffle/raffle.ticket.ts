import type { Raffle } from "..";
import { User } from "../user";

export type RaffleTicket = {
  id: string;
  user: User;
  ticketId: string;
  ticketCount: number;
  currentSize: number;
  cost: string;
  createdAt: string;
  txHash: string;
};
