"use client";

import { createContext } from 'react'

import type { CryptoPrice } from '@/types'

export const CryptoPriceContext = createContext<CryptoPrice[] | undefined>([])
