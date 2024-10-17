import { useSelector } from 'react-redux'
import { useTotalsBudgetActions } from 'src/redux/features/budget/actions'
import { selectBudgetTotal } from 'src/redux/features/budget/CurrentBudgetSelectors'

export const useCurrentBudget = () => {
	const budgetTotal = useSelector(selectBudgetTotal)
	const { setBudgetTotal } = useTotalsBudgetActions()

	return {
		budgetTotal,
		setBudgetTotal
	}
}
