import { useState } from 'react'
import baseAPI from '../axios/axiosConfig'
import { toast } from 'react-toastify'
import { toastOptions } from '../helper/toast'

export const useDeleteFromList = async (endpoint, items, Id) => {
  const [filteredItems, setFilteredItems] = useState([])

  try {
    await baseAPI.delete(`v1/${endpoint}/${Id}`)
    toast.success('Item Deleted', toastOptions)
    setFilteredItems(items.filter((item) => item._id !== Id))
  } catch (error) {
    console.log(error)
    toast.warn('Could not be deleted', toastOptions)
  }

  return {
    deleted,
    filteredItems
  }
}
