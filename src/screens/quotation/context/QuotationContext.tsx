import { createContext, Dispatch, useContext, useReducer } from 'react'
import * as typescript from './contextinterfaces'
import initialState from './initialState'
import quotationReducer from './quotationReducer'

const QuotationContext = createContext<
	| {
			state: typescript.QuotationState
			dispatch: Dispatch<typescript.QuotationAction>
	  }
	| undefined
>(undefined)

export const QuotationProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(quotationReducer, initialState)

	return (
		<QuotationContext.Provider
			value={{
				state,
				dispatch
			}}
		>
			{children}
		</QuotationContext.Provider>
	)
}

export const useQuotation = () => {
	const context = useContext(QuotationContext)
	if (context === undefined) {
		throw new Error('useQuotation must be used within a QuotationProvider')
	}
	return context
}
