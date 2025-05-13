/**
 * @file TableModalHotel.tsx
 * @description Component to display and edit hotel price details in a table within a modal.
 * This component is refactored from TableModalHotel.jsx to TypeScript, utilizing
 * existing interfaces from the `src/interfaces` directory for improved type safety
 * and code clarity.
 */

import React, { useState, useEffect } from 'react'
import { TableHeaders } from '../../../../../ui' // Assuming this is correctly typed or will be
import { InputHotelTable } from './InputHotelTable' // Assuming this will be refactored to .tsx

// Assuming IHotel and IHotelPrice are defined in src/interfaces/hotel.ts
// and re-exported from src/interfaces/index.ts
import {
	EditableHotelPriceFieldKey,
	IHotel,
	IHotelPrice
} from '../../../../../interfaces'

export interface HotelPriceFormData
	extends Required<Pick<IHotelPrice, EditableHotelPriceFieldKey>> {
	_id?: string // _id is optional as it might not exist for a new price entry initially
}

/**
 * @interface HotelPriceCheckedState
 * @description Defines the shape of the state object that tracks which fields have been modified.
 */
export type HotelPriceCheckedState = Record<EditableHotelPriceFieldKey, boolean>

/**
 * @interface TableModalHotelProps
 * @description Props for the TableModalHotel component.
 * @param {IHotel | null | undefined} hotel - The hotel data object. Can be null or undefined if not yet loaded.
 * @param {HotelPriceFormData} data - The current state of the hotel price form data.
 * @param {React.Dispatch<React.SetStateAction<HotelPriceFormData>>} setData - Setter function for the form data.
 * @param {HotelPriceCheckedState} isChecked - State object indicating which fields have been modified.
 * @param {React.Dispatch<React.SetStateAction<HotelPriceCheckedState>>} setIsChecked - Setter function for the isChecked state.
 */
export interface TableModalHotelProps {
	hotel?: IHotel | null
	data: HotelPriceFormData
	setData: React.Dispatch<React.SetStateAction<HotelPriceFormData>>
	isChecked: HotelPriceCheckedState
	setIsChecked: React.Dispatch<React.SetStateAction<HotelPriceCheckedState>>
}

/**
 * @interface InputHotelTableProps
 * @description Props for the child InputHotelTable component.
 * This interface should be moved to InputHotelTable.tsx when it's refactored.
 * @param {React.CSSProperties} [style] - Optional inline styles.
 * @param {number} data - The current numerical value of the input field.
 * @param {EditableHotelPriceFieldKey} type - The key of the hotel price field being edited.
 * @param {(event: React.ChangeEvent<HTMLInputElement>) => void} handleChange - Handler for input value changes.
 * @param {(isEditing: boolean, fieldType: EditableHotelPriceFieldKey) => void} handleEdit - Handler to toggle the edit state of a cell.
 * @param {boolean} editMode - Indicates if the input field is currently in edit mode.
 */
export interface InputHotelTableProps {
	style?: React.CSSProperties
	data: number
	type: EditableHotelPriceFieldKey
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	handleEdit: (
		isEditing: boolean,
		fieldType: EditableHotelPriceFieldKey
	) => void
	editMode: boolean
}

// Default state values for initialization
const defaultHotelPriceFormData: HotelPriceFormData = {
	_id: undefined, // Or an empty string if preferred: ''
	DUInr: 0,
	DUIprice: 0,
	DoubleRoomNr: 0,
	DoubleRoomPrice: 0,
	breakfast: 0,
	DailyTax: 0
}

const defaultHotelPriceCheckedState: HotelPriceCheckedState = {
	DUInr: false,
	DUIprice: false,
	DoubleRoomNr: false,
	DoubleRoomPrice: false,
	breakfast: false,
	DailyTax: false
}

/**
 * @constant tableCellConfiguration
 * @description Configuration for rendering table cells, making the JSX more maintainable.
 * Each object defines the key from `EditableHotelPriceFieldKey` and a display width.
 */
const tableCellConfiguration: {
	key: EditableHotelPriceFieldKey
	width: string
	label: string
}[] = [
	{ key: 'DUInr', width: '70px', label: 'DUI Nr' },
	{ key: 'DUIprice', width: '80px', label: 'DUI Price' },
	{ key: 'DoubleRoomNr', width: '100px', label: 'DBL Nr' },
	{ key: 'DoubleRoomPrice', width: '100px', label: 'DBL Price' },
	{ key: 'breakfast', width: '90px', label: 'Breakfast' },
	{ key: 'DailyTax', width: '90px', label: 'Daily Tax' }
]

export const TableModalHotel: React.FC<TableModalHotelProps> = ({
	hotel,
	data,
	setData,
	isChecked,
	setIsChecked
}) => {
	/**
	 * @effect useEffect
	 * @description Initializes or updates the form data (`data`) and modification checks (`isChecked`)
	 * when the `hotel` prop changes. If the hotel has price information, it uses the first
	 * price entry; otherwise, it defaults to empty/zero values.
	 * Dependencies: `hotel`, `setData`, `setIsChecked`.
	 */
	useEffect(() => {
		if (hotel && hotel.price && hotel.price.length > 0) {
			const hotelPriceInfo = hotel.price[0]
			setData({
				_id: hotelPriceInfo._id || defaultHotelPriceFormData._id,
				DUInr: hotelPriceInfo.DUInr ?? defaultHotelPriceFormData.DUInr,
				DUIprice: hotelPriceInfo.DUIprice ?? defaultHotelPriceFormData.DUIprice,
				DoubleRoomNr:
					hotelPriceInfo.DoubleRoomNr ?? defaultHotelPriceFormData.DoubleRoomNr,
				DoubleRoomPrice:
					hotelPriceInfo.DoubleRoomPrice ??
					defaultHotelPriceFormData.DoubleRoomPrice,
				breakfast:
					hotelPriceInfo.breakfast ?? defaultHotelPriceFormData.breakfast,
				DailyTax: hotelPriceInfo.DailyTax ?? defaultHotelPriceFormData.DailyTax
			})
			// Reset isChecked to all false when hotel data changes
			setIsChecked({ ...defaultHotelPriceCheckedState })
		} else {
			// If no hotel or price info, set to default
			setData(defaultHotelPriceFormData)
			setIsChecked({ ...defaultHotelPriceCheckedState })
		}
	}, [hotel, setData, setIsChecked])

	// State to manage which cell (by its key) is currently in edit mode.
	// `null` means no cell is being edited.
	const [editingCellKey, setEditingCellKey] =
		useState<EditableHotelPriceFieldKey | null>(null)

	/**
	 * @function handleCellDoubleClick
	 * @description Toggles the edit mode for a specific cell when it's double-clicked.
	 * If the clicked cell is already being edited, it exits edit mode for that cell.
	 * Otherwise, it sets the clicked cell as the one being edited.
	 * @param {EditableHotelPriceFieldKey} fieldKey - The key of the field corresponding to the cell.
	 */
	const handleCellDoubleClick = (fieldKey: EditableHotelPriceFieldKey) => {
		setEditingCellKey((prevKey) => (prevKey === fieldKey ? null : fieldKey))
	}

	/**
	 * @function handleChange
	 * @description Handles changes in the input fields when a cell is in edit mode.
	 * Updates the corresponding field in the `data` state and sets its `isChecked` flag to true
	 * if the new value differs from the original value in the `hotel` prop.
	 * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event.
	 */
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		const fieldName = name as EditableHotelPriceFieldKey // Type assertion

		// Attempt to parse the value as a float. If it's an empty string or invalid,
		// default to 0 or the previous valid number for that field.
		const numericValue = value.trim() === '' ? 0 : parseFloat(value)
		const finalValue = isNaN(numericValue) ? data[fieldName] || 0 : numericValue

		setData((prevData) => ({
			...prevData,
			[fieldName]: finalValue
		}))

		// Check if the value has changed from the original hotel price
		const originalHotelPriceItem = hotel?.price?.[0]
		let originalValue: number | undefined

		if (originalHotelPriceItem && fieldName in originalHotelPriceItem) {
			originalValue = originalHotelPriceItem[fieldName as keyof IHotelPrice] as
				| number
				| undefined
		}

		const hasChanged =
			originalValue !== undefined ? originalValue !== finalValue : true

		setIsChecked((prevIsChecked) => ({
			...prevIsChecked,
			[fieldName]: hasChanged
		}))
	}

	/**
	 * @function handleInputHotelTableEdit
	 * @description Called by the InputHotelTable component, typically on blur or Enter key press,
	 * to signal that editing for that cell should be finished.
	 * This function then exits edit mode for that cell.
	 * @param {boolean} _isEditing - Provided by InputHotelTable (indicates it was in edit mode).
	 * @param {EditableHotelPriceFieldKey} fieldType - The key of the field that was being edited.
	 */
	const handleInputHotelTableEdit = (
		_isEditing: boolean,
		fieldType: EditableHotelPriceFieldKey
	) => {
		if (editingCellKey === fieldType) {
			// Ensure we only exit if this cell was indeed the one being edited
			setEditingCellKey(null) // Exit edit mode for this cell
		}
	}

	return (
		<div className="overflow-x-auto">
			{' '}
			{/* Added for responsiveness on small screens */}
			<table className="table-auto w-full border-collapse border-2 border-orange-500 text-gray-700 dark:text-gray-300">
				<TableHeaders headers="hotelModal" />
				<tbody>
					<tr>
						{tableCellConfiguration.map(({ key: field, label }) => {
							const isCellEditing = editingCellKey === field
							const cellValue = data[field]

							return (
								<td
									key={field}
									className="cursor-pointer text-center p-2 border border-orange-300 dark:border-orange-700 relative min-w-[80px]" // Added min-width
									onDoubleClick={() => handleCellDoubleClick(field)}
									title={`Double click to edit ${label}`} // Accessibility improvement
								>
									{
										isCellEditing ? (
											<InputHotelTable
												style={{ width: '100%', textAlign: 'right' }} // Ensure input fills cell, text-align for numbers
												data={cellValue}
												type={field}
												handleChange={handleChange}
												handleEdit={handleInputHotelTableEdit} // Pass the new handler
												editMode={isCellEditing} // True if this cell is the one being edited
											/>
										) : // Display currency for price fields, simple number for 'Nr' (number) fields
										field.toLowerCase().includes('price') ||
										  field.toLowerCase().includes('tax') ||
										  field.toLowerCase().includes('breakfast') ? (
											cellValue !== undefined && cellValue !== null
												? cellValue.toLocaleString(undefined, {
														style: 'currency',
														currency: 'EUR',
														minimumFractionDigits: 2,
														maximumFractionDigits: 2
												  })
												: '€0.00'
										) : (
											cellValue !== undefined && cellValue !== null
												? cellValue.toLocaleString()
												: '0'
										) // Default number formatting for counts
									}
								</td>
							)
						})}
					</tr>
				</tbody>
			</table>
		</div>
	)
}
