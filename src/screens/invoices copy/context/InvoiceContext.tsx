// contexts/InvoiceContext.tsx
import React, {
	createContext,
	useContext,
	useReducer,
	ReactNode,
	Dispatch
} from 'react'
import { IInvoice } from '@interfaces/invoice'

interface InvoiceState {
	currentInvoice: IInvoice | null
}

type InvoiceAction =
	| { type: 'SET_INVOICE'; payload: IInvoice }
	| { type: 'CLEAR_INVOICE' }

const initialState: InvoiceState = {
	currentInvoice: null
}

const InvoiceContext = createContext<
	{ state: InvoiceState; dispatch: Dispatch<InvoiceAction> } | undefined
>(undefined)

const invoiceReducer = (
	state: InvoiceState,
	action: InvoiceAction
): InvoiceState => {
	switch (action.type) {
		case 'SET_INVOICE':
			return { ...state, currentInvoice: action.payload }
		case 'CLEAR_INVOICE':
			return { ...state, currentInvoice: null }
		default:
			throw new Error(`Unhandled action type: ${action}`)
	}
}

export const InvoiceProvider: React.FC<{ children: ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(invoiceReducer, initialState)
	return (
		<InvoiceContext.Provider value={{ state, dispatch }}>
			{children}
		</InvoiceContext.Provider>
	)
}

export const useInvoice = () => {
	const context = useContext(InvoiceContext)
	if (context === undefined) {
		throw new Error('useInvoice must be used within a InvoiceProvider')
	}
	return context
}
