// hooks/useUpdateEventTotalCost.js
import { useEffect, useMemo, useRef } from 'react'
import { IEvent, IRestaurant } from '../../../../interfaces'

type IOption = IEvent | IRestaurant

type UpdateEventTotalCostFunction = (
  date: string,
  id: 'morningEvents' | 'afternoonEvents' | 'lunch' | 'dinner',
  pax: number,
  optionId: string
) => void

export const useUpdateEventTotalCost = (
  id: 'morningEvents' | 'afternoonEvents' | 'lunch' | 'dinner',
  date: string,
  pax: number,
  option: IOption,
  updateEventTotalCost: UpdateEventTotalCostFunction
) => {
  const prevOptionIdRef = useRef<string | null>(null)

  const memoizedOption = useMemo(() => {
    if ('pricePerPerson' in option) {
      return option
    }
    return option
  }, [
    option._id,
    option.price,
    'pricePerPerson' in option ? option.pricePerPerson : undefined
  ])

  useEffect(() => {
    if (
      memoizedOption._id &&
      (id === 'morningEvents' ||
        id === 'afternoonEvents' ||
        id === 'lunch' ||
        (id === 'dinner' && prevOptionIdRef.current !== memoizedOption._id))
    ) {
      updateEventTotalCost(date, id, pax, memoizedOption._id)
      prevOptionIdRef.current = memoizedOption._id
    }
  }, [id, date, pax, memoizedOption])
}

export default useUpdateEventTotalCost
