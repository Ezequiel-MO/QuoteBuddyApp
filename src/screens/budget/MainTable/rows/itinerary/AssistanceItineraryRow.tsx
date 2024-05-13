import { FC, useState, useCallback } from "react"
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { EditableCellTransfer } from "../transfers_in/EditableCellTransfer"
import { useContextBudget } from '../../../context/BudgetContext'
import { getDayIndex } from "../../../helpers"
import { ITransfer } from 'src/interfaces'
import accounting from 'accounting'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'



interface AssistanceItineraryRowProps {
    firstItem: ITransfer
    date: string
    description: string
    starts: 'morning' | 'afternoon' | 'night' | ''
    ends: 'morning' | 'afternoon' | 'night' | ''
}


export const AssistanceItineraryRow: FC<AssistanceItineraryRowProps> = ({ firstItem, date, description, starts, ends }) => {
    const mySwal = withReactContent(Swal)

    const { dispatch, state } = useContextBudget()

    const [originalValueAssistance] = useState(firstItem.assistance)
    const [originalValueAssistanceCost] = useState(firstItem.assistanceCost)
    const { assistance = 0, assistanceCost = 0 } = firstItem

    if (!firstItem || assistance === 0) {
        return null
    }

    const handleUpdate = useCallback(async (value: number, type: "assistance" | "assistanceCost") => {
        try {
            let dayIndex = getDayIndex(date, state)
            dispatch({
                type: "UPDATE_ASSISTANCE_TRANSFERS_ITINERARY",
                payload: {
                    dayIndex,
                    key: type,
                    value
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
    }, [date, state, dispatch, mySwal])



    return (
        <tr className={tableRowClasses}>
            <td className={tableCellClasses}>{date}</td>
            <td></td>
            <td>
                {`${description} ( Starts: ${starts} , Ends: ${ends} ) `}
            </td>
            <td>
                <EditableCellTransfer
                    value={assistance}
                    originalValue={originalValueAssistance}
                    typeValue='unit'
                    onSave={(newValue) => handleUpdate(newValue, "assistance")}
                />
            </td>
            <td>
                <EditableCellTransfer
                    value={assistanceCost}
                    originalValue={originalValueAssistanceCost}
                    typeValue='price'
                    onSave={(newValue) => handleUpdate(newValue, "assistanceCost")}
                />
            </td>
            <td>
                {accounting.formatMoney(assistance * assistanceCost, '€')}
            </td>
        </tr>
    )
}