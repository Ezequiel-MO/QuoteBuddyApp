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
	// Check if firstItem exists, if not early return
	if (!firstItem) return null

	// Get assistance values, defaulting to 0 for undefined values
	const { assistance = 0, assistanceCost = 0 } = firstItem

	// Track original values for comparison in EditableCellTransfer
	const [originalValueAssistance, setOriginalValueAssistance] =
		useState(assistance)
	const [originalValueAssistanceCost, setOriginalValueAssistanceCost] =
		useState(assistanceCost)

	// Get the update function from context
	const { updateAssistanceTransferOut } = useCurrentProject()

	// Update the original values when firstItem changes
	useEffect(() => {
		setOriginalValueAssistance(firstItem.assistance || 0)
		setOriginalValueAssistanceCost(firstItem.assistanceCost || 0)
	}, [firstItem])

	// Handler for when either field is updated
	const handleUpdate = (
		value: number,
		type: 'assistance' | 'assistanceCost'
	) => {
		const payload: UpdateAssistanceTransferOutPayload = {
			value: value <= 0 ? 1 : value, // Ensure positive values
			key: type
		}
		updateAssistanceTransferOut(payload)
	}

	// Calculate the total cost for display
	const totalCost = assistance * assistanceCost

	return (
		<tr
			className={`${tableRowClasses} hover:bg-gray-700/20 transition-colors duration-150`}
		>
			{/* First cell left empty for alignment with other rows */}
			<td className={tableCellClasses}></td>

			{/* Empty second cell for alignment with other transfer rows */}
			<td></td>

			{/* Description cell */}
			<td className={`${tableCellClasses} min-w-[200px] text-gray-100`}>
				On-board Assistance @ Buses
			</td>

			{/* Units cell with editable component */}
			<td className={tableCellClasses}>
				<EditableCellTransfer
					value={assistance}
					originalValue={originalValueAssistance}
					typeValue="unit"
					onSave={(newValue) => handleUpdate(newValue, 'assistance')}
				/>
			</td>

			{/* Price cell with editable component */}
			<td className={tableCellClasses}>
				<EditableCellTransfer
					value={assistanceCost}
					originalValue={originalValueAssistanceCost}
					typeValue="price"
					onSave={(newValue) => handleUpdate(newValue, 'assistanceCost')}
				/>
			</td>

			{/* Total cost cell */}
			<td className="text-gray-100 px-16 py-1 min-w-[80px]">
				{accounting.formatMoney(totalCost, '€')}
			</td>
		</tr>
	)
}
