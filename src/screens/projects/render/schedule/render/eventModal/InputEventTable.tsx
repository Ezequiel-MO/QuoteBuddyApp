import React, { FC } from 'react'

interface InputEventTableProps {
    style?: object
    data: number
    nameInput: string
    handleChange: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void
    editMode: boolean
    handleEdit: () => void
}

export const InputEventTable: FC<InputEventTableProps> = ({ style, nameInput, data, handleChange, handleEdit, editMode }) => {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") { //  con "key" se que tecla esta tocando el usuario
            handleEdit()
        }
    }


    return (
        <div>
            <input
                style={style || { width: "70px" }}
                className="cursor-pointer"
                type="number"
                name={nameInput}
                value={data ?? undefined}
                onChange={(e) => handleChange(e)}
                onBlur={() => handleEdit()}
                onKeyDown={(e) => handleKeyDown(e)}
                autoFocus
            />
        </div>
    )
}