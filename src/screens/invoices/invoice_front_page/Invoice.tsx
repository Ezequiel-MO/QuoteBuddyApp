import { forwardRef } from 'react'
import { InvoiceBreakdown } from '../breakdown'
import { InvoiceFrontPage } from '.'
import { useInvoice } from '../context/InvoiceContext'

const Invoice = forwardRef<HTMLDivElement>((props, ref) => {
	const { state } = useInvoice()
	if (!state.currentInvoice) {
		return <div>No invoice data available. Please load an invoice.</div>
	}

	return (
		<div ref={ref} className="flex flex-col items-center justify-center">
			<div className="bg-white-0 text-white-0 w-[800px] min-h-screen relative flex flex-col">
				<InvoiceFrontPage />
			</div>
			{state.currentInvoice?.linesBreakdown && (
				<div className="bg-white-0 text-white-0 w-[800px] h-screen relative flex flex-col">
					<InvoiceBreakdown />
				</div>
			)}
		</div>
	)
})

export default Invoice
