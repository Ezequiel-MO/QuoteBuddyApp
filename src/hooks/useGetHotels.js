import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'

const useGetHotels = (city, numberStars, numberRooms) => {
  const [isLoading, setIsLoading] = useState(false)
  const [hotels, setHotels] = useState([])

  useEffect(() => {
    const getHotels = async (city, numberStars, numberRooms) => {
      const url =
        city && numberStars && numberRooms
          ? `v1/hotels?city=${city}&numberStars=${numberStars}&numberRooms[lt]=${numberRooms}`
          : city && numberStars
          ? `v1/hotels?city=${city}&numberStars=${numberStars}`
          : city
          ? `v1/hotels?city=${city}`
          : `/v1/hotels`
      setIsLoading(true)
      try {
        const response = await baseAPI.get(url)
        setHotels(response.data.data.data)
        setIsLoading(false)
      } catch (error) {
        toast.error(error, toastOptions)
      }
    }
    getHotels(city, numberStars, numberRooms)
  }, [city, numberStars, numberRooms])

  return { hotels, isLoading }
}

export default useGetHotels
