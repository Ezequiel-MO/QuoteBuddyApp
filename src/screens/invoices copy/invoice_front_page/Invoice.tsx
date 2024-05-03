import { forwardRef, Ref, ReactElement } from 'react'
import { useCurrentInvoice } from '../../../hooks'
import { InvoiceBreakdown } from '../breakdown'
import { InvoiceFrontPage } from '.'

interface InvoiceProps {
	posting: boolean
}

const Invoice = forwardRef<HTMLDivElement, InvoiceProps>(
	({ posting }, ref: Ref<HTMLDivElement>): ReactElement => {
		const { currentInvoice } = useCurrentInvoice()
		const { linesBreakdown } = currentInvoice

		return (
			<div ref={ref} className="flex flex-col items-center justify-center">
				<div className="bg-white-0 text-white-0 w-[800px] min-h-screen relative flex flex-col">
					<InvoiceFrontPage invoice={currentInvoice} posting={posting} />
				</div>
				{linesBreakdown && (
					<div className="bg-white-0 text-white-0 w-[800px] h-screen relative flex flex-col">
						<InvoiceBreakdown />
					</div>
				)}
			</div>
		)
	}
)

export default Invoice
