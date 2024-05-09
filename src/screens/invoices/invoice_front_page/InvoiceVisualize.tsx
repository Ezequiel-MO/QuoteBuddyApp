import { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { InvoiceFrontPage } from '.'
import { InvoiceBreakdownVisualize } from '../breakdown'
import { Icon } from '@iconify/react'
import { useInvoice } from '../context/InvoiceContext'

export const InvoiceVisualize = () => {
	const invoiceVisualizeRef = useRef<HTMLDivElement>(null)
	const { state } = useInvoice()

	const breakdownLines = state.currentInvoice?.breakdownLines ?? []
	const visualizeBreakdown =
		breakdownLines.length > 1 ||
		(breakdownLines.length === 1 && breakdownLines[0].amount !== 0)

	return (
		<div>
			<ReactToPrint
				trigger={() => (
					<button className="flex flex-row items-center mb-2">
						<span>
							<Icon
								icon="ant-design:file-pdf-twotone"
								color="#ea5933"
								width="40"
							/>
						</span>
						Print the Invoice to a PDF
					</button>
				)}
				content={() => invoiceVisualizeRef.current}
			/>
			<div
				className="flex flex-col items-center justify-center"
				ref={invoiceVisualizeRef}
			>
				<div className="bg-white-0 text-white-0 w-[800px] h-[1126px] relative flex flex-col invoice-item">
					<InvoiceFrontPage />
				</div>
				{visualizeBreakdown && (
					<div className="bg-white-0 text-white-0 w-[800px] h-[1126px] relative flex flex-col invoice-item">
						<InvoiceBreakdownVisualize />
					</div>
				)}
			</div>
		</div>
	)
}
