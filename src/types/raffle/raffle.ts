import { User } from "../user";

export type RunType = string | "blockchain" | "platform";
export type PlayType = string | "raffles" | "scratchers" | "flips" | "dices";
export type JoinState = "Joined" | "Pending" | "";
export enum RaffleStatus {
  CREATED = 0, // the seller creates the raffle
  ONGOING = 1, // the raffle is open to enter
  DRAWING = 2, //  the raffle is closed and requesting VRF
  ENDED = 3, // the raffle is finished, and NFT and funds were transferred
  CANCELLED = 4, // the seller cancels the raffle
  FAILED = 5, // no one join the raffle and timeout
}

export enum PrizeType {
  NATIVE, // native token
  TOKEN, // ERC20
  NFT, // ERC721/ERC1155
}

export type PrizeStandard = "Navite" | "ERC20" | "ERC721" | "ERC1155";
export type RafflePrize = {
  prizeType: PrizeType;

  token?: string; // ERC20/ERC721/ERC1155 contract address
  tokenId?: string; // for NFT
  amount?: string; // number (can be a percentage, an id, an amount, etc. depending on the competition)

  name?: string; // ETH, USDT, Moonbird
  symbolOrCollection?: string; // USDT or CyptoPunk
  standard?: PrizeStandard;
  decimals?: number; // for Token
  value?: string; // NFT market value
  verify?: boolean;
};

export type RafflePrice = {
  id: string | number;
  price: string;
  currencyCode: string; // navite token --> ETH BNB
  maxPerUser?: number;
  tickets: number;
  recommend: boolean;
  available: boolean;
};

export type RaffleCategory = "crypto" | "nft";

export type EligibilityTwitter = {
  follow?: string;
  likeNretweet?: string;
  verify?: boolean;
};

export type EligibilityDiscord = {
  follow?: string;
  verify?: boolean;
};

export type EligibilityCrypto = {
  token: string; // exclusive token contract address
  tokenId?: string; // exclusive tokenId if ERC721/ERC1155
  amount: number; // exclusive token holding amount required
};

export type Eligibility =
  | EligibilityCrypto
  | EligibilityTwitter
  | EligibilityDiscord;

export type TxEvent = {
  createdAt: number;
  txHash: string;
};

export class Token {
  address?: string;
  name?: string;
  symbol?: string;
  decimals?: number;
  tokenId?: string;
  tokenURI?: string;
  metadata?: TokenMetadata;
}

export class TokenMetadata {
  name?: string;
  image?: string;
  description?: string;
}

export type Raffle = {
  id: string; // gloable indexed id

  chainId: number;
  raffleId: number; // smartcontract raffle id
  status: RaffleStatus;
  hasFree: boolean;
  platformFee: number;
  maxPerUser: number;

  startTime: number; // raffle launch timestamp
  endTime: number; // raffle deadline timestamp
  cancelTime?: number; // raffle canceled timestamp
  closeTime?: number; // raffle close/drawing timestamp
  finishTime?: number; // raffle ended/picked winner timestamp

  seller?: User;
  winner?: User;

  price: string;
  prize: RafflePrize;

  ticketsCount: number;
  ticketsFree: number;
  ticketsPaid: number;

  participants: number;
  participantsFree: number;
  participantsPaid: number;

  amountRaised: number;
  amountCollected: number;
  randomNumber?: number; // win No.

  token?: Token;

  // navite token --> ETH BNB
  currencyCode: string;

  // 100USDT, 10ETH, CryptoPunk
  title?: string;
  note?: string; // description
  image?: string;
  category?: RaffleCategory; // crypto, nft
  animationUrl?: string;
  featured?: boolean;

  eligibilities?: EligibilityCrypto[];

  joinState?: JoinState;

  cancelEvent?: TxEvent;
  closeEvent?: TxEvent;
  endEvent?: TxEvent;

  createdAt: number;

  txHash: string;
};
