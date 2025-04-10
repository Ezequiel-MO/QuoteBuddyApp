import { useEffect, ChangeEvent, KeyboardEvent, useCallback, memo } from 'react'
import { IGift } from '@interfaces/gift'

interface FormData {
	qty: number
	price: number
	[key: string]: any
}

interface InputGiftQtyProps {
	gift: IGift
	data: FormData
	setData: (data: FormData) => void
	handleChange: (event: ChangeEvent<HTMLInputElement>) => void
	handleEdit: (
		index: number,
		type: string,
		activate: boolean,
		indexGift: number
	) => void
	index: number
	type: 'qty' | 'price'
	activate: boolean
}

const InputGiftQty: React.FC<InputGiftQtyProps> = ({
	gift,
	data,
	setData,
	handleChange,
	handleEdit,
	index,
	type,
	activate
}) => {
	// Initialize data when gift changes
	useEffect(() => {
		setData({
			...data,
			qty: gift.qty || 1,
			price: gift.price
		})
	}, [gift, index, setData])

	// Handle Enter key press
	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			if (event.key === 'Enter') {
				handleEdit(-1, type, activate, index)
			}
		},
		[handleEdit, type, activate, index]
	)

	// Handle blur event
	const handleBlur = useCallback(() => {
		handleEdit(-1, type, activate, index)
	}, [handleEdit, type, activate, index])

	const labelId = `${type}-label-${index}`
	const inputId = `${type}-input-${index}`

	return (
		<div className="flex items-center space-x-2">
			<label
				id={labelId}
				htmlFor={inputId}
				className="font-medium text-gray-200"
			>
				{type.charAt(0).toUpperCase() + type.slice(1)}:
			</label>
			<input
				id={inputId}
				aria-labelledby={labelId}
				key={index}
				type="number"
				className="bg-gray-700 text-white border border-gray-600 rounded-md py-1 px-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors duration-200"
				style={{ width: '80px' }}
				name={type}
				value={data[type]}
				onChange={handleChange}
				onBlur={handleBlur}
				onKeyDown={handleKeyDown}
				autoFocus
				min={type === 'qty' ? 1 : 0}
				step={type === 'qty' ? 1 : 0.01}
				aria-label={`Edit ${type}`}
			/>
		</div>
	)
}

// Memoize the component to prevent unnecessary re-renders
export default memo(InputGiftQty)

// Export the non-memoized version as well for compatibility with existing code
export { InputGiftQty }
