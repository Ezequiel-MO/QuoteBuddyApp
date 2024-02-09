import { useMemo } from 'react'
import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'

interface TransfersInRowProps {
	items: ITransfer[]
	date: string
}

export const TransfersInRow = ({ items, date }: TransfersInRowProps) => {
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

	return (
		<>
			{Object.entries(groupedItems).map(([key, group]) => (
				<tr key={key} className={tableRowClasses}>
					<td className={tableCellClasses}>{date}</td>
					<td>Transfer from Airport</td>
					<td>
						{`${group[0].vehicleCapacity} Seater ${group[0].vehicleType}`}
					</td>
					<td>{group.length}</td>
					<td>{accounting.formatMoney(group[0].transfer_in, '€')}</td>
					<td>
						{accounting.formatMoney(group[0].transfer_in * group.length, '€')}
					</td>
				</tr>
			))}
		</>
	)
}
