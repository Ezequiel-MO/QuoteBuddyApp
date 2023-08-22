import { useState, useEffect } from 'react';
import { useGetTransfers } from './useGetTransfers';
import { ITransfer } from "../interfaces"

interface Transfer {
  [key: string]: any
  transfer_in?: number
  transfer_out?: number
}

interface UseGetTransferPricesProps {
  city: string
  vehicleCapacity?: any
  company: string
  service: string
}

export const useGetTransferPrices = ({
  city,
  vehicleCapacity,
  company,
  service
}: UseGetTransferPricesProps) => {
  const { transfers } = useGetTransfers(city, vehicleCapacity, company, service)
  const [transferInPrice, setTransferInPrice] = useState<number>(0)
  const [transferOutPrice, setTransferOutPrice] = useState<number>(0)
  const [selectedServicePrice, setSelectedServicePrice] = useState<number>(0)
  const [transfer, setTransfer] = useState<Transfer>({})

  useEffect(() => {
    if (transfers?.length === 1 && vehicleCapacity > 0) {
      const transferKeys = Object.keys(transfers[0])
      setTransfer(transfers[0]);
      if (transferKeys?.includes('transfer_in') && transfer) {
        setTransferInPrice(transfers[0].transfer_in)
      }
      if (transferKeys?.includes('transfer_out') && transfer) {
        setTransferOutPrice(transfers[0].transfer_out)
      }
    } else {
      setTransfer({});
    }

    if (service !== '' || Object.keys(transfer).length > 0) {
      const servicePrice = transfer && parseFloat(transfer[service])
      if (servicePrice) setSelectedServicePrice(servicePrice)
      else setSelectedServicePrice(0)
    } else {
      setTransferInPrice(0)
    }
  }, [transfers, vehicleCapacity, service, city, company])

  return {
    transfer,
    selectedServicePrice,
    transferInPrice,
    transferOutPrice
  };
}
