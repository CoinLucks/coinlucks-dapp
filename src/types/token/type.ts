import { Address } from "viem";

import { ChainId } from "@/constants";

export enum TokenType {
    // https://ethereum.org/en/developers/docs/standards/tokens/erc-20/
    ERC20 = 'ERC20',

    // https://ethereum.org/en/developers/docs/standards/tokens/erc-721/
    ERC721 = 'ERC721',

    // https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/
    ERC1155 = 'ERC1155',
}

export type Token = {
    type: TokenType;
    name: string;
    symbol: string;
    addresses: Record<string, Address>;
    decimals: number;
    logoURI?: string;
    imported?: boolean;
    mintable?: boolean;
    balance?: bigint;
};

export type NFT = Token & {
    tokenId: number;
    uri?: string;
    metadata?: NFTMetadata;
};

// Based on https://docs.opensea.io/docs/metadata-standards
export type NFTMetadata = {
    description: string;
    external_url?: string;
    image: string;
    name: string;
    //todo: more metadata?
};