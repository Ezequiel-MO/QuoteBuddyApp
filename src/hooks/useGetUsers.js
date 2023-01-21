import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'


export const useGetUsers = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [users, setUsers] = useState([])
    useEffect(() => {
      const controller = new AbortController()
      const getUsers = async () => {
        setIsLoading(true)
        try {
          const response = await baseAPI.get('v1/users', {
            signal: controller.signal
          })
          setUsers(response.data.data.data)
          setIsLoading(false)
        } catch (error) {
          toast.error(error, toastOptions)
        }
      }
      getUsers()
      return () => {
        controller.abort()
      }
    }, [])
  
    return {
      isLoading,
      users,
      setUsers
    }
  }