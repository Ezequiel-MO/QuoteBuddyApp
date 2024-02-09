import accounting from 'accounting'
import { useContextBudget } from '../../../context/BudgetContext'

export const HotelTotalCost = () => {
  const { state } = useContextBudget()

  return <td>{accounting.formatMoney(state.selectedHotelCost, '€')}</td>
}
