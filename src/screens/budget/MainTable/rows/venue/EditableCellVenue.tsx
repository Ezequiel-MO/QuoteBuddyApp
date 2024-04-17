import React, { useState, useEffect, useRef, FC } from 'react'
import accounting from 'accounting'


interface EditableCellVenueProps {
    value: number
    onSave: (newValue: number) => void
    typeValue: "unit" | "price"
}

export const EditableCellVenue: FC<EditableCellVenueProps> = ({ value, onSave, typeValue }) => {
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
                    className="w-20 text-center  border-2 border-blue-500 rounded focus:outline-none "
                />
            ) : (
                <span
                    className={typeValue === 'price' ? "" : "bg-orange-50 text-[#fff] font-extrabold py-1 px-3 rounded-full text-sm"}
                >
                    {
                        typeValue === "price" ?
                            accounting.formatMoney(value, '€')
                            : value
                    }
                </span>
            )}
        </div>
    )
}