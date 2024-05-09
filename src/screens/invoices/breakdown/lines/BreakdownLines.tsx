import { useInvoice } from '@screens/invoices/context/InvoiceContext'
import BreakdownLine from './BreakdownLine'

export const BreakdownLines = () => {
	const { state } = useInvoice()

	return (
		<>
			{state.currentInvoice?.breakdownLines?.map((line) => (
				<div key={line?.id} className="h-auto">
					<BreakdownLine line={line} />
				</div>
			))}
		</>
	)
}
