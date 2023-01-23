import { forwardRef } from 'react'
import { useCurrentInvoice } from '../../hooks'
import InvoiceBreakdown from './InvoiceBreakdown'
import InvoiceFrontPage from './InvoiceFrontPage'

// eslint-disable-next-line react/display-name
const Invoice = forwardRef((_props, ref) => {
	const { currentInvoice } = useCurrentInvoice()
	const { linesBreakdown } = currentInvoice
	return (
		<div ref={ref} className="flex flex-col items-center justify-center">
			<div className="bg-white-0 text-white-0 w-[800px] h-[1126px] relative flex flex-col">
				<InvoiceFrontPage />
			</div>
			{linesBreakdown && (
				<div className="bg-white-0 text-white-0 w-[800px] h-[1126px] relative flex flex-col">
					<InvoiceBreakdown />
				</div>
			)}
		</div>
	)
})

export default Invoice
