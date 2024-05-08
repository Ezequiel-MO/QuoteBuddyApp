import React, {
	createContext,
	useContext,
	useReducer,
	ReactNode,
	Dispatch,
	ChangeEvent
} from 'react'
import { IInvoice } from '@interfaces/invoice'
import * as typescript from './contextInterfaces'

const initialState: typescript.InvoiceState = {
	currentInvoice: null
}

const InvoiceContext = createContext<
	| {
			state: typescript.InvoiceState
			dispatch: Dispatch<typescript.InvoiceAction>
			handleChange: (
				e: ChangeEvent<
					HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
				>
			) => void
	  }
	| undefined
>(undefined)

const invoiceReducer = (
	state: typescript.InvoiceState,
	action: typescript.InvoiceAction
): typescript.InvoiceState => {
	switch (action.type) {
		case 'SET_INVOICE':
			return { ...state, currentInvoice: action.payload }
		case 'UPDATE_INVOICE_FIELD':
			return {
				...state,
				currentInvoice: {
					...state.currentInvoice,
					[action.payload.name]: action.payload.value
				}
			}
		case 'INCREMENT_INVOICE_NUMBER':
			const todaysYear = new Date().getFullYear().toString().slice(2)
			let maxInvoiceNumber = '000'
			if (action.payload && action.payload.length > 0) {
				const sortedInvoices = action.payload.sort((a, b) =>
					b.invoiceNumber.localeCompare(a.invoiceNumber)
				)
				const lastInvoiceNumber = sortedInvoices[0].invoiceNumber
				const lastYear = lastInvoiceNumber.slice(0, 2)
				const lastNumber = parseInt(lastInvoiceNumber.slice(2))

				if (lastYear === todaysYear) {
					maxInvoiceNumber = (lastNumber + 1).toString().padStart(3, '0')
				} else {
					maxInvoiceNumber = '001'
				}
			}
			return {
				...state,
				currentInvoice: {
					...state.currentInvoice,
					invoiceNumber: `${todaysYear}${maxInvoiceNumber}`
				}
			}
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
	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
	) => {
		let value: string | number | boolean
		const target = e.target as
			| HTMLInputElement
			| HTMLSelectElement
			| HTMLTextAreaElement

		if (target instanceof HTMLInputElement && target.type === 'checkbox') {
			value = target.checked
		} else {
			value = target.value
		}

		const name = target.name as keyof IInvoice

		dispatch({
			type: 'UPDATE_INVOICE_FIELD',
			payload: { name, value }
		})
	}

	return (
		<InvoiceContext.Provider value={{ state, dispatch, handleChange }}>
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
