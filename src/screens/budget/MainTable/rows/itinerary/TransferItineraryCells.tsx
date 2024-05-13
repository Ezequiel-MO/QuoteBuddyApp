import { useState, FC } from 'react'
import accounting from 'accounting'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useContextBudget } from '../../../context/BudgetContext'
import { EditableCellTransfer } from "../transfers_in/EditableCellTransfer"
import { getDayIndex } from "../../../helpers"
import { ITransfer } from 'src/interfaces'

type ServiceKey = | "dispo_4h"
    | "dispo_4h_night"
    | "dispo_5h_out"
    | "dispo_6h"
    | "dispo_6h_night"
    | "dispo_9h"


const serviceDescriptions: { [key: string]: string } = {
    dispo_4h: '4 Hours at Disposal',
    dispo_4h_night: '4 Night Hours at Disposal',
    dispo_5h_out: '5 Hours at Disposal Out of Town',
    dispo_6h: '6 Hours at Disposal',
    dispo_6h_night: '6 Night Hours at Disposal',
    dispo_9h: '9 Hours at Disposal'
}



interface TransferItineraryCellsProps {
    transfer: ITransfer
    count: number
    date: string
    starts: 'morning' | 'afternoon' | 'night' | ''
    ends: 'morning' | 'afternoon' | 'night' | ''
}


export const TransferItineraryCells: FC<TransferItineraryCellsProps> = ({
    transfer,
    count,
    date,
    starts,
    ends
}) => {

    const mySwal = withReactContent(Swal)

    const { dispatch, state } = useContextBudget()

    const serviceKey = transfer.selectedService as keyof ITransfer
    const serviceDescription = serviceDescriptions[transfer.selectedService] || transfer.selectedService

    const [originalUnitTransfer, setOriginalUnitTransfer] = useState(count)
    const [originaPriceTransfer, setOriginalPriceTransfer] = useState<number>(transfer[serviceKey] as number)

    const handleUpdate = async (value: number, type: "transfer" | "priceTransfer") => {
        try {
            let dayIndex = getDayIndex(date, state)
            dispatch({
                type: "UPDATE_TRANSFERS_ITINERARY",
                payload: {
                    dayIndex,
                    idTransfer: transfer._id,
                    serviceKey: serviceKey as ServiceKey,
                    typeUpdate: type,
                    value: value <= 0 ? 1 : value
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
        <>
            <td>
                {`En Route Itinerary (Start: ${starts} , End: ${ends})`}
            </td>
            <td>
                {`Vehicle Capacity ${transfer.vehicleCapacity} , ${transfer.vehicleType}, ${serviceDescription}`}
            </td>
            <td>
                <EditableCellTransfer
                    value={count}
                    originalValue={originalUnitTransfer}
                    typeValue='unit'
                    onSave={(newValue) => handleUpdate(newValue, "transfer")}
                />
            </td>
            <td>
                <EditableCellTransfer
                    value={transfer[serviceKey] as number}
                    originalValue={originaPriceTransfer}
                    typeValue='price'
                    onSave={(newValue) => handleUpdate(newValue, "priceTransfer")}
                />
            </td>
            <td>
                {accounting.formatMoney((transfer[serviceKey] as number) * count, '€')}
            </td>
        </>
    )
}