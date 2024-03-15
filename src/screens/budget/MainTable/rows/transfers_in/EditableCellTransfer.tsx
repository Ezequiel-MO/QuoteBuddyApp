import React, { useState, useEffect, useRef, FC } from 'react'
import accounting from 'accounting'


interface EditableCellTransferProps {
    value: number
    onSave: (newValue: number) => void
    typeValue: "unit" | "price"
}

export const EditableCellTransfer: FC<EditableCellTransferProps> = ({ value, onSave, typeValue }) => {
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
        <div onClick={handleClick} className="cursor-pointer">
            {isEditing ? (
                <input
                    ref={inputRef}
                    type="number"
                    value={localValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    className="w-20  text-center border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
            ) : (
                <span>{typeValue === "price" ? accounting.formatMoney(value, '€') : value}</span>
            )}
        </div>
    )
}