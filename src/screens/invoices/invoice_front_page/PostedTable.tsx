import { formatMoney } from '../../../helper'
import { useInvoice } from '../context/InvoiceContext'

export const PostedTable: React.FC = () => {
	const { state } = useInvoice()
	const invoice = state.currentInvoice

	if (!invoice) {
		return <div>No invoice data available. Please load an invoice.</div>
	}
	const {
		lineDate,
		lineText,
		lineAmount,
		expenses,
		currency,
		taxBreakdown,
		/* taxBase10, */
		taxBase21
	} = invoice

	return (
		<table className="ml-10 text-black-50 w-[700px] border max-h-[500px] table-fixed z-50">
			<tbody>
				<tr>
					<td className="border border-r-1 pl-2 w-[120px]">{lineDate}</td>
					<td className="border border-r-1 pl-2">{lineText}</td>
					<td className="border border-r-1 pl-2 w-[120px]">
						<div className="flex items-center">
							{`${formatMoney(lineAmount || 0, `${currency}    `)}`}
						</div>
					</td>
				</tr>
			</tbody>
			<tfoot>
				{taxBreakdown && currency === 'EUR' ? (
					<>
						<tr>
							<td></td>
							<td>{`Tax Base @ 21% - EUR ${taxBase21}`}</td>
							<td>{formatMoney(0.21 * (taxBase21 || 0))}</td>
						</tr>
						{/* <tr>
							<td></td>
							<td>{`Tax Base @ 10% - EUR ${taxBase10}`}</td>
							<td>{formatMoney(0.1 * (taxBase10 || 0))}</td>
						</tr> */}
						<tr>
							<td></td>
							<td>Expenses</td>
							<td>{formatMoney(expenses || 0)}</td>
						</tr>
					</>
				) : (
					<tr className="border-2 pl-2 font-bold">
						<td></td>
						<td>TOTAL INVOICE</td>
						<td>{formatMoney(lineAmount || 0, currency)}</td>
					</tr>
				)}
			</tfoot>
		</table>
	)
}
