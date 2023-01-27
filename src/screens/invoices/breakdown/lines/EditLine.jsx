import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useCurrentInvoice } from '../../../../hooks'
export const EditLine = ({ line, setIsEditing }) => {
	const [lineState, setLineState] = useState(line)
	const { currentInvoice, updateBreakdownLine, deleteBreakdownLine } =
		useCurrentInvoice()

	const handleChange = (e) => {
		const { name, value } = e.target
		setLineState({ ...lineState, [name]: value })
	}

	const handleClick = () => {
		updateBreakdownLine(lineState.id, lineState)
		setIsEditing(false)
	}
	return (
		<div
			className="flex items-center justify-between relative"
			onDoubleClick={handleClick}
		>
			<div className="border border-r-1 p-2 flex flex-col items-start">
				<input
					type="date"
					onChange={handleChange}
					name="date"
					value={lineState.date}
					className="flex items-center overflow-hidden"
				/>
				<button
					type="button"
					onClick={() => deleteBreakdownLine(lineState.id)}
					className="absolute right-0"
				>
					<Icon icon="ant-design:delete-outlined" width={26} color="#ea5933" />
				</button>
			</div>
			<div className="border-r-1 pl-2 text-wrap flex-1">
				<input
					type="textarea"
					name="text"
					className="p-2 font-normal cursor-pointer w-full text-center align-middle"
					onChange={handleChange}
					value={lineState.text}
				/>
			</div>
			<div className="border-r-1 pl-2">
				<div className="flex items-center">
					<span>{currentInvoice.currency}</span>
					<input
						type="number"
						className="w-[100px]"
						name="amount"
						value={lineState.amount}
						onChange={handleChange}
					/>
				</div>
			</div>
		</div>
	)
}
