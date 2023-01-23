import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	invoiceValues: {
		date: 'September 27th, 2022',
		client: 'Ms. Samantha Hoffman',
		company: 'Meetings & Incentives Worldwide Inc',
		address: '1050 Seven Mile Road Caledonia',
		postCode: 'W1 53105 USAAAA',
		reference: 'MA&OR Global Leaders Summit',
		VATNr: 'VAT 123456789',
		invoiceNumber: 23001,
		lineDate: '2023-09-21',
		lineText:
			'Services rendered to group Toyota during their stay in Malaga from Sept 3rd - 6th, 2022',
		taxBreakdown: false,
		taxBase: 0,
		taxRate: 21,
		taxAmount: 0,
		expenses: 0,
		lineAmount: 12000,
		postingStatus: 'posting',
		currency: 'EUR',
		linesBreakdown: false,
		breakdownLines: [
			{
				status: 'posting',
				date: '2023-09-21',
				text: 'Bus transfers',
				amount: 1500
			}
		]
	}
}

export const currentInvoiceSlice = createSlice({
	name: 'currentInvoice',
	initialState,
	reducers: {
		SET_INVOICE_VALUE: (state, action) => {
			const { name, value } = action.payload
			return {
				...state,
				invoiceValues: {
					...state.invoiceValues,
					[name]: value
				}
			}
		},

		SET_INVOICE: (state, action) => {
			const {
				address,
				client,
				company,
				date,
				invoiceNumber,
				lineAmount,
				lineDate,
				lineText,
				postCode,
				reference,
				VATNr,
				postingStatus
			} = action.payload
			return {
				...state,
				invoiceValues: {
					...state.invoiceValues,
					address,
					client,
					company,
					date,
					invoiceNumber,
					lineAmount,
					lineDate,
					lineText,
					postCode,
					reference,
					VATNr,
					postingStatus
				}
			}
		},
		INCREMENT_INVOICE_NUMBER: (state, action) => {
			return {
				...state,
				invoiceValues: {
					...state.invoiceValues,
					invoiceNumber: action.payload + 1
				}
			}
		},
		CHANGE_POSTING_STATUS: (state, action) => {
			return {
				...state,
				invoiceValues: {
					...state.invoiceValues,
					postingStatus: action.payload
				}
			}
		},
		CHANGE_CURRENCY: (state, action) => {
			return {
				...state,
				invoiceValues: {
					...state.invoiceValues,
					currency: action.payload
				}
			}
		},
		TOGGLE_TAX_BREAKDOWN: (state, action) => {
			return {
				...state,
				invoiceValues: {
					...state.invoiceValues,
					taxBreakdown: action.payload
				}
			}
		},
		TOGGLE_LINES_BREAKDOWN: (state, action) => {
			return {
				...state,
				invoiceValues: {
					...state.invoiceValues,
					linesBreakdown: action.payload
				}
			}
		},
		ADD_BREAKDOWN_LINE: (state, action) => {
			return {
				...state,
				invoiceValues: {
					...state.invoiceValues,
					lines: [...state.invoiceValues.lines, action.payload]
				}
			}
		}
	}
})

export const {
	SET_INVOICE_VALUE,
	SET_INVOICE,
	INCREMENT_INVOICE_NUMBER,
	CHANGE_POSTING_STATUS,
	CHANGE_CURRENCY,
	TOGGLE_TAX_BREAKDOWN,
	TOGGLE_LINES_BREAKDOWN,
	ADD_BREAKDOWN_LINE
} = currentInvoiceSlice.actions

export const selectCurrentInvoice = (state) =>
	state.currentInvoice.invoiceValues

export default currentInvoiceSlice.reducer
