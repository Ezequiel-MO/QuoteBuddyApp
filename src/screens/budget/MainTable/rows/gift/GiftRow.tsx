import { useEffect, useState, FC } from 'react'
import { tableRowClasses } from 'src/constants/listStyles'
import { OptionSelect } from '../../multipleOrSingle'
import { EditableCell } from "../meals_activities/EditableCell"
import { useContextBudget } from '../../../context/BudgetContext'
import { existGift } from "../../../helpers"
import accounting from 'accounting'
import { IGift } from "src/interfaces/"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'




interface GiftRowProps {
    items: IGift[]
    selectedGift: IGift
    setSelectedGift: React.Dispatch<React.SetStateAction<IGift>>
}

export const GiftRow: FC<GiftRowProps> = ({ items, selectedGift, setSelectedGift }) => {
    const mySwal = withReactContent(Swal)

    const { dispatch, state } = useContextBudget()

    const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const newValue = e.target.value as string
        const newSelectedGift =
            items && items.find((item) => item.name === newValue)
        if (newSelectedGift) {
            setSelectedGift(newSelectedGift)
        }
    }

    const handleUpdate = async (newValue: number, keyGift: "qty" | "price") => {
        try {
            existGift(items, selectedGift._id as string)
            const updateGift = { ...selectedGift }
            updateGift[keyGift] = newValue
            setSelectedGift(updateGift)
            dispatch({
                type: "UPDATE_GIFT",
                payload: {
                    value: newValue <= 0 ? 1 : newValue,
                    idGift: selectedGift._id as string,
                    keyGift
                }
            })
        } catch (error: any) {
            console.log(error)
            await mySwal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonColor: 'green'
            })
        }
    }


    return (
        <tr className={tableRowClasses}>
            <td></td>
            <td className='text-lg'>
                {`Gift`}
            </td>
            <td>
                <OptionSelect
                    options={items}
                    value={selectedGift.name || ""}
                    handleChange={(e) => handleSelectChange(e)}
                />
            </td>
            <td>
                <EditableCell
                    value={selectedGift.qty}
                    typeValue='unit'
                    onSave={(newValue) => handleUpdate(newValue, "qty")}
                />
            </td>
            <td>
                <EditableCell
                    value={selectedGift.price}
                    typeValue='price'
                    onSave={(newValue) => handleUpdate(newValue, "price")}
                />
            </td>
            <td>
                {accounting.formatMoney(selectedGift.qty * selectedGift.price , "€")}
            </td>
        </tr>
    )
}