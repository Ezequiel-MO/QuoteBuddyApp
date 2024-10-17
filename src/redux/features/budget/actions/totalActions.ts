import { useDispatch } from 'react-redux'
import { SET_BUDGET_TOTAL } from '../currentBudgetSlice'

export const useTotalsBudgetActions = () => {
	const dispatch = useDispatch()

	const setBudgetTotal = (total: number) => {
		dispatch(SET_BUDGET_TOTAL(total))
	}

	return {
		setBudgetTotal
	}
}
