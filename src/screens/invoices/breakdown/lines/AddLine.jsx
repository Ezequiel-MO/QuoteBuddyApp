import { useCurrentInvoice } from '../../../../hooks'

export const AddLine = ({ lineState, handleLineChange }) => {
	const { currentInvoice } = useCurrentInvoice()
	const { currency } = currentInvoice
	return (
		<tr className="border-2 border-orange-50" id="lines_breakdown_form">
			<td className="border border-r-1 pl-2 w-[130px] ">
				{' '}
				<input
					type="date"
					name="date"
					value={lineState.date}
					className="ml-2 font-normal cursor-pointer w-[100px]"
					onChange={handleLineChange}
				/>
				<button
					className="bg-gray-50 hover:bg-orange-50 text-white-100 font-bold ml-2 mb-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="submit"
				>
					Add Line
				</button>
			</td>
			<td className="border-r-1 pl-2 text-wrap">
				<textarea
					name="text"
					value={lineState.text}
					className="p-2 font-normal cursor-pointer w-full text-center align-middle"
					onChange={handleLineChange}
				/>
			</td>
			<td className="border-r-1 pl-2 w-[120px]">
				<div className="flex items-center">
					<span>{currency}</span>
					<span>
						<input
							type="number"
							name="amount"
							value={lineState.amount}
							className="ml-2 font-normal cursor-pointer w-[70px]"
							onChange={handleLineChange}
						/>
					</span>
				</div>
			</td>
		</tr>
	)
}
