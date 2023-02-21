import { useState, useEffect } from 'react'
import { useGetTransfers } from './useGetTransfers'

export const useGetTransferPrices =(
  city,
  vehicleCapacity,
  company,
  service = ''
) => {
  const { transfers } = useGetTransfers(city, vehicleCapacity, company)
  const [transferInPrice, setTransferInPrice] = useState(0)
  const [transferOutPrice, setTransferOutPrice] = useState(0)
  const [selectedServicePrice, setSelectedServicePrice] = useState(0)
  const [transfer, setTransfer] = useState({})

  useEffect(() => {
    if (transfers?.length > 0) {
      const transferKeys = Object.keys(transfers[0])
      setTransfer(transfers[0])
      if(transferKeys?.includes('transfer_in') && transfer){
        setTransferInPrice(transfers[0].transfer_in)
      }
      if(transferKeys?.includes('transfer_out') && transfer){
        setTransferOutPrice(transfers[0].transfer_out)
      }
    }

    if (service !== '') {
      const servicePrice = transfers[0] && parseFloat(transfers[0][service])
      if (servicePrice) setSelectedServicePrice(servicePrice)
      else setSelectedServicePrice(0)
    }
  }, [transfers, vehicleCapacity, service , city , company])

  return {
    transfer,
    selectedServicePrice,
    transferInPrice,
    transferOutPrice
  }
}
