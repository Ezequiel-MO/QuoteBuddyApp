import { useState, FC } from 'react'
import accounting from 'accounting'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { TransferIteneraryCells } from "./TransferIteneraryCells"
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { useContextBudget } from '../../../context/BudgetContext'
import { EditableCellTransfer } from "../transfers_in/EditableCellTransfer"
import { getDayIndex } from "../../../helpers"
import { ITransfer } from 'src/interfaces'

interface TransferIteneraryRowProps {
    options: ITransfer[]
    date: string
    starts: 'morning' | 'afternoon' | 'night' | ''
    ends: 'morning' | 'afternoon' | 'night' | ''
}


export const TransferIteneraryRow: FC<TransferIteneraryRowProps> = ({ options, date, starts, ends }) => {

    if (options.length === 0) {
        return null
    }

    //creo un objeto de objetos, la "key" del obejct  va ser el id "Transfer"
    const groupedOptions = options.reduce((acc, option) => {
        const service = option.selectedService
        const id = option._id
        if (id) {
            if (acc[id + service]) {
                acc[id + service].count += 1
            } else {
                acc[id + service] = {
                    ...option,
                    count: 1
                }
            }
        }
        return acc
    }, {} as { [key: string]: ITransfer & { count: number } })

    const groupedOptionsArray = Object.values(groupedOptions)

    return (
        <>
            {
                groupedOptionsArray.map((group) => {
                    return (
                        <tr key={group._id + group.selectedService} className={tableRowClasses}>
                            <td className={tableCellClasses}>
                                {date}
                            </td>
                            <TransferIteneraryCells
                                transfer={group}
                                count={group.count}
                                date={date}
                                starts={starts}
                                ends={ends}
                            />
                        </tr>
                    )
                })
            }
        </>
    )
}