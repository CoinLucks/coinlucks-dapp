import { CryptoPriceContext } from './CryptoPriceContext'
import { useCryptoPrice } from './useCryptoPrice'

export const CryptoPriceProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { data } = useCryptoPrice()
  return (
    <CryptoPriceContext.Provider value={data}>
      {children}
    </CryptoPriceContext.Provider>
  )
}
