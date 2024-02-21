import { BudgetTable } from '.'
import { useContextBudget } from '../../context/BudgetContext'

export const Budget = () => {
	const { state, dispatch } = useContextBudget()
	return <BudgetTable state={state} dispatch={dispatch} />
}
