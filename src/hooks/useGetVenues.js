import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'

export const useGetVenues = (city) => {
  const [isLoading, setIsLoading] = useState(false)
  const [venues, setVenues] = useState([])

  useEffect(() => {
    const getVenues = async (city) => {
      const url = city ? `v1/venues?city=${city}` : `v1/venues`
      setIsLoading(true)
      try {
        const response = await baseAPI.get(url)
        setVenues(response.data.data.data)
        setIsLoading(false)
      } catch (error) {
        toast.error(error.message, toastOptions)
      }
    }
    getVenues(city)
  }, [city])

  return { venues, isLoading }
}
