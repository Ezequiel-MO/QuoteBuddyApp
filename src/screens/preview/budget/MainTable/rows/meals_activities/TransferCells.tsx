import { useEffect } from 'react'
import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { useContextBudget } from '../../../context/BudgetContext'
import { UPDATE_PROGRAM_TRANSFERS_COST } from '../../../context/budgetReducer'

interface Props {
  description: string
  date: string
  option: ITransfer
  count: number
  id:
    | 'transfer_morningEvents'
    | 'transfer_lunch'
    | 'transfer_afternoonEvents'
    | 'transfer_dinner'
    | 'transfer_morningItinerary'
    | 'transfer_afternoonItinerary'
}

const serviceDescriptions: { [key: string]: string } = {
  dispo_4h: '4 Hours at Disposal',
  dispo_4h_night: '4 Night Hours at Disposal',
  dispo_5h_out: '5 Hours at Disposal Out of Town',
  dispo_6h: '6 Hours at Disposal',
  dispo_6h_night: '6 Night Hours at Disposal',
  dispo_9h: '9 Hours at Disposal'
}

export const TransferCells = ({
  description,
  date,
  option,
  count,
  id
}: Props) => {
  const { dispatch } = useContextBudget()
  const serviceKey = option.selectedService as keyof ITransfer
  const serviceCost = Number(option[serviceKey])
  const serviceDescription =
    serviceDescriptions[option.selectedService] || option.selectedService

  useEffect(() => {
    dispatch({
      type: UPDATE_PROGRAM_TRANSFERS_COST,
      payload: {
        date,
        transfer: option,
        count,
        type: id
      }
    })
  }, [])

  return (
    <>
      <td>{description}</td>
      <td>{`${option.vehicleCapacity} Seater Bus,  ${serviceDescription}`}</td>
      <td>{count}</td>
      <td>{accounting.formatMoney(serviceCost, '€')}</td>
      <td>{accounting.formatMoney(count * serviceCost, '€')}</td>
    </>
  )
}
