/**
 * @file InputHotelTable.tsx
 * @description An inline editable number input component used within table cells,
 * specifically for editing hotel price details in TableModalHotel.
 */
import { EditableHotelPriceFieldKey } from '@interfaces/hotel'
import React, { useEffect, useRef } from 'react'

/**
 * @interface InputHotelTableProps
 * @description Defines the props for the InputHotelTable component.
 * @param {React.CSSProperties} [style] - Optional inline styles for the input element.
 * @param {EditableHotelPriceFieldKey} type - The key of the hotel price field this input represents (used as the input's 'name').
 * @param {number} data - The current numerical value for the input field.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} handleChange - Callback function invoked when the input value changes.
 * @param {(isEditingThisCell: boolean, fieldType: EditableHotelPriceFieldKey) => void} handleEdit - Callback function invoked when editing is considered finished for this input (e.g., on blur), used to notify the parent.
 * @param {boolean} editMode - Indicates if this input field is currently in active edit mode.
 */
export interface InputHotelTableProps {
	style?: React.CSSProperties
	type: EditableHotelPriceFieldKey
	data: number
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	handleEdit: (
		isEditingThisCell: boolean,
		fieldType: EditableHotelPriceFieldKey
	) => void
	editMode: boolean
}

export const InputHotelTable: React.FC<InputHotelTableProps> = ({
	style,
	type,
	data,
	handleChange,
	handleEdit,
	editMode
}) => {
	const inputRef = useRef<HTMLInputElement>(null)
	/**
	 * @effect useEffect
	 * @description Focuses the input and selects its content when it enters edit mode.
	 * Dependencies: `editMode`.
	 */
	useEffect(() => {
		if (editMode && inputRef.current) {
			inputRef.current.focus()
			inputRef.current.select() // Selects the text in the input for easy replacement
		}
	}, [editMode])

	/**
	 * @function handleBlur
	 * @description When the input loses focus, it calls the `handleEdit` prop,
	 * signaling to the parent component that editing for this cell is complete.
	 * It passes `true` for `isEditingThisCell` because this function is only
	 * relevant if the input was indeed in edit mode.
	 */

	const handleBlur = () => {
		// `editMode` (the prop) confirms this instance was the one intended to be active.
		// Call parent's handler to signal that this specific cell (identified by `type`) is done editing.
		handleEdit(true, type)
	}

	/**
	 * @function handleKeyDown
	 * @description Handles key presses within the input. If 'Enter' or 'Escape' is pressed,
	 * it triggers the blur event, effectively finishing the edit.
	 * @param {React.KeyboardEvent<HTMLInputElement>} event - The keyboard event.
	 */
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' || event.key === 'Escape') {
			inputRef.current?.blur() // Trigger blur to finish editing
		}
	}

	return (
		<div className="w-full h-full">
			{' '}
			{/* Wrapper to help input fill the table cell */}
			<input
				ref={inputRef}
				style={style || { width: '100%', boxSizing: 'border-box' }} // Default to 100% width if no style passed
				className="cursor-pointer p-1 border border-blue-500 rounded-md text-right dark:bg-slate-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400" // Added more Tailwind classes for better focus and dark mode
				type="number"
				name={type}
				value={data} // `data` is already a number. HTML input type="number" handles this.
				onChange={handleChange}
				onBlur={handleBlur}
				onKeyDown={handleKeyDown}
				// `autoFocus` prop is handled by the useEffect focusing logic now for better control.
			/>
		</div>
	)
}
