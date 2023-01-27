import { useDispatch, useSelector } from 'react-redux'
import {
	SET_INVOICE_VALUE,
	INCREMENT_INVOICE_NUMBER,
	CHANGE_POSTING_STATUS,
	SET_INVOICE,
	CHANGE_CURRENCY,
	selectCurrentInvoice,
	TOGGLE_TAX_BREAKDOWN,
	TOGGLE_LINES_BREAKDOWN,
	ADD_BREAKDOWN_LINE,
	UPDATE_BREAKDOWN_LINE,
	DELETE_BREAKDOWN_LINE
} from '../redux/features/CurrentInvoiceSlice'

export const useCurrentInvoice = () => {
	const dispatch = useDispatch()
	const currentInvoice = useSelector(selectCurrentInvoice)
	const setInvoiceValue = (invoiceValue) => {
		dispatch(SET_INVOICE_VALUE(invoiceValue))
	}
	const setInvoice = (invoiceData) => {
		dispatch(SET_INVOICE(invoiceData))
	}
	const incrementInvoiceNumber = (invoiceNumber) => {
		dispatch(INCREMENT_INVOICE_NUMBER(invoiceNumber))
	}
	const changePostingStatus = (status) => {
		dispatch(CHANGE_POSTING_STATUS(status))
	}

	const changeCurrency = (currency) => {
		dispatch(CHANGE_CURRENCY(currency))
	}

	const toggleTaxBreakdown = (status) => {
		dispatch(TOGGLE_TAX_BREAKDOWN(status))
	}

	const toggleLinesBreakdown = (status) => {
		dispatch(TOGGLE_LINES_BREAKDOWN(status))
	}

	const addBreakdownLine = (line) => {
		dispatch(ADD_BREAKDOWN_LINE(line))
	}

	const updateBreakdownLine = (id, line) => {
		dispatch(UPDATE_BREAKDOWN_LINE({ id, line }))
	}

	const deleteBreakdownLine = (id) => {
		dispatch(DELETE_BREAKDOWN_LINE({ id }))
	}

	return {
		currentInvoice,
		setInvoiceValue,
		setInvoice,
		incrementInvoiceNumber,
		changePostingStatus,
		toggleTaxBreakdown,
		changeCurrency,
		toggleLinesBreakdown,
		addBreakdownLine,
		updateBreakdownLine,
		deleteBreakdownLine
	}
}
