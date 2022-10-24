import { useState, useEffect } from 'react'
import useGetTransfers from './useGetTransfers'

const useGetTransferPrices = (city, vehicleCapacity, company, service = '') => {
  const { transfers } = useGetTransfers(city, vehicleCapacity, company)
  const [transferInPrice, setTransferInPrice] = useState(0)
  const [transferOutPrice, setTransferOutPrice] = useState(0)
  const [selectedServicePrice, setSelectedServicePrice] = useState(0)
  const [transfer, setTransfer] = useState(transfers[0])

  useEffect(() => {
    if (transfers?.length > 0) {
      const transferKeys = Object.keys(transfers[0])
      setTransfer(transfers[0])
      if (transferKeys?.includes('transfer_in'))
        setTransferInPrice(transfers[0].transfer_in)
      if (transferKeys?.includes('transfer_out'))
        setTransferOutPrice(transfers[0].transfer_out)
    }

    if (service !== '') {
      const servicePrice = parseFloat(transfers[0][`${service}`])
      if (servicePrice) setSelectedServicePrice(servicePrice)
    }
  }, [transfers])

  return {
    transfer,
    selectedServicePrice,
    transferInPrice,
    transferOutPrice
  }
}

export default useGetTransferPrices
