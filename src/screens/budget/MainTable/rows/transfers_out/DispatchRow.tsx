// src/screens/budget/MainTable/rows/transfers_out/DispatchRow.tsx
import { useState, useEffect } from 'react'
import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from '@constants/styles/listStyles'
import { EditableCellTransfer } from '../transfers_in/EditableCellTransfer'
import { useCurrentProject } from 'src/hooks'
import { useUIContext } from '@screens/budget/context/UIContext'
import { NoteActionIcon } from '@screens/budget/components/NoteActionIcon'
import { EntityNoteRow } from '@screens/budget/components/EntityNoteRow'

interface DispatchRowProps {
	lastItem: ITransfer
	date: string
}

export const DispatchRow = ({ lastItem, date }: DispatchRowProps) => {
	const { meetGreet = 0, meetGreetCost = 0 } = lastItem || {}
	const [originalValueMeetGreet] = useState(meetGreet)
	const [originalValueMeetGreetCost] = useState(meetGreetCost)
	const { showActionIcons } = useUIContext()

	// State to track if the dispatch has a note
	const [hasNote, setHasNote] = useState(
		!!(
			lastItem?.dispatchBudgetNotes &&
			lastItem?.dispatchBudgetNotes.trim() !== ''
		)
	)

	// Update hasNote when lastItem changes
	useEffect(() => {
		setHasNote(
			!!(
				lastItem?.dispatchBudgetNotes &&
				lastItem?.dispatchBudgetNotes.trim() !== ''
			)
		)
	}, [lastItem])

	const { updateMeetGreetTransferOut, updateTransferBudgetNote } =
		useCurrentProject()

	const handleUpdate = (value: number, type: 'meetGreet' | 'meetGreetCost') => {
		updateMeetGreetTransferOut({ value, key: type })
	}

	// Handlers for note operations
	const handleNoteAdded = (newNote: string) => {
		setHasNote(true)
		updateTransferBudgetNote({
			timeOfEvent: 'transfer_out',
			transferId: lastItem._id,
			budgetNotes: newNote,
			transferType: 'dispatch'
		})
	}

	const handleNoteDeleted = () => {
		setHasNote(false)
		updateTransferBudgetNote({
			timeOfEvent: 'transfer_out',
			transferId: lastItem._id,
			budgetNotes: '',
			transferType: 'dispatch'
		})
	}

	const handleNoteEdited = (newNote: string) => {
		setHasNote(!!newNote.trim())
		updateTransferBudgetNote({
			timeOfEvent: 'transfer_out',
			transferId: lastItem._id,
			budgetNotes: newNote,
			transferType: 'dispatch'
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
					Bus Dispatcher
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
						{showActionIcons && lastItem && (
							<NoteActionIcon
								entityId={lastItem._id || ''}
								entityName="Bus Dispatcher"
								entityType="transfer"
								entitySubtype="dispatch"
								date={date}
								currentNote={lastItem.dispatchBudgetNotes || ''}
								className="ml-2"
								onNoteAdded={handleNoteAdded}
								iconColor="green"
							/>
						)}
					</div>
				</td>
			</tr>

			{/* Render note row if hasNote is true */}
			{hasNote && lastItem?.dispatchBudgetNotes && (
				<EntityNoteRow
					note={lastItem.dispatchBudgetNotes}
					entityId={lastItem._id || ''}
					entityName="Bus Dispatcher"
					entityType="transfer"
					entitySubtype="dispatch"
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
