import { useState } from 'react'
import accounting from 'accounting'
import { ITransfer } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from '@constants/styles/listStyles'
import { EditableCellTransfer } from './EditableCellTransfer'
import { useCurrentProject } from 'src/hooks'
import { useUIContext } from '@screens/budget/context/UIContext'
import { NoteActionIcon } from '@screens/budget/components/NoteActionIcon'
import { EntityNoteRow } from '@screens/budget/components/EntityNoteRow'
import { TRANSFER_CONFIGS } from '@screens/budget/constants/budgetNotesTransfersInOutConfig'

interface MeetGreetRowProps {
	firstItem: ITransfer & {
		_id: string
		meetGreetBudgetNotes?: string
	}
	date: string
}

// Define the config for easier access
const config = TRANSFER_CONFIGS.meet_greet

export const MeetGreetRow = ({ firstItem, date }: MeetGreetRowProps) => {
	const [originalValueMeetGreet] = useState(firstItem?.meetGreet)
	const [originalValueMeetGreetCost] = useState(firstItem?.meetGreetCost)
	const { showActionIcons } = useUIContext()

	const { meetGreet = 0, meetGreetCost = 0 } = firstItem

	const { updateMeetGreetTransferIn, updateTransferBudgetNote } =
		useCurrentProject()

	const hasNote = !!firstItem?.meetGreetBudgetNotes?.trim()

	const handleUpdate = (value: number, type: 'meetGreet' | 'meetGreetCost') => {
		updateMeetGreetTransferIn({ unit: value, key: type })
	}

	// Handlers for note operations
	const handleNoteAdded = (newNote: string) => {
		updateTransferBudgetNote({
			timeOfEvent: 'transfer_in',
			transferId: firstItem._id,
			budgetNotes: newNote,
			transferType: config.entitySubtype
		})
	}

	const handleNoteDeleted = () => {
		updateTransferBudgetNote({
			timeOfEvent: 'transfer_in',
			transferId: firstItem._id,
			budgetNotes: '',
			transferType: config.entitySubtype
		})
	}

	const handleNoteEdited = (newNote: string) => {
		updateTransferBudgetNote({
			timeOfEvent: 'transfer_in',
			transferId: firstItem._id,
			budgetNotes: newNote,
			transferType: config.entitySubtype
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
					{config.entityName}
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
								entityName={config.entityName}
								entityType={config.entityType}
								entitySubtype={config.entitySubtype}
								date={date}
								currentNote={firstItem.meetGreetBudgetNotes || ''}
								className="ml-2"
								onNoteAdded={handleNoteAdded}
								iconColor={config.colors.icon}
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
					entityName={config.entityName}
					entityType={config.entityType}
					entitySubtype={config.entitySubtype}
					date={date}
					onNoteDeleted={handleNoteDeleted}
					onNoteEdited={handleNoteEdited}
					borderColor={config.colors.border}
					iconColor={config.colors.icon}
				/>
			)}
		</>
	)
}
