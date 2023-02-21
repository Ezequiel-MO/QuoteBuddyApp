import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'
import {filterTransfers} from "../helper/filterHelp"

export const useGetTransfers = (
  city,
  vehicleCapacity ,
  company,
  service
) => {
  const [isLoading, setIsLoading] = useState(false)
  const [transfers, setTransfers] = useState([])
  useEffect(() => {
    const controller = new AbortController()
    const getTransfers = async (city, vehicleCapacity, company) => {
      const valuesRute =[ 
				{name: "city" , value: (city === "none") ? undefined : city},
        {name:"company" , value: (company === "none") ? undefined : company},
        {name:"vehicleCapacity", value: (vehicleCapacity == 0 || company === "none") ? undefined : vehicleCapacity}
			]
      const filterOptions = ["city" , "company", "vehicleCapacity"]
      let url = "/v1/transfers"
      if(city || company ){
        url = filterTransfers({
          url:"transfers" ,
          valuesRute:valuesRute,
          filterOptions:filterOptions,
          page:1
        })
      }
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
