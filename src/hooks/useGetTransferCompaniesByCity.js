import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'

export const useGetTransferCompaniesByCity = (city) => {
  const [isLoading, setIsLoading] = useState(false)
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    const getCompanies = async (city) => {
      const url = city ? `v1/transfers?city=${city}` : `/v1/transfers`
      setIsLoading(true)
      try {
        const response = await baseAPI.get(url, {
          signal: controller.signal
        })
        const companies = response.data.data.data.map(
          (transfer) => transfer.company
        )
        const uniqueCompanies = [...new Set(companies)]
        setCompanies(uniqueCompanies)
        setIsLoading(false)
      } catch (error) {
        toast.error(error, toastOptions)
      }
    }
    getCompanies(city)
    return () => {
      controller.abort()
    }
  }, [city])

  return { companies, isLoading }
}
