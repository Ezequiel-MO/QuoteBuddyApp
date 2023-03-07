import { useParams } from 'react-router-dom'
import { formatMoney } from '../../../helper'
import { useGetInvoiceById } from '../../../hooks'

export const InvoiceBreakdownTableVisualize = () => {
	const { invoiceId } = useParams()
	const { isLoading, invoice } = useGetInvoiceById(invoiceId)
	const { breakdownLines, currency, lineAmount } = invoice

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<table className="ml-10 text-black-50 w-[700px] border max-h-[500px] table-fixed z-50">
			<tbody>
				{breakdownLines?.slice(1).map((line, index) => (
					<tr key={index} className="h-auto">
						<td className="border-r-1 pl-2 w-[120px]">
							<p className="flex items-center overflow-hidden">{line.date}</p>
						</td>
						<td className="border-r-1 pl-2">
							<p className="indent-5 text-wrap p-2">{line.text}</p>
						</td>
						<td className="border-r-1 pl-2 w-[120px]">
							<div className="flex items-center">
								{formatMoney(line.amount, `${currency} `, 2, '.', ',')}
							</div>
						</td>
					</tr>
				))}
			</tbody>
			<tfoot>
				<tr className="border-2 pl-2 font-bold">
					<td></td>
					<td>TOTAL INVOICE</td>
					<td>{formatMoney(lineAmount, currency)}</td>
				</tr>
			</tfoot>
		</table>
	)
}
