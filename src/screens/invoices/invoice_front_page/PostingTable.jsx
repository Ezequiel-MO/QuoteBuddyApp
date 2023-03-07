import { formatMoney } from '../../../helper'
import { useCurrentInvoice } from '../../../hooks'

export const PostingTable = ({ handleChange }) => {
	const { currentInvoice, changeCurrency } = useCurrentInvoice()
	const {
		currency,
		lineDate,
		lineText,
		lineAmount,
		taxBreakdown,
		taxRate,
		expenses
	} = currentInvoice

	return (
		<table className="ml-10 text-black-50 w-[700px] border max-h-[500px] table-fixed z-50">
			<tbody>
				<tr>
					<td className="border border-r-1 pl-2 w-[120px]">
						{' '}
						<input
							type="date"
							name="lineDate"
							className="date-input ml-2 font-normal cursor-pointer w-[100px]"
							value={lineDate}
							onChange={handleChange}
						/>
					</td>
					<td className="border border-r-1 pl-2">
						<textarea
							type="text"
							name="lineText"
							className="date-input ml-2 font-normal cursor-pointer w-11/12"
							value={lineText}
							onChange={handleChange}
						/>
					</td>

					<td className="border border-r-1 pl-2 w-[120px]">
						<div className="flex items-center">
							<select
								id="currencyUnit"
								name="currencyUnit"
								value={currency}
								onChange={(e) => changeCurrency(e.target.value)}
								className="cursor-pointer"
							>
								<option value="EUR">EUR</option>
								<option value="USD">USD</option>
							</select>
							<span>
								<input
									type="number"
									name="lineAmount"
									className="date-input ml-2 font-normal cursor-pointer w-[70px]"
									value={lineAmount}
									onChange={handleChange}
								/>
							</span>
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
							<td>
								{formatMoney((lineAmount - expenses) / (1 + taxRate / 100))}
							</td>
						</tr>
						<tr>
							<td></td>
							<td>Tax Amount</td>
							<td>
								{formatMoney(
									(((lineAmount - expenses) / (1 + taxRate / 100)) * taxRate) /
										100
								)}
							</td>
						</tr>
						<tr>
							<td></td>
							<td>Expenses</td>
							<td>
								<span>€</span>
								<input
									type="number"
									name="expenses"
									className="date-input ml-2 font-normal cursor-pointer w-[70px]"
									value={expenses}
									onChange={handleChange}
								/>
							</td>
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
