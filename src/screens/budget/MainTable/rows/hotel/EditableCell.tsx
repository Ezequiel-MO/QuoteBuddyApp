import React, { useState, useEffect, useRef } from 'react'
import accounting from 'accounting'
import { Icon } from '@iconify/react'

interface EditableCellProps {
	value: number
	onSave: (newValue: number) => void
	typeValue?: 'unit' | 'price'
	originalValue?: number
}

const EditableCell: React.FC<EditableCellProps> = ({
	value,
	onSave,
	typeValue,
	originalValue
}) => {
	const [isEditing, setIsEditing] = useState(false)
	const [localValue, setLocalValue] = useState(value ? value.toString() : '')
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (isEditing) {
			inputRef.current?.focus()
		}
		// Re-sync local value whenever 'value' changes or editing state toggles
		setLocalValue(value ? value.toString() : '')
	}, [isEditing, value])

	const handleBlur = () => {
		const numericValue = Number(localValue)
		if (!isNaN(numericValue) && numericValue !== value) {
			onSave(numericValue)
		}
		setIsEditing(false)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalValue(e.target.value)
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleBlur()
		}
		if (e.key === 'Escape') {
			setIsEditing(false)
			setLocalValue(value.toString())
		}
	}

	const handleClick = () => {
		setIsEditing(true)
	}

	// highlight cell if value differs from originalValue
	const isModified =
		typeof originalValue === 'number' && originalValue !== value

	return (
		<abbr
			title={isModified ? 'Modified' : 'Click to edit value'}
			className="no-underline"
		>
			<div
				onClick={handleClick}
				className={`
          relative py-2 px-4 cursor-pointer 
          ${
						!isEditing
							? 'hover:bg-blue-600/30 rounded-md hover:ring-1 hover:ring-blue-400'
							: ''
					}
          ${
						isModified
							? 'bg-cyan-800/80 text-white-50 rounded-md shadow-inner'
							: ''
					}
        `}
			>
				{isEditing ? (
					<input
						ref={inputRef}
						type="number"
						value={localValue}
						onChange={handleChange}
						onBlur={handleBlur}
						onKeyDown={handleKeyDown}
						className="min-w-[30px] w-full bg-cyan-800 text-center border-2 text-white-50 
                       border-blue-400 rounded focus:outline-none shadow-md
                       focus:border-blue-500 px-2 py-1"
					/>
				) : (
					<div className="flex items-center justify-center">
						<span>
							{typeValue === 'price'
								? accounting.formatMoney(value, '€')
								: value}
						</span>
						{isModified && (
							<Icon
								icon="line-md:pencil-twotone"
								className="
                  absolute right-2 top-1/2 transform -translate-y-1/2 
                  opacity-100
                "
							/>
						)}
					</div>
				)}
			</div>
		</abbr>
	)
}

export default EditableCell
