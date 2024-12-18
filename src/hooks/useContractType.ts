import { useMemo } from "react"
import { Address, erc20Abi, zeroAddress, } from "viem"
import { useReadContracts } from "wagmi"

import { erc1155Abi } from "@/constants/contracts/abi/erc1155Abi"
import { TokenType } from "@/types/token/type"

export const useContractType = (address: Address, chainId: number) => {
    const { data, error, isFetched } = useReadContracts({
        contracts: [{
            chainId: chainId,
            abi: erc1155Abi,
            address: address,
            functionName: 'supportsInterface',
            args: ['0x80ac58cd'], // Identifier for ERC-erc721
        },
        {
            chainId: chainId,
            abi: erc1155Abi,
            address: address,
            functionName: 'supportsInterface',
            args: ['0xd9b67a26'], // Identifier for ERC-1155
        },
        {
            chainId: chainId,
            abi: erc20Abi,
            address: address,
            functionName: 'balanceOf',
            args: [zeroAddress],
        },
        {
            chainId: chainId,
            abi: erc20Abi,
            address: address,
            functionName: 'name',
            args: [],
        }, {
            chainId: chainId,
            abi: erc20Abi,
            address: address,
            functionName: 'symbol',
            args: [],
        }]
    })

    const isERC721 = data?.[0].result;
    const isERC1155 = data?.[1].result;
    const isERC20 = !isERC721 && !isERC1155 && !(data?.find((x: { status: string }, index: number) => index > 1 && x.status == 'failure') !== undefined);
    return {
        error,
        data,
        result: useMemo(() => ({
            state: isFetched && (isERC721 || isERC1155 || isERC20),
            name: data?.[3].result,
            symbol: data?.[4].result,
            address: address,
            chainId: chainId,
            type: isERC721 ? TokenType.ERC721 : isERC1155 ? TokenType.ERC1155 : isERC20 ? TokenType.ERC20 : null
        }), [address, chainId, data]),
    }
}
