import { useMemo, useEffect } from 'react'
import { ITransfer } from '../../../../interfaces'
import {
  DispatchRow,
  TransfersOutAssistanceRow,
  TransfersOutRow
} from '../rows/transfers_out'
import { useContextBudget } from '../../context/BudgetContext'

interface TransfersOutSectionProps {
  transfers: ITransfer[]
  date: string
}

export const TransfersOutSection = ({
  transfers,
  date
}: TransfersOutSectionProps) => {

  const { dispatch , state } = useContextBudget()

  const groupedItems = useMemo(() => {
    const groups: { [key: string]: ITransfer[] } = {}
    transfers.forEach((item) => {
      const { _id } = item
      if (!groups[_id]) groups[_id] = []
      groups[_id].push(item)
    })
    return groups
  }, [transfers])

  useEffect(() => {
    dispatch({
      type: 'UPDATE_TRANSFERS_OUT_COST',
      payload: { transfer_out: state.schedule[state.schedule.length - 1].transfer_out }
    })
	}, [state.schedule[state.schedule.length - 1].transfer_out ])

  return (
    <>
      <DispatchRow lastItem={transfers[0]} date={date} />
      <TransfersOutAssistanceRow firstItem={transfers[0]} date={date} />
      {
        transfers.length > 0 &&
        Object.entries(groupedItems).map(([key, group]) => {
          return (
            <TransfersOutRow key={key} items={group} date={date} />
          )
        })
      }
    </>
  )
}
