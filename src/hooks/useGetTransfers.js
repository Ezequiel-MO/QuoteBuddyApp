import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'

const useGetTransfers = (
  city,
  vehicleCapacity = 30,
  company = 'izaro',
  service = 'transfer_in'
) => {
  const [isLoading, setIsLoading] = useState(false)
  const [transfers, setTransfers] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    const getTransfers = async (city, vehicleCapacity, company) => {
      const url =
        city && vehicleCapacity && company
          ? `/v1/transfers?city=${city}&vehicleCapacity=${vehicleCapacity}&company=${company}`
          : city && vehicleCapacity
          ? `/v1/transfers?city=${city}&vehicleCapacity=${vehicleCapacity}`
          : city && company
          ? `/v1/transfers?city=${city}&company=${company}`
          : city
          ? `v1/transfers?city=${city}`
          : `/v1/transfers`
      setIsLoading(true)
      try {
        const response = await baseAPI.get(url, {
          signal: controller.signal
        })
        setTransfers(response.data.data.data)
        setIsLoading(false)
      } catch (error) {
        toast.error(error, toastOptions)
      }
    }
    getTransfers(city, vehicleCapacity, company)

    return () => {
      controller.abort()
    }
  }, [city, vehicleCapacity, company, service])

  return { transfers, isLoading }
}

export default useGetTransfers
