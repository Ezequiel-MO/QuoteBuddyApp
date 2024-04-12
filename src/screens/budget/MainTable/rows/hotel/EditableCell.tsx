import React, { useState, useEffect, useRef } from 'react'

interface EditableCellProps {
	value: number
	onSave: (newValue: number) => void
}

const EditableCell: React.FC<EditableCellProps> = ({ value, onSave }) => {
	const [isEditing, setIsEditing] = useState(false)
	const [localValue, setLocalValue] = useState(value ? value.toString() : "")
	const inputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (isEditing) {
			inputRef.current?.focus()
		}
		setLocalValue(value ? value.toString() : "")
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
		<div onClick={handleClick} className="py-3 px-6 text-center cursor-pointer">
			{isEditing ? (
				<input
					ref={inputRef}
					type="number"
					value={localValue}
					onChange={handleChange}
					onBlur={handleBlur}
					onKeyDown={handleKeyDown}
					className="w-full px-2 py-1 text-center border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
				/>
			) : (
				<span>{value}</span>
			)}
		</div>
	)
}

export default EditableCell
