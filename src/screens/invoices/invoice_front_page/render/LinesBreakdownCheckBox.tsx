import { useInvoice } from '@screens/invoices/context/InvoiceContext'

export const LinesBreakdownCheckBox: React.FC = () => {
	const { state, handleChange } = useInvoice()
	const invoice = state.currentInvoice

	if (!invoice) {
		return <div>No invoice data available. Please load an invoice.</div>
	}

	if (invoice.status !== 'posting') return null

	return (
		<div id="lines_breakdown_checkbox">
			<label htmlFor="BreakDown" className="text-black-50 mr-2">
				Include Breakdown
			</label>
			<input
				type="checkbox"
				id="Breakdown"
				className="mr-2"
				checked={invoice.linesBreakdown}
				onChange={handleChange}
			/>
		</div>
	)
}
