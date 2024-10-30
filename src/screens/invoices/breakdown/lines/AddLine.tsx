import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useInvoice } from '@screens/invoices/context/InvoiceContext'

interface LineState {
	date: string
	text: string
	amount: string
}

export const AddLine = () => {
	const { state, dispatch } = useInvoice()
	const [lineState, setLineState] = useState<LineState>({
		date: '',
		text: '',
		amount: ''
	})
	const [errors, setErrors] = useState<Partial<LineState>>({})

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLineState({
			...lineState,
			date: e.target.value
		})
		if (e.target.value) {
			setErrors({
				...errors,
				date: undefined
			})
		}
	}

	const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setLineState({ ...lineState, text: e.target.value })
		if (e.target.value) {
			setErrors({ ...errors, text: undefined })
		}
	}

	const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLineState({ ...lineState, amount: e.target.value })
		if (e.target.value) {
			setErrors({ ...errors, amount: undefined })
		}
	}

	const validateInputs = (): boolean => {
		const newErrors: Partial<LineState> = {}
		if (!lineState.date) {
			newErrors.date = 'Date is required'
		}
		if (!lineState.text) {
			newErrors.text = 'Description is required'
		}
		if (!lineState.amount) {
			newErrors.amount = 'Amount is required'
		} else if (isNaN(parseFloat(lineState.amount))) {
			newErrors.amount = 'Amount must be a number'
		}
		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	const handleClick = () => {
		if (!validateInputs()) {
			return
		}
		const newLine = {
			id: uuidv4(),
			date: lineState.date,
			text: lineState.text,
			amount: parseFloat(lineState.amount)
		}

		dispatch({
			type: 'ADD_BREAKDOWN_LINE',
			payload: { newLine }
		})

		setLineState({
			date: '',
			text: '',
			amount: ''
		})
		setErrors({})
	}

	return (
		<div className="bg-white shadow rounded-lg p-6 mb-4">
			{/* Adjusted Grid Layout */}
			<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
				{/* Date Input */}
				<div className="flex flex-col md:col-span-2">
					<label htmlFor="date" className="text-gray-700 font-medium mb-1">
						Date
					</label>
					<input
						type="date"
						name="date"
						value={lineState.date}
						className={`border ${
							errors.date ? 'border-red-500' : 'border-gray-300'
						} rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
						onChange={handleDateChange}
					/>
					{errors.date && (
						<span className="text-red-500 text-sm mt-1">{errors.date}</span>
					)}
				</div>

				{/* Amount Input */}
				<div className="flex flex-col md:col-span-2">
					<label htmlFor="amount" className="text-gray-700 font-medium mb-1">
						Amount ({state.currentInvoice?.currency})
					</label>
					<input
						type="number"
						name="amount"
						value={lineState.amount}
						className={`border ${
							errors.amount ? 'border-red-500' : 'border-gray-300'
						} rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
						onChange={handleAmountChange}
					/>
					{errors.amount && (
						<span className="text-red-500 text-sm mt-1">{errors.amount}</span>
					)}
				</div>

				{/* Description Input - Spanning All Columns */}
				<div className="flex flex-col md:col-span-4">
					<label htmlFor="text" className="text-gray-700 font-medium mb-1">
						Description
					</label>
					<textarea
						name="text"
						value={lineState.text}
						className={`border ${
							errors.text ? 'border-red-500' : 'border-gray-300'
						} rounded px-3 py-2 resize-none w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
						rows={3}
						onChange={handleTextChange}
					/>
					{errors.text && (
						<span className="text-red-500 text-sm mt-1">{errors.text}</span>
					)}
				</div>
			</div>

			{/* Add Line Button */}
			<div className="flex justify-end mt-6">
				<button
					onClick={handleClick}
					className="bg-blue-600 hover:bg-blue-700 text-white-0 font-semibold px-6 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
				>
					Add Line
				</button>
			</div>
		</div>
	)
}
