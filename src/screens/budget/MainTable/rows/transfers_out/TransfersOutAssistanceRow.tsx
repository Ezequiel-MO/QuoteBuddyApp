import { useEffect, useState } from 'react'
import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { EditableCellTransfer } from '../transfers_in/EditableCellTransfer'
import { useCurrentProject } from 'src/hooks'
import { UpdateAssistanceTransferOutPayload } from 'src/redux/features/currentProject/types'

interface TransfersOutAssistanceRowProps {
	firstItem: ITransfer
	date: string
}

export const TransfersOutAssistanceRow = ({
	firstItem,
	date
}: TransfersOutAssistanceRowProps) => {
	const [originalValueAssistance, setOriginalValueAssistance] = useState(
		firstItem?.assistance || 0
	)
	const [originalValueAssistanceCost, setOriginalValueAssistanceCost] =
		useState(firstItem?.assistanceCost || 0)
	const { updateAssistanceTransferOut } = useCurrentProject()

	useEffect(() => {
		setOriginalValueAssistance(firstItem?.assistance || 0)
		setOriginalValueAssistanceCost(firstItem?.assistanceCost || 0)
	}, [firstItem])

	const handleUpdate = (
		value: number,
		type: 'assistance' | 'assistanceCost'
	) => {
		const payload: UpdateAssistanceTransferOutPayload = { value, key: type }
		updateAssistanceTransferOut(payload)
	}

	return (
		<tr
			className={`${tableRowClasses} hover:bg-gray-700/20 transition-colors duration-150`}
		>
			<td className={tableCellClasses} title={date}>
				{date}
			</td>
			<td></td>
			<td className={`${tableCellClasses} min-w-[200px] text-gray-100`}>
				On-board Assistance @ Buses
			</td>
			<td className={tableCellClasses}>
				<EditableCellTransfer
					value={firstItem?.assistance}
					originalValue={originalValueAssistance}
					typeValue="unit"
					onSave={(newValue) => handleUpdate(newValue, 'assistance')}
				/>
			</td>
			<td className={tableCellClasses}>
				<EditableCellTransfer
					value={firstItem?.assistanceCost}
					originalValue={originalValueAssistanceCost}
					typeValue="price"
					onSave={(newValue) => handleUpdate(newValue, 'assistanceCost')}
				/>
			</td>
			<td
				className={`${tableCellClasses} text-gray-100 px-2 py-1 min-w-[80px]`}
			>
				{accounting.formatMoney(
					firstItem?.assistance * firstItem?.assistanceCost,
					'€'
				)}
			</td>
		</tr>
	)
}
