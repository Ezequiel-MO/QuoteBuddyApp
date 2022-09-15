import baseAPI from '../axios/axiosConfig'
import { toast } from 'react-toastify'
import { toastOptions } from './toast'

export const removeItemFromList = async (endpoint, ID, setter, items) => {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete this ${endpoint.slice(0, -1)} ?`
  )
  if (confirmDelete) {
    try {
      await baseAPI.delete(`v1/${endpoint}/${ID}`)
      setter(items.filter((item) => item._id !== ID))
      toast.success('Deleted successfully', toastOptions)
    } catch (error) {
      console.log(error)
    }
  } else {
    toast.warn('Could not delete Item successfully', toastOptions)
  }
}
