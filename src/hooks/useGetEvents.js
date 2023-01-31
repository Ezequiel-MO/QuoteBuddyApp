import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'
import {filter} from "../helper/filterHelp"

export const useGetEvents = (city, price , page) => {
  const [isLoading, setIsLoading] = useState(false)
  const [events, setEvents] = useState([])

  useEffect(() => {
    const getEvents = async (city, price) => {
      const filterOptions = ["city", "price[lte]"]
      const valuesRute =[ 
        {name: "city" , value: city === "none" ? undefined : city},
        {name:"price[lte]" , value: price === "none" ? undefined : price }
      ]
      let url = `/v1/events?page=${page}&limit=10`
      if(city || price){
        url = filter({
          url:"events",
          valuesRute:valuesRute,
          filterOptions:filterOptions,
          page:page
        })
      }
      
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
  }, [city, price , page])

  return { events, setEvents, isLoading }
}
