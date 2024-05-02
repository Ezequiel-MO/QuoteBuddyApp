import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	invoiceValues: {
		date: '',
		client: '',
		company: '',
		address: '',
		postCode: '',
		reference: '',
		VATNr: '',
		invoiceNumber: '',
		lineDate: '2023-09-21',
		lineText: '... some text ...',
		taxBreakdown: false,
		taxBase: 0,
		taxRate: 21,
		taxAmount: 0,
		taxBase10: 0,
		taxBase21: 0,
		expenses: 0,
		lineAmount: 0,
		postingStatus: 'posting',
		currency: 'EUR',
		linesBreakdown: false,
		projectCode: '',
		breakdownLines: [
			{
				id: '',
				date: '',
				text: '',
				amount: 0
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
			state.invoiceValues[name] = value
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
			state.invoiceValues = {
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
		},
		INCREMENT_INVOICE_NUMBER: (state, action) => {
			state.invoiceValues.invoiceNumber = action.payload + 1
			sessionStorage.setItem(
				'invoiceNumber',
				JSON.stringify(action.payload + 1)
			)
		},
		CHANGE_POSTING_STATUS: (state, action) => {
			state.invoiceValues.postingStatus = action.payload
		},
		CHANGE_CURRENCY: (state, action) => {
			state.invoiceValues.currency = action.payload
		},
		TOGGLE_TAX_BREAKDOWN: (state, action) => {
			state.invoiceValues.taxBreakdown = action.payload
		},
		TOGGLE_LINES_BREAKDOWN: (state, action) => {
			state.invoiceValues.linesBreakdown = action.payload
		},
		ADD_BREAKDOWN_LINE: (state, action) => {
			state.invoiceValues.breakdownLines = [
				...state.invoiceValues.breakdownLines,
				action.payload
			]
		},
		UPDATE_BREAKDOWN_LINE: (state, action) => {
			const { id, line } = action.payload

			const updatedBreakdownLines = state.invoiceValues.breakdownLines.map(
				(breakdownLine) => {
					if (breakdownLine?.id === id) {
						return line
					} else {
						return breakdownLine
					}
				}
			)
			state.invoiceValues.breakdownLines = updatedBreakdownLines
		},
		DELETE_BREAKDOWN_LINE: (state, action) => {
			const { id } = action.payload
			const updatedBreakdownLines = state.invoiceValues.breakdownLines.filter(
				(breakdownLine) => breakdownLine.id !== id
			)
			state.invoiceValues.breakdownLines = updatedBreakdownLines
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
	ADD_BREAKDOWN_LINE,
	UPDATE_BREAKDOWN_LINE,
	DELETE_BREAKDOWN_LINE
} = currentInvoiceSlice.actions

export const selectCurrentInvoice = (state) =>
	state.currentInvoice.invoiceValues

export default currentInvoiceSlice.reducer
