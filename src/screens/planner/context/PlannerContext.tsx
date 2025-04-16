import { Dispatch, createContext, useContext, useReducer } from 'react'
import * as typescript from './contextinterfaces'
import initialState from './initialState'

const PlannerContext = createContext<
	| {
			state: typescript.PlannerState
			dispatch: Dispatch<typescript.PlannerAction>
	  }
	| undefined
>(undefined)

const plannerReducer = (
	state: typescript.PlannerState,
	action: typescript.PlannerAction
): typescript.PlannerState => {
	switch (action.type) {
		case 'TOGGLE_SIDEBAR':
			return { ...state, sidebarVisible: action.payload }
		case 'TOGGLE_MODAL':
			return { ...state, modalOpen: action.payload }
		case 'SET_SEARCH_TERM':
			return { ...state, searchTerm: action.payload }
		default:
			return state
	}
}

export const PlannerProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(plannerReducer, initialState)

	return (
		<PlannerContext.Provider
			value={{
				state,
				dispatch
			}}
		>
			{children}
		</PlannerContext.Provider>
	)
}

export const usePlannerContext = () => {
	const context = useContext(PlannerContext)
	if (context === undefined) {
		throw new Error('usePlannerContext must be used within a PlannerProvider')
	}
	return context
}
