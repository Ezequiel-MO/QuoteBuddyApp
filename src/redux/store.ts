import { configureStore } from '@reduxjs/toolkit'
import projectReducer from './features/currentProject/slices/project/projectSlice'
import currentProjectReducer from './features/currentProject/CurrentProjectSlice'
import currentBudgetReducer from './features/budget/currentBudgetSlice'
import transferCompaniesReducer from './features/TransferCompaniesSlice'
import transfersOutReducer from './features/TransfersOutSlice'
import tranfersInReducer from './features/TransfersInSlice'

const store = configureStore({
	reducer: {
		project: projectReducer,
		currentProject: currentProjectReducer,
		currentBudget: currentBudgetReducer,
		transferCompanies: transferCompaniesReducer,
		transfersOut: transfersOutReducer,
		transfersIn: tranfersInReducer
	},

	devTools: process.env.NODE_ENV !== 'production'
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
