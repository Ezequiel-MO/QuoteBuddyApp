import { forwardRef } from 'react'
import { InvoiceBreakdown } from '../breakdown'
import { InvoiceFrontPage } from '.'
import { useInvoice } from '../context/InvoiceContext'

const Invoice = forwardRef<HTMLDivElement>((props, ref) => {
	const { state } = useInvoice()
	if (!state.currentInvoice) {
		return <div>No invoice data available. Please load an invoice.</div>
	}
	const hasBreakdown =
		state.currentInvoice.breakdownLines &&
		state.currentInvoice.breakdownLines.length > 0

	return (
		<div ref={ref} className="flex flex-col items-center justify-center">
			<div className="bg-white-0 text-white-0 w-[800px] min-h-screen relative flex flex-col">
				<InvoiceFrontPage />
			</div>
			{hasBreakdown && (
				<div className="bg-white-0 text-white-0 w-[800px] h-screen relative flex flex-col">
					<InvoiceBreakdown />
				</div>
			)}
		</div>
	)
})

export default Invoice
