import React, { FC } from 'react'
import accounting from 'accounting'
import { Icon } from '@iconify/react'
import { useEditableCell } from '../../../hooks/useEditableCell'

interface EditableCellVenueProps {
	value: number
	onSave: (newValue: number) => void
	typeValue: 'unit' | 'price'
}

export const EditableCellVenue: FC<EditableCellVenueProps> = ({
	value,
	onSave,
	typeValue
}) => {
	const {
		isEditing,
		localValue,
		inputRef,
		isEditable,
		handleBlur,
		handleChange,
		handleKeyDown,
		handleClick
	} = useEditableCell({
		value,
		onSave,
		typeValue
	})

	return (
		<div
			onClick={handleClick}
			className={`
                relative ${
									isEditable ? 'cursor-pointer' : 'cursor-default'
								} group 
                ${
									!isEditing && isEditable
										? 'hover:bg-blue-600/30 rounded-md hover:ring-1 hover:ring-blue-400'
										: ''
								}
            `}
			title={isEditable ? 'Click to edit' : 'Read-only'}
		>
			{isEditing && isEditable ? (
				<input
					ref={inputRef}
					type="number"
					value={localValue}
					onChange={handleChange}
					onBlur={handleBlur}
					onKeyDown={handleKeyDown}
					className="w-24 text-center bg-blue-900/50 text-white-0
                        border-2 border-blue-500 rounded focus:outline-none 
                        focus:border-blue-400 px-2 py-1 shadow-inner"
				/>
			) : (
				<div className="flex items-center justify-center px-2 py-1">
					<span className="text-gray-300 group-hover:text-white-0 transition-colors duration-150">
						{typeValue === 'price' ? accounting.formatMoney(value, '€') : value}
					</span>
					{isEditable && (
						<Icon
							icon="fluent:edit-16-regular"
							className="ml-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
							width={16}
							height={16}
						/>
					)}
				</div>
			)}
		</div>
	)
}
