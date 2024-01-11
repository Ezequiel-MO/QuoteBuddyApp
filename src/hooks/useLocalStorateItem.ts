import { useState, useEffect } from 'react'

export const useLocalStorageItem = (key: string, defaultValue = {}) => {
  const [item, setItem] = useState(defaultValue)

  useEffect(() => {
    try {
      const itemString = localStorage.getItem(key)
      if (itemString) {
        setItem(JSON.parse(itemString))
      }
    } catch (error) {
      console.error(`Error retrieving item '${key}' from localStorage:`, error)
    }
  }, [key])

  return item
}