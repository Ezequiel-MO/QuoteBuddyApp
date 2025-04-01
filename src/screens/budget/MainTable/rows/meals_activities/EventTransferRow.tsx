import { useState, useEffect } from 'react'
import { IEvent, IRestaurant, ITransfer } from '../../../../../interfaces'
import { AssistanceRow } from './AssistanceRow'
import { TransferRow } from './TransferRow'
import { useUIContext } from '@screens/budget/context/UIContext'
import { useCurrentProject } from 'src/hooks'
import { EntityNoteRow } from '@screens/budget/components/EntityNoteRow'

interface EventTransferRowProps {
	transfer: ITransfer[]
	date: string
	id:
		| 'transfer_morningEvents'
		| 'transfer_afternoonEvents'
		| 'transfer_lunch'
		| 'transfer_dinner'
	selectedEvent: IEvent | IRestaurant
}

export const EventTransferRow = ({
	transfer = [],
	date,
	id,
	selectedEvent
}: EventTransferRowProps) => {
	const { showActionIcons } = useUIContext()
	const { updateTransferBudgetNote } = useCurrentProject()

	// Check if transfer is needed
	const transferIsNeeded =
		selectedEvent &&
		Array.isArray(selectedEvent.transfer) &&
		selectedEvent.transfer.length > 0

	if (!transferIsNeeded) return null

	// Get the first transfer item for assistance note
	const firstTransferItem = transfer[0]
	const assistanceIsNeeded = firstTransferItem?.assistance !== 0

	// State to track both existence and content of the note
	const [assistanceNote, setAssistanceNote] = useState({
		hasNote: !!(
			firstTransferItem?.assistanceBudgetNotes &&
			firstTransferItem?.assistanceBudgetNotes.trim() !== ''
		),
		content: firstTransferItem?.assistanceBudgetNotes || ''
	})

	// Update state when firstTransferItem changes
	useEffect(() => {
		if (firstTransferItem) {
			setAssistanceNote({
				hasNote: !!(
					firstTransferItem.assistanceBudgetNotes &&
					firstTransferItem.assistanceBudgetNotes.trim() !== ''
				),
				content: firstTransferItem.assistanceBudgetNotes || ''
			})
		}
	}, [firstTransferItem])

	// Extract transfer type for note context
	const transferType = id.split('_')[1]

	// Handlers for assistance note operations
	const handleAssistanceNoteAdded = (newNote: string) => {
		// Update local state first (don't modify the original object)
		setAssistanceNote({
			hasNote: true,
			content: newNote
		})

		// Then update in Redux
		updateTransferBudgetNote({
			timeOfEvent: id as any,
			transferId: firstTransferItem._id,
			budgetNotes: newNote,
			transferType: 'assistance',
			date
		})
	}

	const handleAssistanceNoteDeleted = () => {
		// Update local state first
		setAssistanceNote({
			hasNote: false,
			content: ''
		})

		// Then update in Redux
		updateTransferBudgetNote({
			timeOfEvent: id as any,
			transferId: firstTransferItem._id,
			budgetNotes: '',
			transferType: 'assistance',
			date
		})
	}

	const handleAssistanceNoteEdited = (newNote: string) => {
		// Update local state first
		setAssistanceNote({
			hasNote: !!newNote.trim(),
			content: newNote
		})

		// Then update in Redux
		updateTransferBudgetNote({
			timeOfEvent: id as any,
			transferId: firstTransferItem._id,
			budgetNotes: newNote,
			transferType: 'assistance',
			date
		})
	}

	return (
		<>
			{assistanceIsNeeded && (
				<>
					<AssistanceRow
						firstItem={firstTransferItem}
						date={date}
						description="On Board Assistance"
						id={id}
						idRestaunrantOrActivity={selectedEvent._id}
						showNoteIcon={showActionIcons}
						onNoteAdded={handleAssistanceNoteAdded}
						currentNote={assistanceNote.content}
					/>

					{/* Render note row if hasNote is true - using local state */}
					{assistanceNote.hasNote && assistanceNote.content && (
						<EntityNoteRow
							note={assistanceNote.content}
							entityId={firstTransferItem._id || ''}
							entityName="On-board Assistance"
							entityType="transfer"
							entitySubtype={`assistance_${transferType}`}
							date={date}
							onNoteDeleted={handleAssistanceNoteDeleted}
							onNoteEdited={handleAssistanceNoteEdited}
							borderColor="green"
							iconColor="green"
						/>
					)}
				</>
			)}
			<TransferRow
				options={transfer}
				date={date}
				description="Transfer Service"
				id={id}
				selectedEvent={selectedEvent}
			/>
		</>
	)
}
