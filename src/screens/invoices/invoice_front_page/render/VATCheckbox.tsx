import { useInvoice } from '@screens/invoices/context/InvoiceContext'

export const VATCheckbox: React.FC = () => {
	const { state, handleChange } = useInvoice()
	const invoice = state.currentInvoice
	if (!invoice) {
		return <div>No invoice data available. Please load an invoice.</div>
	}
	if (invoice.status !== 'posting') return null

	return (
		<div id="vat_checkbox">
			<label htmlFor="VAT" className="text-black-50 mr-2">
				Include VAT
			</label>
			<input
				type="checkbox"
				id="VAT"
				className="mr-2"
				checked={invoice.taxBreakdown}
				onChange={handleChange}
			/>
		</div>
	)
}
