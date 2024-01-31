import React, { ReactNode, useReducer } from 'react'
import { invoiceReducer } from './Reducer'
import { InvoiceContext, initialState } from './Context'

interface Props {
	children: ReactNode
}

export const InvoiceProvider: React.FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(invoiceReducer, initialState)

	return (
		<InvoiceContext.Provider value={{ state, dispatch }}>
			{children}
		</InvoiceContext.Provider>
	)
}
