import { formatMoney } from '../../../helper'

export const PostedTable = ({ invoice }) => {
	const {
		lineDate,
		lineText,
		lineAmount,
		expenses,
		currency,
		taxBreakdown,
		taxRate
	} = invoice ?? {}

	const taxBase = (lineAmount - expenses) / (1 + taxRate / 100)
	const taxAmount = (taxBase * taxRate) / 100

	return (
		<table className="ml-10 text-black-50 w-[700px] border max-h-[500px] table-fixed z-50">
			<tbody>
				<tr>
					<td className="border border-r-1 pl-2 w-[120px]">{lineDate}</td>
					<td className="border border-r-1 pl-2">{lineText}</td>
					<td className="border border-r-1 pl-2 w-[120px]">
						<div className="flex items-center">
							{`${formatMoney(lineAmount, `${currency}    `)}`}
						</div>
					</td>
				</tr>
			</tbody>
			<tfoot>
				{taxBreakdown && currency === 'EUR' ? (
					<>
						<tr>
							<td></td>
							<td>{`Tax Base @ ${taxRate} % `}</td>
							<td>{formatMoney(taxBase)}</td>
						</tr>
						<tr>
							<td></td>
							<td>Tax Amount</td>
							<td>{formatMoney(taxAmount)}</td>
						</tr>
						<tr>
							<td></td>
							<td>Expenses</td>
							<td>{formatMoney(expenses)}</td>
						</tr>
					</>
				) : (
					<tr className="border-2 pl-2 font-bold">
						<td></td>
						<td>TOTAL INVOICE</td>
						<td>{formatMoney(lineAmount, currency)}</td>
					</tr>
				)}
			</tfoot>
		</table>
	)
}
