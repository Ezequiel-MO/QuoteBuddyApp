import { FC, ChangeEvent, useEffect } from 'react'
import { IEntertainmentPrice } from '../../../../interfaces'

interface TableFormProps {
    value: IEntertainmentPrice
    setValue: React.Dispatch<React.SetStateAction<IEntertainmentPrice>>
}

export const TableForm: FC<TableFormProps> = ({ value, setValue }) => {

    const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        let numValue = parseFloat(value)
        setValue((prevValues) => ({
            ...prevValues,
            [name]: numValue
        }))
        if (parseFloat(value) < 0) {
            setValue((prevValues) => ({
                ...prevValues,
                [name]: 0
            }))
        }
    }
    

    return (
        <tbody>
            <tr>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="artistsFee"
                        value={value?.artistsFee}
                        onChange={(e) => handleChangeForm(e)}
                    />
                </td>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="aavv"
                        value={value?.aavv}
                        onChange={(e) => handleChangeForm(e)}
                    />
                </td>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="lighting"
                        value={value?.lighting}
                        onChange={(e) => handleChangeForm(e)}
                    />
                </td>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="travelAllowance"
                        value={value?.travelAllowance}
                        onChange={(e) => handleChangeForm(e)}
                    />
                </td>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="mealAllowance"
                        value={value?.mealAllowance}
                        onChange={(e) => handleChangeForm(e)}
                    />
                </td>
            </tr>
        </tbody>
    )
}
