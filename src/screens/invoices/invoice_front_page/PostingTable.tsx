import { formatMoney } from '../../../helper'
import { useInvoice } from '../context/InvoiceContext'

export const PostingTable = () => {
	const { state, handleChange } = useInvoice()
	const invoice = state.currentInvoice

	if (!invoice) {
		return (
			<div className="text-center text-red-500">
				No invoice data available. Please load an invoice.
			</div>
		)
	}

	const {
		currency,
		lineDate,
		lineText,
		lineAmount,
		taxBreakdown,
		expenses,
		taxBase10,
		taxBase21
	} = invoice

	return (
		<div className="mt-4 flex justify-center">
			<div className="w-full max-w-3xl">
				<div className="overflow-x-auto">
					<table className="w-full text-left text-sm text-black-50">
						<thead className="bg-white-0 text-black-50">
							<tr>
								<th className="px-4 py-2 w-1/6">Date</th>
								<th className="px-4 py-2 w-2/3">Description</th>
								<th className="px-4 py-2 w-1/6">Amount ({currency})</th>
							</tr>
						</thead>
						<tbody className="bg-white-0">
							<tr>
								{/* Date Input */}
								<td className="border-t border-gray-300 px-4 py-2">
									<input
										type="date"
										name="lineDate"
										className="w-full bg-white-0 border border-gray-300 rounded px-2 py-1 text-black-50 text-center focus:outline-none focus:ring-2 focus:ring-orange-50"
										value={lineDate}
										onChange={handleChange}
									/>
								</td>
								{/* Description Input */}
								<td className="border-t border-gray-300 px-4 py-2">
									<textarea
										name="lineText"
										className="w-full bg-white-0 border border-gray-300 rounded px-2 py-1 text-black-50 resize-none focus:outline-none focus:ring-2 focus:ring-orange-50"
										value={lineText}
										onChange={handleChange}
										rows={3}
									/>
								</td>
								{/* Amount Input */}
								<td className="border-t border-gray-300 px-4 py-2">
									<div className="flex items-center">
										<select
											id="currencyUnit"
											name="currency"
											value={currency}
											onChange={handleChange}
											className="bg-white-0 border border-gray-300 rounded px-2 py-1 text-black-50 focus:outline-none focus:ring-2 focus:ring-orange-50 w-16"
										>
											<option value="EUR">EUR</option>
											<option value="USD">USD</option>
											<option value="GBP">GBP</option>
										</select>
										<input
											type="number"
											name="lineAmount"
											className="ml-2 flex-1 bg-white-0 border border-gray-300 rounded px-2 py-1 text-black-50 text-right focus:outline-none focus:ring-2 focus:ring-orange-50"
											value={lineAmount}
											onChange={handleChange}
										/>
									</div>
								</td>
							</tr>
						</tbody>
						<tfoot className="bg-white-0">
							{taxBreakdown && currency === 'EUR' ? (
								<>
									<tr>
										<td className="border-t border-gray-300 px-4 py-2"></td>
										<td className="border-t border-gray-300 px-4 py-2">
											<label className="block text-black-50">
												BI IVA @ 21%
												<input
													type="number"
													name="taxBase21"
													placeholder="Tax Base @ 21%"
													value={taxBase21 || ''}
													onChange={handleChange}
													className="w-full mt-1 bg-white-0 border border-gray-300 rounded px-2 py-1 text-black-50 text-right focus:outline-none focus:ring-2 focus:ring-orange-50"
												/>
											</label>
										</td>
										<td className="border-t border-gray-300 px-4 py-2 text-right">
											{formatMoney((taxBase21 || 0) * 0.21)}
										</td>
									</tr>
									<tr>
										<td className="border-t border-gray-300 px-4 py-2"></td>
										<td className="border-t border-gray-300 px-4 py-2">
											<label className="block text-black-50">
												BI IVA @ 10%
												<input
													type="number"
													name="taxBase10"
													placeholder="Tax Base @ 10%"
													value={taxBase10 || ''}
													onChange={handleChange}
													className="w-full mt-1 bg-white-0 border border-gray-300 rounded px-2 py-1 text-black-50 text-right focus:outline-none focus:ring-2 focus:ring-orange-50"
												/>
											</label>
										</td>
										<td className="border-t border-gray-300 px-4 py-2 text-right">
											{formatMoney((taxBase10 || 0) * 0.1)}
										</td>
									</tr>
									<tr>
										<td className="border-t border-gray-300 px-4 py-2"></td>
										<td className="border-t border-gray-300 px-4 py-2">
											<label className="block text-black-50">
												Expenses
												<input
													type="number"
													name="expenses"
													placeholder="Expenses"
													value={expenses || ''}
													onChange={handleChange}
													className="w-full mt-1 bg-white-0 border border-gray-300 rounded px-2 py-1 text-black-50 text-right focus:outline-none focus:ring-2 focus:ring-orange-50"
												/>
											</label>
										</td>
										<td className="border-t border-gray-300 px-4 py-2 text-right">
											{formatMoney(expenses || 0)}
										</td>
									</tr>
								</>
							) : (
								<tr>
									<td className="border-t border-gray-300 px-4 py-2"></td>
									<td className="border-t border-gray-300 px-4 py-2 font-bold text-black-50">
										TOTAL INVOICE
									</td>
									<td className="border-t border-gray-300 px-4 py-2 font-bold text-black-50 text-right">
										{formatMoney(lineAmount || 0, currency)}
									</td>
								</tr>
							)}
						</tfoot>
					</table>
				</div>
			</div>
		</div>
	)
}
