// src/screens/budget/MainTable/rows/transfers_in/MeetGreetRow.tsx
import { useState, useEffect } from 'react'
import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { EditableCellTransfer } from './EditableCellTransfer'
import { useCurrentProject } from 'src/hooks'
import { useUIContext } from '@screens/budget/context/UIContext'
import { NoteActionIcon } from '@screens/budget/components/NoteActionIcon'
import { EntityNoteRow } from '@screens/budget/components/EntityNoteRow'

interface MeetGreetRowProps {
	firstItem: ITransfer
	date: string
}

export const MeetGreetRow = ({ firstItem, date }: MeetGreetRowProps) => {
	const [originalValueMeetGreet] = useState(firstItem?.meetGreet)
	const [originalValueMeetGreetCost] = useState(firstItem?.meetGreetCost)
	const { showActionIcons } = useUIContext()

	const { meetGreet = 0, meetGreetCost = 0 } = firstItem

	const { updateMeetGreetTransferIn, updateTransferBudgetNote } =
		useCurrentProject()

	// State to track if the meet & greet has a note
	const [hasNote, setHasNote] = useState(
		!!(
			firstItem?.meetGreetBudgetNotes &&
			firstItem?.meetGreetBudgetNotes.trim() !== ''
		)
	)

	// Update hasNote when firstItem changes
	useEffect(() => {
		setHasNote(
			!!(
				firstItem?.meetGreetBudgetNotes &&
				firstItem?.meetGreetBudgetNotes.trim() !== ''
			)
		)
	}, [firstItem])

	const handleUpdate = (value: number, type: 'meetGreet' | 'meetGreetCost') => {
		updateMeetGreetTransferIn({ unit: value, key: type })
	}

	// Handlers for note operations
	const handleNoteAdded = (newNote: string) => {
		setHasNote(true)
		updateTransferBudgetNote({
			timeOfEvent: 'transfer_in',
			transferId: firstItem._id,
			budgetNotes: newNote,
			transferType: 'meet_greet'
		})
	}

	const handleNoteDeleted = () => {
		setHasNote(false)
		updateTransferBudgetNote({
			timeOfEvent: 'transfer_in',
			transferId: firstItem._id,
			budgetNotes: '',
			transferType: 'meet_greet'
		})
	}

	const handleNoteEdited = (newNote: string) => {
		setHasNote(!!newNote.trim())
		updateTransferBudgetNote({
			timeOfEvent: 'transfer_in',
			transferId: firstItem._id,
			budgetNotes: newNote,
			transferType: 'meet_greet'
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
					Meet & Greet @ Airport
				</td>
				<td className={tableCellClasses}>
					<EditableCellTransfer
						value={meetGreet}
						originalValue={originalValueMeetGreet}
						typeValue="unit"
						onSave={(newValue) => handleUpdate(newValue, 'meetGreet')}
					/>
				</td>
				<td className={tableCellClasses}>
					<EditableCellTransfer
						value={meetGreetCost}
						originalValue={originalValueMeetGreetCost}
						typeValue="price"
						onSave={(newValue) => handleUpdate(newValue, 'meetGreetCost')}
					/>
				</td>
				<td className="text-gray-100 px-16 py-1 min-w-[80px]">
					<div className="flex items-center justify-center">
						<span>
							{accounting.formatMoney(meetGreet * meetGreetCost, '€')}
						</span>

						{/* Add note icon */}
						{showActionIcons && firstItem && (
							<NoteActionIcon
								entityId={firstItem._id || ''}
								entityName="Meet & Greet"
								entityType="transfer"
								entitySubtype="meet_greet"
								date={date}
								currentNote={firstItem.meetGreetBudgetNotes || ''}
								className="ml-2"
								onNoteAdded={handleNoteAdded}
								iconColor="green"
							/>
						)}
					</div>
				</td>
			</tr>

			{/* Render note row if hasNote is true */}
			{hasNote && firstItem?.meetGreetBudgetNotes && (
				<EntityNoteRow
					note={firstItem.meetGreetBudgetNotes}
					entityId={firstItem._id || ''}
					entityName="Meet & Greet"
					entityType="transfer"
					entitySubtype="meet_greet"
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
