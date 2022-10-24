import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'

const useGetAccManagers = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [accManagers, setAccManagers] = useState([])
  useEffect(() => {
    const controller = new AbortController()
    const getAccManagers = async () => {
      setIsLoading(true)
      try {
        const response = await baseAPI.get('v1/accManagers', {
          signal: controller.signal
        })
        setAccManagers(response.data.data.data)
        setIsLoading(false)
      } catch (error) {
        toast.error(error, toastOptions)
      }
    }

    getAccManagers()

    return () => {
      controller.abort()
    }
  }, [])

  return {
    isLoading,
    accManagers,
    setAccManagers
  }
}

export default useGetAccManagers
