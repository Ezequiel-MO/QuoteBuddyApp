import { Dispatch, createContext } from 'react'
import { IInvoice } from '@interfaces/invoice'
import { InvoiceAction } from './Actions'

export const initialState: IInvoice = {
	status: 'posting',
	date: '',
	projectCode: '',
	client: '',
	company: '',
	address: '',
	postCode: '',
	reference: '',
	VATNr: '',
	invoiceNumber: '',
	lineDate: '',
	lineText: '',
	taxBreakdown: false,
	taxBase: 0,
	taxRate: 21,
	taxAmount: 0,
	expenses: 0,
	lineAmount: 0,
	breakdownLines: [
		{
			date: '',
			text: '',
			amount: 0
		}
	],
	currency: 'EUR'
}

export const InvoiceContext = createContext<{
	state: IInvoice
	dispatch: Dispatch<InvoiceAction>
}>({
	state: initialState,
	dispatch: () => null
})
