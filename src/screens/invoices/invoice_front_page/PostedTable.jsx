import accounting from 'accounting'
import { useGetInvoice } from '../../../hooks'

export const PostedTable = ({ invoiceNumber }) => {
	const { invoice, isLoading } = useGetInvoice(invoiceNumber)

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<table className="ml-10 text-black-50 w-[700px] border max-h-[500px] table-fixed z-50">
			<tbody>
				<tr>
					<td className="border border-r-1 pl-2 w-[120px]">
						{invoice?.lineDate}
					</td>
					<td className="border border-r-1 pl-2">{invoice?.lineText}</td>
					<td className="border border-r-1 pl-2 w-[120px]">
						<div className="flex items-center">
							{`${accounting.formatMoney(
								invoice?.lineAmount,
								`${invoice?.currency}    `
							)}`}
						</div>
					</td>
				</tr>
			</tbody>
			<tfoot>
				{invoice?.taxBreakdown && invoice?.currency === 'EUR' ? (
					<>
						<tr>
							<td></td>
							<td>{`Tax Base @ ${invoice?.taxRate} % `}</td>
							<td>
								{accounting.formatMoney(
									(invoice?.lineAmount - invoice?.expenses) /
										(1 + invoice?.taxRate / 100),
									'€',
									2,
									'.',
									','
								)}
							</td>
						</tr>
						<tr>
							<td></td>
							<td>Tax Amount</td>
							<td>
								{accounting.formatMoney(
									(((invoice?.lineAmount - invoice?.expenses) /
										(1 + invoice?.taxRate / 100)) *
										invoice?.taxRate) /
										100,
									'€',
									2,
									'.',
									','
								)}
							</td>
						</tr>
						<tr>
							<td></td>
							<td>Expenses</td>
							<td>
								{accounting.formatMoney(invoice?.expenses, '€', 2, '.', ',')}
							</td>
						</tr>
					</>
				) : (
					<tr className="border-2 pl-2 font-bold">
						<td></td>
						<td>TOTAL INVOICE</td>
						<td>{`${accounting.formatMoney(
							invoice?.lineAmount,
							`${invoice?.currency}    `
						)}`}</td>
					</tr>
				)}
			</tfoot>
		</table>
	)
}
