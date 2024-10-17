import { createSelector } from 'reselect'
import { RootState } from 'src/redux/store'

// Input selector to get the current project state slice
const selectBudgetState = (state: RootState) => state.currentBudget

export const selectBudgetTotal = createSelector(
	[selectBudgetState],
	(budgetState) => budgetState.budgetTotal
)
