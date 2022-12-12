import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'

export const useGetLocations = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [locations, setLocations] = useState([])
  useEffect(() => {
    const controller = new AbortController()
    const getLocations = async () => {
      let url = 'v1/locations'
      setIsLoading(true)
      try {
        const response = await baseAPI.get(url, {
          signal: controller.signal
        })
        setLocations(response.data.data.data)
        setIsLoading(false)
      } catch (error) {
        toast.error(error, toastOptions)
      }
    }

    getLocations()

    return () => {
      controller.abort()
    }
  }, [])

  return {
    locations,
    setLocations,
    isLoading
  }
}
