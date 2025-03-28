// src/screens/budget/hooks/useEditableCell.ts
import { useState, useEffect, useRef } from 'react'
import { useUIContext } from '../context/UIContext'

interface UseEditableCellProps {
	value: number
	originalValue?: number
	onSave: (newValue: number) => void
	typeValue?: 'unit' | 'price'
}

export const useEditableCell = ({
	value,
	originalValue,
	onSave,
	typeValue
}: UseEditableCellProps) => {
	// Get the editable context from UIContext
	const { isEditable } = useUIContext()

	// Local state for editing
	const [isEditing, setIsEditing] = useState(false)
	const [localValue, setLocalValue] = useState(value ? value.toString() : '')
	const inputRef = useRef<HTMLInputElement>(null)

	// Update local value when value changes or editing state toggles
	useEffect(() => {
		if (isEditing) {
			inputRef.current?.focus()
		}
		setLocalValue(value ? value.toString() : '')
	}, [isEditing, value])

	// Handle blur (save)
	const handleBlur = () => {
		if (!isEditable) return

		const numericValue = Number(localValue)
		if (!isNaN(numericValue) && numericValue !== value) {
			onSave(numericValue)
		}
		setIsEditing(false)
	}

	// Handle input change
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocalValue(e.target.value)
	}

	// Handle key down (for Enter and Escape)
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleBlur()
		}
		if (e.key === 'Escape') {
			setIsEditing(false)
			setLocalValue(value.toString())
		}
	}

	// Handle click to start editing
	const handleClick = () => {
		if (!isEditable) return
		setIsEditing(true)
	}

	// Check if value has been modified
	const isModified =
		typeof originalValue === 'number' && originalValue !== value

	return {
		isEditing,
		localValue,
		inputRef,
		isModified,
		isEditable,
		handleBlur,
		handleChange,
		handleKeyDown,
		handleClick
	}
}
