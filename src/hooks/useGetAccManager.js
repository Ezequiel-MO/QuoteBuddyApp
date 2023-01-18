import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'

export const useGetAccManager = (query) => {
    const [isLoading, setIsLoading] = useState(false)
    const [accManager, setAccManager] =useState( { } )
  
    useEffect(() => {
      const controller = new AbortController()
      const getAccManager = async (query) => {
        const url = `/v1/accManagers?email=${query}`
        setIsLoading(true)
        try {
          const response = await baseAPI.get( url, {
            signal: controller.signal
          })
          setAccManager(response.data.data.data[0])  //no estoy seguro de si es response.data.data.data o 
          setIsLoading(false)
        } catch (error) {
          toast.error(error, toastOptions)
        }
      }
  
      getAccManager(query)
      return () => {
        controller.abort()
      }
    }, [])
  
    return { accManager, setAccManager, isLoading }
  }