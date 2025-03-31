// src/screens/budget/MainTable/rows/transfers_in/TransfersInAssistanceRow.tsx
import { useState, useEffect } from 'react'
import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { EditableCellTransfer } from './EditableCellTransfer'
import { useCurrentProject } from 'src/hooks'
import { useUIContext } from '@screens/budget/context/UIContext'
import { NoteActionIcon } from '@screens/budget/components/NoteActionIcon'
import { EntityNoteRow } from '@screens/budget/components/EntityNoteRow'

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
	const { showActionIcons } = useUIContext()

	const { assistance = 0, assistanceCost = 0 } = firstItem
	const { updateAssistanceTransferIn, updateTransferBudgetNote } =
		useCurrentProject()

	// State to track if the assistance has a note
	const [hasNote, setHasNote] = useState(
		!!(
			firstItem?.assistanceBudgetNotes &&
			firstItem?.assistanceBudgetNotes.trim() !== ''
		)
	)

	// Update hasNote when firstItem changes
	useEffect(() => {
		setHasNote(
			!!(
				firstItem?.assistanceBudgetNotes &&
				firstItem?.assistanceBudgetNotes.trim() !== ''
			)
		)
	}, [firstItem])

	const handleUpdate = (
		value: number,
		type: 'assistance' | 'assistanceCost'
	) => {
		updateAssistanceTransferIn({
			value,
			key: type
		})
	}

	// Handlers for note operations
	const handleNoteAdded = (newNote: string) => {
		setHasNote(true)
		updateTransferBudgetNote({
			timeOfEvent: 'transfer_in',
			transferId: firstItem._id,
			budgetNotes: newNote,
			transferType: 'assistance'
		})
	}

	const handleNoteDeleted = () => {
		setHasNote(false)
		updateTransferBudgetNote({
			timeOfEvent: 'transfer_in',
			transferId: firstItem._id,
			budgetNotes: '',
			transferType: 'assistance'
		})
	}

	const handleNoteEdited = (newNote: string) => {
		setHasNote(!!newNote.trim())
		updateTransferBudgetNote({
			timeOfEvent: 'transfer_in',
			transferId: firstItem._id,
			budgetNotes: newNote,
			transferType: 'assistance'
		})
	}

	return (
		<>
			<tr
				className={`${tableRowClasses} hover:bg-gray-700/20 transition-colors duration-150 group`}
			>
				<td className={tableCellClasses}></td>
				<td></td>
				<td className={`${tableCellClasses} min-w-[200px] text-gray-100`}>
					On-board Assistance @ Buses
				</td>
				<td className={tableCellClasses}>
					<EditableCellTransfer
						value={assistance}
						originalValue={originalValueAssistance}
						typeValue="unit"
						onSave={(newValue) => handleUpdate(newValue, 'assistance')}
					/>
				</td>
				<td className={tableCellClasses}>
					<EditableCellTransfer
						value={assistanceCost}
						originalValue={originalValueAssistanceCost}
						typeValue="price"
						onSave={(newValue) => handleUpdate(newValue, 'assistanceCost')}
					/>
				</td>

				<td className="text-gray-100 px-16 py-1 min-w-[80px]">
					<div className="flex items-center justify-center">
						<span>
							{accounting.formatMoney(assistance * assistanceCost, '€')}
						</span>

						{/* Add note icon */}
						{showActionIcons && firstItem && (
							<NoteActionIcon
								entityId={firstItem._id || ''}
								entityName="On-board Assistance"
								entityType="transfer"
								entitySubtype="assistance"
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
					entitySubtype="assistance"
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
