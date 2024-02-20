import { useEffect } from 'react'
import { IEvent, IRestaurant, ITransfer } from '../../../../../interfaces'
import { useContextBudget } from '../../../context/BudgetContext'
import { UPDATE_PROGRAM_TRANSFERS_COST } from '../../../context/budgetReducer'
import { AssistanceRow } from './AssistanceRow'
import { TransferRow } from './TransferRow'

interface Props {
  transfer: ITransfer[]
  date: string
  id:
    | 'transfer_morningEvents'
    | 'transfer_afternoonEvents'
    | 'transfer_lunch'
    | 'transfer_dinner'
  selectedEvent: IEvent | IRestaurant
}

export const EventTransferRow = ({
  transfer = [],
  date,
  id,
  selectedEvent
}: Props) => {
  const { dispatch } = useContextBudget()
  const transferIsNeeded =
    selectedEvent &&
    Array.isArray(selectedEvent.transfer) &&
    selectedEvent.transfer.length > 0

  useEffect(() => {
    if (!transferIsNeeded) {
      dispatch({
        type: UPDATE_PROGRAM_TRANSFERS_COST,
        payload: {
          date,
          type: id,
          transfer: null,
          count: 0
        }
      })
    }
  }, [dispatch, transferIsNeeded, date, id])

  if (!transferIsNeeded) return null

  const assistanceIsNeeded = transfer[0].assistance !== 0

  return (
    <>
      {assistanceIsNeeded && (
        <AssistanceRow
          firstItem={transfer[0]}
          date={date}
          description='On Board Assistance'
          id={id}
        />
      )}
      <TransferRow
        pax={transfer.length}
        date={date}
        options={transfer}
        description='Bus Service'
        id={id}
      />
    </>
  )
}
