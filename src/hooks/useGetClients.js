import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'
import {filter} from "../helper/filterHelp"

export const useGetClients = ({country , page ,all}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [clients, setClients] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    const getClients = async (country) => {
      const valuesRute =[ 
				{name: "country" , value: country === "none" ? undefined : country}
			]
      const filterOptions = ["country"]
      let url = `v1/clients?page=${page}&limit=10`
      if(country){
        url = filter({
          url:"clients",
          valuesRute: valuesRute,
          filterOptions: filterOptions,
          page: page
        })
      }
      if(all === "yes"){
        url = "v1/clients"
      }
      console.log(url)
      setIsLoading(true)
      try {
        const response = await baseAPI.get(url, {
          signal: controller.signal
        })
        setClients(response.data.data.data)
        setIsLoading(false)
      } catch (error) {
        toast.error(error, toastOptions)
      }
    }

    getClients(country)
    return () => {
      controller.abort()
    }
  }, [country , page])

  return { clients, setClients, isLoading }
}
