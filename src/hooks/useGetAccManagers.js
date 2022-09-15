import { useEffect, useState } from 'react'
import baseAPI from '../axios/axiosConfig'

const useGetAccManagers = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [accManagers, setAccManagers] = useState([])
  useEffect(() => {
    const getAccManagers = async () => {
      setIsLoading(true)
      try {
        const response = await baseAPI.get('v1/accManagers')
        setAccManagers(response.data.data.data)
        setIsLoading(false)
      } catch (error) {
        console.log(error)
      }
    }

    getAccManagers()
  }, [])

  return {
    isLoading,
    accManagers,
    setAccManagers
  }
}

export default useGetAccManagers
