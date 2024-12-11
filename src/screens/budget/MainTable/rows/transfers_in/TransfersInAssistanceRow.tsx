import { useState } from 'react'
import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { EditableCellTransfer } from './EditableCellTransfer'
import { useCurrentProject } from 'src/hooks'

interface TransfersInAssistanceRowProps {
	firstItem: ITransfer
	date: string
}

export const TransfersInAssistanceRow = ({
	firstItem,
	date
}: TransfersInAssistanceRowProps) => {
	const [originalValueAssistance] = useState(firstItem.assistance)
	const [originalValueAssistanceCost] = useState(firstItem.assistanceCost)
	const { assistance = 0, assistanceCost = 0 } = firstItem
	const { updateAssistanceTransferIn } = useCurrentProject()

	const handleUpdate = (
		value: number,
		type: 'assistance' | 'assistanceCost'
	) => {
		updateAssistanceTransferIn({
			value,
			key: type
		})
	}

	return (
		<tr className={tableRowClasses}>
			<td className={tableCellClasses}>{date}</td>
			<td></td>
			<td>On-board Assistance @ Buses</td>
			<td>
				<EditableCellTransfer
					value={assistance}
					originalValue={originalValueAssistance}
					typeValue="unit"
					onSave={(newValue) => handleUpdate(newValue, 'assistance')}
				/>
			</td>
			<td>
				<EditableCellTransfer
					value={assistanceCost}
					originalValue={originalValueAssistanceCost}
					typeValue="price"
					onSave={(newValue) => handleUpdate(newValue, 'assistanceCost')}
				/>
			</td>
			<td>{accounting.formatMoney(assistance * assistanceCost, '€')}</td>
		</tr>
	)
}
