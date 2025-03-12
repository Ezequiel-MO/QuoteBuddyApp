import { createContext, useContext, useReducer } from 'react'
import * as typescript from './contextInterfaces'
import { initialState } from './initialState'

const QuotationContext = createContext<
	| {
			state: typescript.QuotationState
			dispatch: React.Dispatch<typescript.QuotationAction>
	  }
	| undefined
>(undefined)

function quotationReducer(
	state: typescript.QuotationState,
	action: typescript.QuotationAction
): typescript.QuotationState {
	switch (action.type) {
		case 'TOGGLE_SIDEBAR':
			return {
				...state,
				isSidebarOpen:
					action.payload !== undefined ? action.payload : !state.isSidebarOpen
			}

		case 'TOGGLE_OVERVIEW':
			return {
				...state,
				isOverviewExpanded:
					action.payload !== undefined
						? action.payload
						: !state.isOverviewExpanded
			}

		default:
			return state
	}
}

export const QuotationProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(quotationReducer, initialState)

	return (
		<QuotationContext.Provider value={{ state, dispatch }}>
			{children}
		</QuotationContext.Provider>
	)
}

// Custom hook for accessing the context
export const useQuotation = () => {
	const context = useContext(QuotationContext)

	if (context === undefined) {
		throw new Error('useQuotation must be used within a QuotationProvider')
	}

	return context
}
