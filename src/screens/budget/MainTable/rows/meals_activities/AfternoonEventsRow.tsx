import { useEffect, useState } from 'react'
import { IEvent, IRestaurant } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import accounting from 'accounting'
import { OptionSelect } from '../../../MainTable/multipleOrSingle/OptionSelect'
import { EditableCell } from './EditableCell'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getDayIndex, existActivity } from '../../../helpers'
import { useCurrentProject } from 'src/hooks'
import {
	UpdateAfternoonActivityPayload,
	UpdateProgramActivitiesCostPayload
} from 'src/redux/features/currentProject/types'
import { ActionIcon } from '../../../components/ActionIcon'
import { useUIContext } from '../../../context/UIContext'
import { EventNoteRow } from '@screens/budget/components/EventNoteRow'

interface Props {
	items: IEvent[]
	date: string
	pax: number
	selectedEvent: IEvent
	setSelectedEvent: React.Dispatch<React.SetStateAction<IEvent | IRestaurant>>
}

export const AfternoonEventsRow = ({
	items,
	date,
	pax,
	selectedEvent,
	setSelectedEvent
}: Props) => {
	const mySwal = withReactContent(Swal)
	const { showActionIcons } = useUIContext()

	// Local state to track whether the note exists
	const [hasNote, setHasNote] = useState(
		!!(selectedEvent?.budgetNotes && selectedEvent.budgetNotes.trim() !== '')
	)

	// Update hasNote when selectedEvent changes
	useEffect(() => {
		setHasNote(
			!!(selectedEvent?.budgetNotes && selectedEvent.budgetNotes.trim() !== '')
		)
	}, [selectedEvent])

	const NoEvents = items.length === 0
	if (NoEvents) return null

	const {
		currentProject,
		updateBudgetProgramActivitiesCost,
		updateAfternoonActivity
	} = useCurrentProject()

	const [nrUnits, setNrUnits] = useState(
		selectedEvent?.pricePerPerson ? selectedEvent?.participants || pax : 1
	)
	useEffect(() => {
		setNrUnits(
			selectedEvent?.pricePerPerson ? selectedEvent?.participants || pax : 1
		)
	}, [selectedEvent])

	useEffect(() => {
		const payload: UpdateProgramActivitiesCostPayload = {
			date,
			activity: selectedEvent ? selectedEvent : null,
			pax: selectedEvent?.participants || pax,
			type: 'afternoon'
		}
		updateBudgetProgramActivitiesCost(payload)
	}, [date, selectedEvent])

	const dayIndex = getDayIndex(date, currentProject.schedule.length)
	const originalActivity = currentProject?.schedule[
		dayIndex
	].afternoonEvents.events.find((el) => el._id === selectedEvent?._id)

	const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
		const newValue = e.target.value as string
		const newSelectedEvent =
			items && items.find((item) => item.name === newValue)
		if (newSelectedEvent) {
			setSelectedEvent(newSelectedEvent)
			// Update the note state when changing events
			setHasNote(
				!!(
					newSelectedEvent.budgetNotes &&
					newSelectedEvent.budgetNotes.trim() !== ''
				)
			)
		}
	}

	const handleUpdate = async (
		newValue: number,
		typeValue: 'unit' | 'price'
	) => {
		try {
			if (typeValue === 'unit' && newValue > pax) {
				throw Error('Cannot be greater than the total number of passengers.')
			}
			let dayIndex = getDayIndex(date, currentProject.schedule.length)
			const isActivity = existActivity(
				dayIndex,
				currentProject,
				'afternoonEvents',
				selectedEvent?._id
			)
			if (!isActivity) {
				throw Error('Activity not found')
			}
			const payload: UpdateAfternoonActivityPayload = {
				value: newValue ? newValue : 1,
				dayIndex,
				id: selectedEvent._id,
				key: typeValue === 'unit' ? 'participants' : 'price'
			}
			updateAfternoonActivity(payload)
			const key = typeValue === 'unit' ? 'participants' : 'price'
			const copySelectedEvent = { ...selectedEvent }
			copySelectedEvent[key] = newValue ? newValue : 1
			setSelectedEvent(copySelectedEvent)
		} catch (error: any) {
			console.log(error)
			await mySwal.fire({
				title: 'Error!',
				text: error?.message,
				icon: 'error',
				confirmButtonColor: 'green',
				allowEnterKey: false
			})
		}
	}

	// Handle the note being deleted
	const handleNoteDeleted = () => {
		setHasNote(false)
	}

	// Handle the note being added
	const handleNoteAdded = () => {
		setHasNote(true)
	}

	// Handle the note being edited
	const handleNoteEdited = (newNote: string) => {
		setSelectedEvent({
			...selectedEvent,
			budgetNotes: newNote
		})
	}

	return (
		<>
			<tr
				className={`${tableRowClasses} group hover:bg-gray-700/20 transition-colors duration-150`}
			>
				<td className={tableCellClasses}></td>
				<td
					className={`${tableCellClasses} min-w-[200px] text-gray-100`}
				>{`Afternoon Event`}</td>
				<td className={tableCellClasses}>
					<OptionSelect
						options={items}
						value={selectedEvent?.name || ''}
						handleChange={(e) => handleSelectChange(e)}
					/>
				</td>
				<td className={tableCellClasses}>
					{selectedEvent?.pricePerPerson && (
						<EditableCell
							value={
								selectedEvent?.participants ? selectedEvent?.participants : pax
							}
							originalValue={originalActivity?.participants || pax}
							typeValue="unit"
							onSave={(newValue) => handleUpdate(newValue, 'unit')}
						/>
					)}
				</td>
				<td className={tableCellClasses}>
					<EditableCell
						value={selectedEvent?.price as number}
						originalValue={originalActivity?.price || 0}
						typeValue="price"
						onSave={(newValue) => handleUpdate(newValue, 'price')}
					/>
				</td>
				<td
					className={`${tableCellClasses} text-gray-100 px-2 py-1 min-w-[80px] flex items-center justify-between`}
				>
					<span>
						{accounting.formatMoney(
							(selectedEvent?.price as number) * nrUnits,
							'€'
						)}
					</span>
					{/* Action icon */}
					{showActionIcons && selectedEvent && (
						<ActionIcon
							entityName={`Event: ${selectedEvent.name}`}
							entityId={selectedEvent._id}
							entityType="event"
							eventType="afternoon"
							date={date}
							currentNote={selectedEvent.budgetNotes || ''}
							className="ml-2"
							onNoteAdded={handleNoteAdded}
						/>
					)}
				</td>
			</tr>
			{/* Render note row if hasNote is true */}
			{hasNote && selectedEvent?.budgetNotes && (
				<EventNoteRow
					note={selectedEvent.budgetNotes}
					eventId={selectedEvent._id}
					eventName={selectedEvent.name}
					eventType="afternoon"
					date={date}
					onNoteDeleted={handleNoteDeleted}
					onNoteEdited={handleNoteEdited}
				/>
			)}
		</>
	)
}
