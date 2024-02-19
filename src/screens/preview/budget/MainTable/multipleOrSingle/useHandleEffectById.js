// hooks/useHandleEffectById.js
import { useEffect, useRef } from 'react'

export const useHandleEffectById = (
  id,
  date,
  option,
  setCurrentMeals,
  setCurrentEvents
) => {
  const prevOptionIdRef = useRef(null)

  useEffect(() => {
    if (prevOptionIdRef.current !== option._id) {
      if (id === 'lunch' || id === 'dinner') {
        setCurrentMeals(date, id, option._id)
      }
      if (id === 'morningEvents' || id === 'afternoonEvents') {
        setCurrentEvents(date, id, option._id)
      }
      prevOptionIdRef.current = option._id
    }
  }, [id, date, option, setCurrentMeals, setCurrentEvents])
}
