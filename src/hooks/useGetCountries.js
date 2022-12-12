import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'

export const useGetCountries = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [countries, setCountries] = useState([])
  useEffect(() => {
    const getCountries = async () => {
      setIsLoading(true)
      try {
        const response = await baseAPI.get('v1/countries')
        setCountries(response.data.data.data)
        setIsLoading(false)
      } catch (error) {
        toast.error(error, toastOptions)
      }
    }

    getCountries()
  }, [])

  return {
    countries,
    isLoading,
    setCountries
  }
}
