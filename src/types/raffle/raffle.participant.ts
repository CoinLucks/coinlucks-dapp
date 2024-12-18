import { User } from "../user";

export type RaffleParticipant = {
    raffleId: number;
    user: User;
    ticketCount: number;
    cost: string;
}