import { FC } from 'react'

// Definir el tipo de las claves que se pueden usar
type MeetingField = "roomCapacity"
    | "HDRate"
    | "HDDDR"
    | "FDRate"
    | "FDDDR"
    | "aavvPackage"
    | "coffeeBreakUnits"
    | "coffeeBreakPrice"
    | "workingLunchUnits"
    | "workingLunchPrice"
    | "hotelDinnerUnits"
    | "hotelDinnerPrice"

interface InputMeetingTableProps {
    nameInptut: MeetingField;
    data: number;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleEdit: (editMode: boolean, type: MeetingField) => void; //
    editMode: boolean;
}


export const InputMeetingTable: FC<InputMeetingTableProps> = ({ nameInptut, data, handleChange, handleEdit, editMode }) => {

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleEdit(editMode, nameInptut);
        }
    }

    return (
        <div>
            <input
                className="w-24 h-8 bg-gray-700 border border-gray-600 rounded-md px-3 py-1 text-white-0 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                type="number"
                step="0.01"
                name={nameInptut}
                value={data ?? undefined}
                onChange={(e) => handleChange(e)}
                onBlur={() => handleEdit(editMode, nameInptut)}
                onKeyDown={(e) => handleKeyDown(e)}
                autoFocus
            />
        </div>
    )
}