import React, { useState, useEffect, useRef, FC } from 'react'
import accounting from 'accounting'
import { Icon } from '@iconify/react'

interface EditableCellTransferProps {
	value: number
	onSave: (newValue: number) => void
	typeValue: 'unit' | 'price'
	originalValue: number
}

export const EditableCellTransfer: FC<EditableCellTransferProps> = ({
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
			handleBlur()
		}
	}

	const handleClick = () => {
		setIsEditing(true)
	}

	return (
		<abbr
			title={`${
				originalValue && originalValue !== value ? 'Modified' : 'Edit value'
			}`}
			className="no-underline"
		>
			<div
				onClick={handleClick}
				className={`
                relative cursor-text min-w-[80px] px-2 py-1 ${
									!isEditing
										? 'hover:border-blue-300/70 rounded-md hover:border hover:bg-gray-700/30'
										: ''
								} 
                ${
									originalValue && originalValue !== value
										? 'bg-cyan-800/40 rounded-md'
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
						className="w-full bg-gray-700/70 text-gray-100 border border-blue-400/80 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50"
					/>
				) : (
					<div className="flex items-center">
						<Icon
							icon="line-md:pencil-twotone"
							className={`absolute right-1 top-1 text-blue-300 ${
								originalValue && originalValue !== value
									? 'opacity-80'
									: 'opacity-0 group-hover:opacity-40'
							} `}
						/>
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
