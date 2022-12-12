import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'

export const useGetHotel = (id) => {
  const [isLoading, setIsLoading] = useState(false)
  const [hotel, setHotel] = useState({})

  useEffect(() => {
    const getHotel = async (id) => {
      const url = `/v1/hotels/${id}`
      setIsLoading(true)
      try {
        const response = await baseAPI.get(url)
        setHotel(response.data.data.data)
        setIsLoading(false)
      } catch (error) {
        toast.error(error, toastOptions)
      }
    }
    getHotel(id)
  }, [id])

  return { hotel, isLoading }
}
