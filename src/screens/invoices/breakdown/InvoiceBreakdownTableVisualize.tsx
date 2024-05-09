import { formatMoney } from '../../../helper'
import { useInvoice } from '../context/InvoiceContext'

export const InvoiceBreakdownTableVisualize = () => {
	const { state } = useInvoice()

	return (
		<table className="ml-10 text-black-50 w-[700px] border max-h-[500px] table-fixed z-50">
			<tbody>
				{state.currentInvoice?.breakdownLines?.map((line, index) => (
					<tr key={index} className="h-auto">
						<td className="border-r-1 pl-2 w-[120px]">
							<p className="flex items-center overflow-hidden">{line.date}</p>
						</td>
						<td className="border-r-1 pl-2">
							<p className="indent-5 text-wrap p-2">{line.text}</p>
						</td>
						<td className="border-r-1 pl-2 w-[120px]">
							<div className="flex items-center">
								{formatMoney(line.amount, `${state.currentInvoice?.currency} `)}
							</div>
						</td>
					</tr>
				))}
			</tbody>
			<tfoot>
				<tr className="border-2 pl-2 font-bold">
					<td></td>
					<td>TOTAL INVOICE</td>
					<td>
						{formatMoney(
							state.currentInvoice?.lineAmount ?? 0,
							state.currentInvoice?.currency
						)}
					</td>
				</tr>
			</tfoot>
		</table>
	)
}
