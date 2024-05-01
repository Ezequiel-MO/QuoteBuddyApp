import { useState } from 'react'
import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { EditableCellTransfer } from "../transfers_in/EditableCellTransfer"
import { useContextBudget } from '../../../context/BudgetContext'

interface TransfersOutRowProps {
	items: ITransfer[]
	date: string
}

export const TransfersOutRow = ({ items, date }: TransfersOutRowProps) => {
	const { dispatch } = useContextBudget()

	const NoTransfersOut = items.length === 0
	if (NoTransfersOut) return null

	const[originalUnit] = useState(items.length)
	const[originalPrice] = useState(items[0].transfer_out)

	const handleUpdate = (value: number, typeUpdate: "transfer" | "priceTransfer", id?: string) => {
		dispatch({
			type: "UPDATE_TRANSFERS_OUT",
			payload: {
				value: value === 0 ? 1 : value,
				typeUpdate,
				id
			}
		})
	}


	return (
		<>
			<tr className={tableRowClasses}>
				<td className={tableCellClasses} title={date}>
					{date}
				</td>
				<td>Transfer To Airport</td>
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
					<EditableCellTransfer
						value={items[0].transfer_out}
						originalValue={originalPrice}
						typeValue='price'
						onSave={(newValue) => handleUpdate(newValue, "priceTransfer", items[0]._id)}
					/>
				</td>
				<td>
					{accounting.formatMoney(items[0].transfer_out * items.length, '€')}
				</td>
			</tr>
		</>
	)
}
