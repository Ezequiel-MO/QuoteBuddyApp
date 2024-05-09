import { useEffect } from 'react'
import { useInvoice } from '../context/InvoiceContext'

interface Props {
	breakdown: boolean
}

export const InvoiceTableHeader = ({ breakdown }: Props) => {
	const { state, dispatch } = useInvoice()

	useEffect(() => {
		if (state.currentInvoice?.invoiceNumber === '') {
			const storedInvoiceNumber = sessionStorage.getItem('invoiceNumber') || ''
			dispatch({
				type: 'UPDATE_INVOICE_FIELD',
				payload: { name: 'invoiceNumber', value: storedInvoiceNumber }
			})
		}
	}, [state.currentInvoice?.invoiceNumber, dispatch])

	const invoiceNumber =
		state.currentInvoice?.invoiceNumber ?? 'No Invoice Number'

	return (
		<div className="text-black-50 px-2 ml-10 mt-10 w-[700px] bg-white-50 flex items-center z-50">
			<span className="font-bold">INVOICE:</span>
			<span className="font-normal mx-3">{invoiceNumber}</span>
			<span className="font-normal">{`${breakdown ? 'BREAKDOWN' : ''}`}</span>
		</div>
	)
}
