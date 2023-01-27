import { useState } from 'react'
import uuid from 'react-uuid'
import { useCurrentInvoice } from '../../../../hooks'

export const AddLine = () => {
	const { addBreakdownLine, currentInvoice } = useCurrentInvoice()
	const [lineState, setLineState] = useState({
		date: '',
		text: '',
		amount: 0
	})

	const handleLineChange = (e) => {
		const { name, value } = e.target
		setLineState({ ...lineState, [name]: value })
	}

	const handleClick = () => {
		const newLine = {
			id: uuid(),
			date: lineState.date,
			text: lineState.text,
			amount: Number(lineState.amount)
		}
		addBreakdownLine(newLine)
		setLineState({
			date: '',
			text: '',
			amount: 0
		})
	}

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
					onClick={handleClick}
					className="bg-gray-50 hover:bg-orange-50 text-white-100 font-bold ml-2 mb-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
					<span>{currentInvoice.currency}</span>
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
