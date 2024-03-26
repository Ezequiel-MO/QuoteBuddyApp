import { useMemo } from 'react'
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

	const groupedItems = useMemo(() => {
		const groups: { [key: string]: ITransfer[] } = {}
		items.forEach((item) => {
			const { _id } = item
			if (!groups[_id]) groups[_id] = []
			groups[_id].push(item)
		})
		return groups
	}, [items])


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
			{Object.entries(groupedItems).map(([key, group]) => (
				<tr key={key} className={tableRowClasses}>
					<td className={tableCellClasses} title={date}>
						{date}
					</td>
					<td>Transfer To Airport</td>
					<td>
						{`${group[0].vehicleCapacity} Seater ${group[0].vehicleType}`}
					</td>
					<td>
						<EditableCellTransfer
							value={group.length}
							typeValue='unit'
							onSave={(newValue) => handleUpdate(newValue, "transfer", group[0]._id)}
						/>
					</td>
					<td>
						<EditableCellTransfer
							value={group[0].transfer_out}
							typeValue='price'
							onSave={(newValue) => handleUpdate(newValue, "priceTransfer", group[0]._id)}
						/>
					</td>
					<td>
						{accounting.formatMoney(group[0].transfer_out * group.length, '€')}
					</td>
				</tr>
			))}
		</>
	)
}
