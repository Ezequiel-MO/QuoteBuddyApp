import React, { useState, useEffect, useRef } from 'react'
import { TransferCells } from './TransferCells'
import { ITransfer, IEvent, IRestaurant } from '../../../../../interfaces/'
import { tableCellClasses, tableRowClasses } from '@constants/styles/listStyles'
import { useUIContext } from '@screens/budget/context/UIContext'
import { NoteActionIcon } from '@screens/budget/components/NoteActionIcon'
import { EntityNoteRow } from '@screens/budget/components/EntityNoteRow'
import { useCurrentProject } from 'src/hooks'

interface TransferRowProps {
	date: string
	options: ITransfer[]
	description: string
	id:
		| 'transfer_morningEvents'
		| 'transfer_afternoonEvents'
		| 'transfer_lunch'
		| 'transfer_dinner'
		| 'transfer_morningItinerary'
		| 'transfer_afternoonItinerary'
	selectedEvent: IEvent | IRestaurant
}

export const TransferRow: React.FC<TransferRowProps> = ({
	date,
	options,
	description,
	id,
	selectedEvent
}) => {
	const { showActionIcons } = useUIContext()
	const { updateTransferBudgetNote, currentProject } = useCurrentProject()

	// Extract the transfer type from id
	const transferType = id.split('_')[1] || ''

	// Group options by service and id
	const groupedOptions = options.reduce((acc, option) => {
		const service = option.selectedService
		const id = option._id
		if (id) {
			if (acc[id + service]) {
				acc[id + service].count += 1
			} else {
				acc[id + service] = {
					...option,
					count: 1
				}
			}
		}
		return acc
	}, {} as { [key: string]: ITransfer & { count: number } })

	const groupedOptionsArray = Object.values(groupedOptions)

	// State to track notes for each transfer
	const [noteStates, setNoteStates] = useState<
		Record<string, { hasNote: boolean; content: string }>
	>({})

	// Setup initial note states
	useEffect(() => {
		const newNoteStates: Record<string, { hasNote: boolean; content: string }> =
			{}

		groupedOptionsArray.forEach((group) => {
			const noteContent = group.budgetNotes || ''
			newNoteStates[group._id] = {
				hasNote: !!noteContent.trim(),
				content: noteContent
			}
		})

		setNoteStates(newNoteStates)
	}, [
		JSON.stringify(
			groupedOptionsArray.map((g) => ({ id: g._id, note: g.budgetNotes }))
		)
	])

	// Force re-render on Redux state changes
	const forceUpdate = useRef(0)

	useEffect(() => {
		// This will increment every time the project changes
		forceUpdate.current += 1
	}, [currentProject])

	return (
		<>
			{groupedOptionsArray.map((group) => {
				// Handlers for note operations
				const handleNoteAdded = (newNote: string) => {
					// Update local state for immediate UI response
					setNoteStates((prev) => ({
						...prev,
						[group._id]: {
							hasNote: true,
							content: newNote
						}
					}))

					// Update in Redux
					updateTransferBudgetNote({
						timeOfEvent: id as any,
						transferId: group._id,
						budgetNotes: newNote,
						transferType: 'main',
						date
					})
				}

				const handleNoteDeleted = () => {
					// Update local state for immediate UI response
					setNoteStates((prev) => ({
						...prev,
						[group._id]: {
							hasNote: false,
							content: ''
						}
					}))

					// Update in Redux
					updateTransferBudgetNote({
						timeOfEvent: id as any,
						transferId: group._id,
						budgetNotes: '',
						transferType: 'main',
						date
					})
				}

				const handleNoteEdited = (newNote: string) => {
					// Update local state for immediate UI response
					setNoteStates((prev) => ({
						...prev,
						[group._id]: {
							hasNote: !!newNote.trim(),
							content: newNote
						}
					}))

					// Update in Redux
					updateTransferBudgetNote({
						timeOfEvent: id as any,
						transferId: group._id,
						budgetNotes: newNote,
						transferType: 'main',
						date
					})
				}

				// Get the note state for this group
				const noteState = noteStates[group._id] || {
					hasNote: false,
					content: ''
				}

				return (
					<React.Fragment
						key={`${group._id}_${group.selectedService}_${forceUpdate.current}`}
					>
						<tr className="hover:bg-gray-700/20 transition-colors duration-150 group">
							<td className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis"></td>
							<TransferCells
								description={description}
								date={date}
								option={group}
								count={group.count}
								id={id}
								selectedEvent={selectedEvent}
								showNoteIcon={showActionIcons}
								onNoteAdded={handleNoteAdded}
								currentNote={noteState.content}
							/>
						</tr>

						{/* Render note row if hasNote is true - using local state */}
						{noteState.hasNote && noteState.content && (
							<EntityNoteRow
								note={noteState.content}
								entityId={group._id || ''}
								entityName={`Transfer: ${group.vehicleType} (${group.vehicleCapacity} seater)`}
								entityType="transfer"
								entitySubtype={transferType}
								date={date}
								onNoteDeleted={handleNoteDeleted}
								onNoteEdited={handleNoteEdited}
								borderColor="green"
								iconColor="green"
							/>
						)}
					</React.Fragment>
				)
			})}
		</>
	)
}
