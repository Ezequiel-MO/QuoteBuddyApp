import { ChangeEvent, useState } from 'react'
import { formatMoney } from '../../../helper'
import { useCurrentInvoice } from '../../../hooks'

interface Props {
	handleChange: (
		event: ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => void
}

export const PostingTable = ({ handleChange }: Props) => {
	const { currentInvoice, changeCurrency } = useCurrentInvoice()
	const {
		currency,
		lineDate,
		lineText,
		lineAmount,
		taxBreakdown,
		expenses,
		taxBase10,
		taxBase21
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
							<td>
								{`BI IVA  @ 21% `}{' '}
								<span>
									<input
										type="number"
										name="taxBase21"
										placeholder="Tax Base @ 21%"
										value={taxBase21}
										onChange={handleChange}
										className="date-input ml-2 font-normal cursor-pointer w-[120px] "
									/>
								</span>
							</td>
							<td>{formatMoney(taxBase21 * 0.21)}</td>
						</tr>
						<tr>
							<td></td>
							<td>
								{`BI IVA @ 10%`}
								<span>
									<input
										type="number"
										name="taxBase10"
										placeholder="Tax Base @ 10%"
										value={taxBase10}
										onChange={handleChange}
										className="date-input ml-2 font-normal cursor-pointer w-[120px] "
									/>
								</span>
							</td>
							<td>{formatMoney(taxBase10 * 0.1)}</td>
						</tr>
						<tr>
							<td></td>
							<td>
								{`Expenses`}
								<span>
									<input
										type="number"
										name="expenses"
										placeholder="Expenses"
										value={expenses}
										onChange={handleChange}
										className="date-input ml-2 font-normal cursor-pointer w-[120px] "
									/>
								</span>
							</td>
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
