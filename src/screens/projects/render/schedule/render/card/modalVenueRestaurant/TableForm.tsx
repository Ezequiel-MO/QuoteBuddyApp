import { FC, useState, ChangeEvent } from "react"
import { IVenuePrice } from "../../../../../../../interfaces"

interface TableFormProps {
    value: IVenuePrice
    setValue: React.Dispatch<React.SetStateAction<IVenuePrice>>
}

export const TableForm: FC<TableFormProps> = ({ value, setValue }) => {


    const handleChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setValue(prevValues => ({
            ...prevValues,
            [name]: parseInt(value) || 0,
        }))
    }

    return (
        <tbody >
            <tr>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="rental"
                        value={value?.rental}
                        onChange={(e) => handleChangeForm(e)}
                    />
                </td>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="cocktail_units"
                        value={value?.cocktail_units}
                        onChange={(e) => handleChangeForm(e)}
                    />
                </td>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="cocktail_price"
                        value={value?.cocktail_price}
                        onChange={(e) => handleChangeForm(e)}
                    />
                </td>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="catering_units"
                        value={value?.catering_units}
                        onChange={(e) => handleChangeForm(e)}
                    />
                </td>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="catering_price"
                        value={value?.catering_price}
                        onChange={(e) => handleChangeForm(e)}
                    />
                </td>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="staff_menu_price"
                        value={value?.staff_menu_price}
                        onChange={(e) => handleChangeForm(e)}
                    />
                </td>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="audiovisuals"
                        value={value?.audiovisuals}
                        onChange={(e) => handleChangeForm(e)}
                    />
                </td>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="cleaning"
                        value={value?.cleaning}
                        onChange={(e) => handleChangeForm(e)}
                    />
                </td>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="security"
                        value={value?.security}
                        onChange={(e) => handleChangeForm(e)}
                    />
                </td>
                <td className="border px-2 py-1">
                    <input
                        className="form-input mt-1 block w-full"
                        type="number"
                        name="entertainment"
                        value={value?.entertainment}
                        onChange={(e) => handleChangeForm(e)}
                    />
                </td>
            </tr>
        </tbody>
    )
}