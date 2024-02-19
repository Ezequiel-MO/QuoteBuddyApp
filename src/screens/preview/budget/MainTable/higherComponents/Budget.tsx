import { BudgetContainer, BudgetTable } from '.'
import { useContextBudget } from '../../context/BudgetContext'

export const Budget = () => {
	const { state, dispatch } = useContextBudget()
	return (
		<BudgetContainer>
			<BudgetTable state={state} dispatch={dispatch} />
		</BudgetContainer>
	)
}
