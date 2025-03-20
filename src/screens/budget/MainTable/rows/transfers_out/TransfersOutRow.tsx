import { useState } from 'react'
import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { EditableCellTransfer } from '../transfers_in/EditableCellTransfer'
import { useCurrentProject } from 'src/hooks'
import { UpdateTransfersOutPayload } from 'src/redux/features/currentProject/types'

interface TransfersOutRowProps {
	items: ITransfer[]
	date: string
}

export const TransfersOutRow = ({ items, date }: TransfersOutRowProps) => {
	const { updateTransfersOut } = useCurrentProject()

	const [originalUnit] = useState(items.length)
	const [originalPrice] = useState(items[0].transfer_out)

	const handleUpdate = (
		value: number,
		typeUpdate: 'transfer' | 'priceTransfer',
		id?: string
	) => {
		const payload: UpdateTransfersOutPayload = {
			value: value === 0 ? 1 : value,
			typeUpdate,
			id: id || ''
		}
		updateTransfersOut(payload)
	}

	return (
		<>
			<tr
				className={`${tableRowClasses} hover:bg-gray-700/20 transition-colors duration-150`}
			>
				<td className={tableCellClasses}></td>
				<td className={`${tableCellClasses} min-w-[200px] text-gray-100`}>
					Transfer To Airport
				</td>
				<td
					className={`${tableCellClasses} text-gray-100`}
				>{`${items[0].vehicleCapacity} Seater ${items[0].vehicleType}`}</td>
				<td className={tableCellClasses}>
					<EditableCellTransfer
						value={items.length}
						originalValue={originalUnit}
						typeValue="unit"
						onSave={(newValue) =>
							handleUpdate(newValue, 'transfer', items[0]._id)
						}
					/>
				</td>
				<td className={tableCellClasses}>
					<EditableCellTransfer
						value={items[0].transfer_out}
						originalValue={originalPrice}
						typeValue="price"
						onSave={(newValue) =>
							handleUpdate(newValue, 'priceTransfer', items[0]._id)
						}
					/>
				</td>
				<td
					className={`${tableCellClasses} text-gray-100 px-2 py-1 min-w-[80px]`}
				>
					{accounting.formatMoney(items[0].transfer_out * items.length, '€')}
				</td>
			</tr>
		</>
	)
}
