// src/screens/budget/MainTable/rows/transfers_out/TransfersOutAssistanceRow.tsx
import { useEffect, useState } from 'react'
import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from '@constants/styles/listStyles'
import { EditableCellTransfer } from '../transfers_in/EditableCellTransfer'
import { useCurrentProject } from 'src/hooks'
import { UpdateAssistanceTransferOutPayload } from 'src/redux/features/currentProject/types'
import { useUIContext } from '@screens/budget/context/UIContext'
import { NoteActionIcon } from '@screens/budget/components/NoteActionIcon'
import { EntityNoteRow } from '@screens/budget/components/EntityNoteRow'

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
	const { showActionIcons } = useUIContext()

	// State to track note status
	const [hasNote, setHasNote] = useState(
		!!(
			firstItem?.assistanceBudgetNotes &&
			firstItem.assistanceBudgetNotes.trim() !== ''
		)
	)

	// Update the original values when firstItem changes
	useEffect(() => {
		setOriginalValueAssistance(firstItem.assistance || 0)
		setOriginalValueAssistanceCost(firstItem.assistanceCost || 0)
		setHasNote(
			!!(
				firstItem?.assistanceBudgetNotes &&
				firstItem.assistanceBudgetNotes.trim() !== ''
			)
		)
	}, [firstItem])

	// Get the update function from context
	const { updateAssistanceTransferOut, updateTransferBudgetNote } =
		useCurrentProject()

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

	// Handlers for note operations
	const handleNoteAdded = (newNote: string) => {
		setHasNote(true)
		updateTransferBudgetNote({
			timeOfEvent: 'transfer_out',
			transferId: firstItem._id,
			budgetNotes: newNote,
			transferType: 'assistance'
		})
	}

	const handleNoteDeleted = () => {
		setHasNote(false)
		updateTransferBudgetNote({
			timeOfEvent: 'transfer_out',
			transferId: firstItem._id,
			budgetNotes: '',
			transferType: 'assistance'
		})
	}

	const handleNoteEdited = (newNote: string) => {
		setHasNote(!!newNote.trim())
		updateTransferBudgetNote({
			timeOfEvent: 'transfer_out',
			transferId: firstItem._id,
			budgetNotes: newNote,
			transferType: 'assistance'
		})
	}

	// Calculate the total cost for display
	const totalCost = assistance * assistanceCost

	return (
		<>
			<tr
				className={`${tableRowClasses} hover:bg-gray-700/20 transition-colors duration-150 group`}
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
					<div className="flex items-center justify-center">
						<span>{accounting.formatMoney(totalCost, '€')}</span>

						{/* Add note icon */}
						{showActionIcons && firstItem && (
							<NoteActionIcon
								entityId={firstItem._id || ''}
								entityName="On-board Assistance"
								entityType="transfer"
								entitySubtype="assistance_out"
								date={date}
								currentNote={firstItem.assistanceBudgetNotes || ''}
								className="ml-2"
								onNoteAdded={handleNoteAdded}
								iconColor="green"
							/>
						)}
					</div>
				</td>
			</tr>

			{/* Render note row if hasNote is true */}
			{hasNote && firstItem?.assistanceBudgetNotes && (
				<EntityNoteRow
					note={firstItem.assistanceBudgetNotes}
					entityId={firstItem._id || ''}
					entityName="On-board Assistance"
					entityType="transfer"
					entitySubtype="assistance_out"
					date={date}
					onNoteDeleted={handleNoteDeleted}
					onNoteEdited={handleNoteEdited}
					borderColor="green"
					iconColor="green"
				/>
			)}
		</>
	)
}
