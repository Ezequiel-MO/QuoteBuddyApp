import {
	Action,
	combineReducers,
	configureStore,
	ThunkAction
} from '@reduxjs/toolkit'
import currentProjectReducer from './features/currentProject/CurrentProjectSlice'
import currentBudgetReducer from './features/budget/currentBudgetSlice'
import transferCompaniesReducer from './features/TransferCompaniesSlice'
import { defaultProject } from './features/currentProject/defaultProjectState'
import { IInitialState } from './features/currentProject/types'

const rootReducer = combineReducers({
	currentProject: currentProjectReducer,
	currentBudget: currentBudgetReducer,
	transferCompanies: transferCompaniesReducer
})

let preloadedState: {
	currentProject: IInitialState
} = {
	currentProject: {
		project: defaultProject,
		modalIsOpen: false,
		errors: {}
	}
}

try {
	const persistedCurrentProject = localStorage.getItem('currentProject')
	if (persistedCurrentProject) {
		const parsedState: IInitialState = JSON.parse(persistedCurrentProject)
		preloadedState.currentProject = {
			project: { ...defaultProject, ...parsedState.project },
			modalIsOpen: parsedState.modalIsOpen || false,
			errors: parsedState.errors || {}
		}
	}
} catch (e) {
	console.error('Error retrieving state from localStorage:', e)
}

const store = configureStore({
	reducer: rootReducer,
	preloadedState,
	devTools: process.env.NODE_ENV !== 'production'
})

store.subscribe(() => {
	try {
		const currentState = store.getState().currentProject
		localStorage.setItem('currentProject', JSON.stringify(currentState))
	} catch (e) {
		console.error('Error saving state to localStorage:', e)
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>

export default store
