import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'

export const useGetClients = (country) => {
  const [isLoading, setIsLoading] = useState(false)
  const [clients, setClients] = useState([])

  useEffect(() => {
    const controller = new AbortController()
    const getClients = async (country) => {
      const url = country ? `/v1/clients?country=${country}` : `/v1/clients`
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
  }, [country])

  return { clients, setClients, isLoading }
}
