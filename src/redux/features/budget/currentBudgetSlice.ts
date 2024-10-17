import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IInitialBudgetstate } from './types'

const initialState: IInitialBudgetstate = {
	budgetTotal: 0
}

const currentBudgetSlice = createSlice({
	name: 'currentBudget',
	initialState,
	reducers: {
		SET_BUDGET_TOTAL: (state, action: PayloadAction<number>) => {
			state.budgetTotal = action.payload
		}
	}
})

export const { SET_BUDGET_TOTAL } = currentBudgetSlice.actions

export default currentBudgetSlice.reducer
