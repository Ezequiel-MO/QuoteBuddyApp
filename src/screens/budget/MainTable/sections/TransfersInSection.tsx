import { useMemo , useEffect } from 'react'
import { ITransfer } from '../../../../interfaces'
import {
  MeetGreetRow,
  TransfersInAssistanceRow,
  TransfersInRow
} from '../rows/transfers_in'
import { useContextBudget } from '../../context/BudgetContext'

interface TransfersInSectionProps {
  transfers: ITransfer[]
  date: string
}

export const TransfersInSection = ({
  transfers,
  date
}: TransfersInSectionProps) => {

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
      type: 'UPDATE_TRANSFERS_IN_COST',
      payload: { transfer_in: state.schedule[0].transfer_in }
    })
	}, [state.schedule[0].transfer_in ])

  return (
    <>
      <MeetGreetRow firstItem={transfers[0]} date={date} />
      <TransfersInAssistanceRow firstItem={transfers[0]} date={date} />
      {
        transfers.length > 0 &&
        Object.entries(groupedItems).map(([key, group])=>{
          return(
            <TransfersInRow items={group} key={key} date={date} />
          )
        })
      }
    </>
  )
}
