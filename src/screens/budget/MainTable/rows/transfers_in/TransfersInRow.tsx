import { useState } from 'react'
import accounting from 'accounting'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { EditableCellTransfer } from './EditableCellTransfer'
import { useContextBudget } from '../../../context/BudgetContext'
import { ITransfer } from '../../../../../interfaces'

interface TransfersInRowProps {
	items: ITransfer[]
	date: string
}

export const TransfersInRow = ({ items, date }: TransfersInRowProps) => {
	const { dispatch } = useContextBudget()


	const NoTransfersIn = items.length === 0
	if (NoTransfersIn) return null

	const[originalUnit] = useState(items.length)
	const[originalPrice] = useState(items[0].transfer_in)

	const handleUpdate = (value: number, typeUpdate: "transfer" | "priceTransfer", id?: string) => {
		dispatch({
			type: "UPDATE_TRANSFERS_IN",
			payload: {
				value: value === 0 ? 1 : value,
				typeUpdate,
				id
			}
		})
	}

	return (
		<>
			<tr className={`${tableRowClasses} transition-opacity duration-300 ease-linear`}>
				<td className={tableCellClasses}>{date}</td>
				<td>Transfer from Airport</td>
				<td>
					{`${items[0].vehicleCapacity} Seater ${items[0].vehicleType}`}
				</td>
				<td>
					<EditableCellTransfer
						value={items.length}
						originalValue={originalUnit}
						typeValue='unit'
						onSave={(newValue) => handleUpdate(newValue, "transfer", items[0]._id)}
					/>
				</td>
				<td>
					{
						<EditableCellTransfer
							value={items[0].transfer_in}
							originalValue={originalPrice}
							typeValue='price'
							onSave={(newValue) => handleUpdate(newValue, "priceTransfer", items[0]._id)}
						/>
					}
				</td>
				<td>
					{accounting.formatMoney(items[0].transfer_in * items.length, '€')}
				</td>
			</tr>
		</>
	)
}
