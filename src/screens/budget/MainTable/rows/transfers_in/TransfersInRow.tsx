import { useMemo } from 'react'
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
		if (typeUpdate === "priceTransfer") {
			dispatch({
				type: "UPDATE_TRANSFERS_IN",
				payload: {
					value: value === 0 ? 1 : value,
					typeUpdate,
					id
				}
			})
		}
		if (typeUpdate === "transfer") {
			dispatch({
				type: "UPDATE_TRANSFERS_IN",
				payload: {
					value: value === 0 ? 1 : value,
					typeUpdate,
					id
				}
			})
		}
	}

	return (
		<>
			{Object.entries(groupedItems).map(([key, group]) => {
				return (
					<tr key={key} className={`${tableRowClasses} transition-opacity duration-300 ease-linear`}>
						<td className={tableCellClasses}>{date}</td>
						<td>Transfer from Airport</td>
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
							{
								<EditableCellTransfer
									value={group[0].transfer_in}
									typeValue='price'
									onSave={(newValue) => handleUpdate(newValue, "priceTransfer", group[0]._id)}
								/>
							}
						</td>
						<td>
							{accounting.formatMoney(group[0].transfer_in * group.length, '€')}
						</td>
					</tr>
				)
			})}
		</>
	)
}
