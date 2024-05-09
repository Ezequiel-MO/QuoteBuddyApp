import { useState, useEffect } from 'react'
import { useInvoice } from '@screens/invoices/context/InvoiceContext'
import { IInvoiceBreakdownLine } from '@interfaces/invoice'
import BreakdownLine from './BreakdownLine'

export const BreakdownLines = () => {
	const { state } = useInvoice()
	const [foundLines, setFoundLines] = useState<IInvoiceBreakdownLine[]>([])

	useEffect(() => {
		setFoundLines(state.currentInvoice?.breakdownLines ?? [])
	}, [state.currentInvoice?.breakdownLines])

	return (
		<>
			{foundLines.slice(1).map((line) => (
				<div key={line?.id} className="h-auto">
					<BreakdownLine line={line} />
				</div>
			))}
		</>
	)
}
