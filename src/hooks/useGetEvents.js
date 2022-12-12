import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'

export const useGetEvents = (city, price) => {
  const [isLoading, setIsLoading] = useState(false)
  const [events, setEvents] = useState([])

  useEffect(() => {
    const getEvents = async (city, price) => {
      const url =
        city && price
          ? `v1/events?city=${city}&price[lte]=${price}`
          : city
          ? `v1/events?city=${city}`
          : price
          ? `v1/events?&price[lte]=${price}`
          : `/v1/events`
      setIsLoading(true)
      try {
        const response = await baseAPI.get(url)
        setEvents(response.data.data.data)
        setIsLoading(false)
      } catch (error) {
        toast.error(error, toastOptions)
      }
    }
    getEvents(city, price)
  }, [city, price])

  return { events, setEvents, isLoading }
}
