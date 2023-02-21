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
      let url = `/v1/transfers`
      if(city && city !== "none"){
        url = `v1/transfers?city=${city}`
      }
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
