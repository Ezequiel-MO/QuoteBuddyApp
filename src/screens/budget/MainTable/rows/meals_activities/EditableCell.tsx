import React, { FC } from 'react'
import accounting from 'accounting'
import { Icon } from '@iconify/react'
import { useEditableCell } from '../../../hooks/useEditableCell'

export interface EditableCellProps {
	value: number
	onSave: (newValue: number) => void
	typeValue: 'unit' | 'price'
	originalValue?: number
}

export const EditableCell: FC<EditableCellProps> = ({
	value,
	onSave,
	typeValue,
	originalValue
}) => {
	const {
		isEditing,
		localValue,
		inputRef,
		isModified,
		isEditable,
		handleBlur,
		handleChange,
		handleKeyDown,
		handleClick
	} = useEditableCell({
		value,
		originalValue,
		onSave,
		typeValue
	})

	return (
		<abbr
			title={`${
				isModified ? 'Modified' : isEditable ? 'Edit value' : 'Read-only'
			}`}
			className="no-underline"
		>
			<div
				onClick={handleClick}
				className={`
                relative ${isEditable ? 'cursor-text' : 'cursor-default'} group 
                ${
									!isEditing && isEditable
										? 'hover:bg-blue-600/30 rounded-md hover:ring-1 hover:ring-blue-400'
										: ''
								}
                ${isModified ? 'bg-cyan-800/40 rounded-md' : ''}
                `}
			>
				{isEditing && isEditable ? (
					<input
						ref={inputRef}
						type="number"
						value={localValue}
						onChange={handleChange}
						onBlur={handleBlur}
						onKeyDown={handleKeyDown}
						className="w-full bg-gray-700/70 text-gray-100 border border-blue-400/80 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
					/>
				) : (
					<div className="flex items-center">
						{isEditable && (
							<Icon
								icon="fluent:edit-16-regular"
								className={`absolute right-1 top-1 text-blue-300 ${
									isModified ? 'opacity-80' : 'opacity-0 group-hover:opacity-40'
								} `}
							/>
						)}
						<span className="text-gray-100">
							{typeValue === 'price'
								? accounting.formatMoney(value, '€')
								: value}
						</span>
					</div>
				)}
			</div>
		</abbr>
	)
}
