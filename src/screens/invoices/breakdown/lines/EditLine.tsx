import { useState, ChangeEvent, MouseEvent } from 'react'
import { Icon } from '@iconify/react'
import { IInvoiceBreakdownLine } from '@interfaces/invoice'
import { useInvoice } from '@screens/invoices/context/InvoiceContext'

interface EditLineProps {
	line: IInvoiceBreakdownLine
	setIsEditing: (isEditing: boolean) => void
}

export const EditLine = ({ line, setIsEditing }: EditLineProps) => {
	const [lineState, setLineState] = useState<IInvoiceBreakdownLine>(line)

	const { state, dispatch } = useInvoice()

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setLineState({ ...lineState, [name]: value })
	}

	const handleUpdateBreakdownLine = () => {
		dispatch({
			type: 'UPDATE_BREAKDOWN_LINE',
			payload: {
				lineId: lineState.id ?? '',
				newLine: { ...lineState }
			}
		})
		setIsEditing(false)
	}

	const handleDeleteBreakdownLine = (id: string) => {
		dispatch({
			type: 'DELETE_BREAKDOWN_LINE',
			payload: { lineId: id }
		})
	}

	return (
		<div
			className="flex items-center justify-between relative"
			onDoubleClick={handleUpdateBreakdownLine}
			onBlur={handleUpdateBreakdownLine}
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
					onClick={() => handleDeleteBreakdownLine(lineState.id ?? '')}
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
					<span>{state.currentInvoice?.currency}</span>
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
