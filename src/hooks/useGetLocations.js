import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'

const useGetLocations = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [locations, setLocations] = useState([])
  useEffect(() => {
    const getLocations = async () => {
      setIsLoading(true)
      try {
        const response = await baseAPI.get('v1/locations')
        setLocations(response.data.data.data)
        setIsLoading(false)
      } catch (error) {
        toast.error(error, toastOptions)
      }
    }

    getLocations()
  }, [])

  return {
    locations,
    setLocations,
    isLoading
  }
}

export default useGetLocations
