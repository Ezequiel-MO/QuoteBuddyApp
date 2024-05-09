import { useState, ChangeEvent } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useInvoice } from '@screens/invoices/context/InvoiceContext'

interface LineState {
	date: string
	text: string
	amount: number
}

interface NewLine {
	id: string
	date: string
	text: string
	amount: number
}

export const AddLine = () => {
	const { state, dispatch } = useInvoice()
	const [lineState, setLineState] = useState<LineState>({
		date: '',
		text: '',
		amount: 0
	})

	const handleLineChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setLineState({
			...lineState,
			[name]: name === 'amount' ? parseFloat(value) : value
		})
	}

	const handleClick = () => {
		const newLine: NewLine = {
			id: uuidv4(),
			...lineState
		}
		dispatch({
			type: 'ADD_BREAKDOWN_LINE',
			payload: { newLine }
		})
		setLineState({
			date: '',
			text: '',
			amount: 0
		})
	}

	return (
		<div className="border-2 border-orange-50 flex flex-row items-center justify-between">
			<div className="border border-r-1 p-2 flex flex-col items-start">
				<input
					type="date"
					name="date"
					value={lineState.date}
					className="font-normal cursor-pointer w-[110px] mb-4"
					onChange={handleLineChange}
				/>
				<button
					onClick={handleClick}
					className="bg-gray-50 hover:bg-orange-50 text-white-100 font-bold ml-2 mb-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				>
					Add Line
				</button>
			</div>
			<div className="border-r-1 pl-2 text-wrap flex-1">
				<textarea
					name="text"
					value={lineState.text}
					className="p-2 font-normal cursor-pointer w-full text-center align-middle"
					onChange={handleLineChange}
				/>
			</div>
			<div className="border-r-1 pl-2 w-[120px]">
				<div className="flex items-center">
					<span>{state.currentInvoice?.currency}</span>
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
			</div>
		</div>
	)
}
