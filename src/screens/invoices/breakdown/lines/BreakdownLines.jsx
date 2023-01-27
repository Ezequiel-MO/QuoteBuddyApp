import { useCurrentInvoice } from '../../../../hooks'
import { BreakdownLine } from './BreakdownLine'

export const BreakdownLines = () => {
	const { currentInvoice } = useCurrentInvoice()
	const { breakdownLines } = currentInvoice
	return (
		<>
			{breakdownLines?.slice(1).map((line) => (
				<tr key={line.id} className="h-auto">
					<BreakdownLine line={line} />
				</tr>
			))}
		</>
	)
}
