import { FC } from 'react'
import { TableForm } from "./TableForm"
import { IEntertainmentPrice } from '../../../../interfaces'

interface TableHeadModalProps {
    value: IEntertainmentPrice
	setValue: React.Dispatch<React.SetStateAction<IEntertainmentPrice>>
}

export const TableHeadModal: FC<TableHeadModalProps> = ({value , setValue}) => {
    return (
        <div className="p-6 -mt-5">
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="border px-2 py-1">Artists Fee</th>
                        <th className="border px-2 py-1">AaVv</th>
                        <th className="border px-2 py-1">lighting</th>
                        <th className="border px-2 py-1">Travel Allowance</th>
                        <th className="border px-2 py-1">Meal Allowance</th>
                    </tr>
                </thead>
                <TableForm value={value} setValue={setValue} />
            </table>
        </div>
    )
}