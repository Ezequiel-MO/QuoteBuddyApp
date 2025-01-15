import React, { useState, useEffect, useRef, FC } from 'react'
import accounting from 'accounting'
import { Icon } from '@iconify/react'

interface EditableCellProps {
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
	const [isEditing, setIsEditing] = useState(false)
	const [localValue, setLocalValue] = useState(value ? value.toString() : '')
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (isEditing) {
			inputRef.current?.focus()
		}
		setLocalValue(value ? value.toString() : '')
	}, [isEditing])

	const handleBlur = () => {
		onSave(Number(localValue))
		setIsEditing(false)
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalValue(e.target.value)
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault()
			handleBlur()
		}
	}

	const handleClick = () => {
		setIsEditing(true)
	}

	return (
		<abbr
			title={`${
				originalValue ||
				(typeof originalValue === 'number' && originalValue !== value)
					? 'Modified'
					: 'Edit value'
			}`}
			className="no-underline"
		>
			<div
				onClick={handleClick}
				className={`
            relative cursor-text w-20 ${
							!isEditing && 'hover:border-blue-200 rounded-md hover:border-2'
						}
            ${
							(originalValue || typeof originalValue === 'number') &&
							originalValue !== value &&
							'bg-green-200'
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
						className="w-full  border-2 border-gray-300 rounded text-black-50 focus:outline-none focus:border-blue-500"
					/>
				) : (
					<div>
						<Icon
							icon="line-md:pencil-twotone"
							className={`
                            absolute right-0 top-0 
                            ${
															(originalValue ||
																typeof originalValue === 'number') &&
															originalValue !== value
																? 'opacity-100'
																: 'opacity-0'
														} 
                            `}
						/>
						<span>
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
