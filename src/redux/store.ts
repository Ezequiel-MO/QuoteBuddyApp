import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import currentProjectReducer from './features/currentProject/CurrentProjectSlice'
import currentBudgetReducer from './features/budget/currentBudgetSlice'
import transferCompaniesReducer from './features/TransferCompaniesSlice'
import transfersOutReducer from './features/TransfersOutSlice'
import tranfersInReducer from './features/TransfersInSlice'

const store = configureStore({
	reducer: {
		currentProject: currentProjectReducer,
		currentBudget: currentBudgetReducer,
		transferCompanies: transferCompaniesReducer,
		transfersOut: transfersOutReducer,
		transfersIn: tranfersInReducer
	},
	devTools: process.env.NODE_ENV !== 'production'
})

export default store

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
