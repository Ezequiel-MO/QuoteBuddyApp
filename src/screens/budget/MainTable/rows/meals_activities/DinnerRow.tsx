// src/screens/budget/MainTable/rows/meals_activities/DinnerRow.tsx
import { useEffect, useState } from 'react'
import { OptionSelect } from '../../multipleOrSingle'
import { IEvent, IRestaurant } from '../../../../../interfaces'
import { VenueBreakdownRows } from '../venue'
import { tableCellClasses, tableRowClasses } from 'src/constants/listStyles'
import { EditableCell } from './EditableCell'
import accounting from 'accounting'
import { getVenuesCost } from 'src/helper/budget/getVenuesCost'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getDayIndex } from '../../../helpers'
import { useCurrentProject } from 'src/hooks'
import { useUIContext } from '../../../context/UIContext'
import {
	UpdateDinnerRestaurantPayload,
	UpdateProgramMealsCostPayload
} from 'src/redux/features/currentProject/types'
import { NoteActionIcon } from '@screens/budget/components/NoteActionIcon'
import { EntityNoteRow } from '@screens/budget/components/EntityNoteRow'

interface DinnerRowProps {
	items: IRestaurant[]
	date: string
	pax: number
	selectedEvent: IRestaurant
	setSelectedEvent: React.Dispatch<React.SetStateAction<IEvent | IRestaurant>>
}

export const DinnerRow = ({
	items,
	date,
	pax,
	selectedEvent,
	setSelectedEvent
}: DinnerRowProps) => {
	const mySwal = withReactContent(Swal)
	const { showActionIcons } = useUIContext()

	// Local state to track whether the note exists or has been deleted
	const [hasNote, setHasNote] = useState(
		!!(selectedEvent?.budgetNotes && selectedEvent.budgetNotes.trim() !== '')
	)

	// Update hasNote when selectedEvent changes
	useEffect(() => {
		setHasNote(
			!!(selectedEvent?.budgetNotes && selectedEvent.budgetNotes.trim() !== '')
		)
	}, [selectedEvent])

	const NoDinner = items.length === 0
	if (NoDinner) return null

	const {
		currentProject,
		updateBudgetProgramMealsCost,
		updateDinnerRestaurant
	} = useCurrentProject()

	const [nrUnits, setNrUnits] = useState(selectedEvent?.participants || pax)
	useEffect(() => {
		setNrUnits(selectedEvent?.participants || pax)
	}, [selectedEvent])

	useEffect(() => {
		const payload: UpdateProgramMealsCostPayload = {
			date,
			restaurant: selectedEvent ? selectedEvent : null,
			pax: selectedEvent?.participants || pax,
			type: 'dinner'
		}
		updateBudgetProgramMealsCost(payload)
	}, [NoDinner, date, selectedEvent])

	const dayIndex = getDayIndex(date, currentProject.schedule.length)
	const originalRestaurant = currentProject?.schedule[
		dayIndex
	]?.dinner?.restaurants?.find((el) => el?._id === selectedEvent?._id)

	const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
		const newValue = e.target.value as string
		const newSelectedEvent =
			items && items.find((item) => item?.name === newValue)
		if (newSelectedEvent) {
			setSelectedEvent(newSelectedEvent)
			// Update the note state when changing restaurants
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
			const payload: UpdateDinnerRestaurantPayload = {
				value: newValue ? newValue : 1,
				dayIndex,
				id: selectedEvent._id,
				key: typeValue === 'unit' ? 'participants' : 'price'
			}
			updateDinnerRestaurant(payload)
			const key = typeValue === 'unit' ? 'participants' : 'price'
			const copySelectedEvent = { ...selectedEvent }
			copySelectedEvent[key] = newValue ? newValue : 1
			setSelectedEvent(copySelectedEvent)
		} catch (error: any) {
			await mySwal.fire({
				title: 'Error!',
				text: error.message,
				icon: 'error',
				confirmButtonColor: 'green'
			})
		}
	}

	// FIXED: Improved handlers for note operations
	const handleNoteAdded = (newNote: string) => {
		setHasNote(true)
		setSelectedEvent((prev) => ({ ...prev, budgetNotes: newNote }))
	}

	const handleNoteDeleted = () => {
		setHasNote(false)
	}

	const handleNoteEdited = (newNote: string) => {
		setSelectedEvent((prev) => ({ ...prev, budgetNotes: newNote }))
	}

	return (
		<>
			<tr
				className={`${tableRowClasses} group hover:bg-gray-700/20 transition-colors duration-150`}
			>
				<td className={tableCellClasses}></td>
				<td
					className={`${tableCellClasses} min-w-[200px] text-gray-100`}
				>{`Dinner Restaurants`}</td>
				<td className={`${tableCellClasses} flex items-center`}>
					<OptionSelect
						options={items}
						value={selectedEvent?.name || ''}
						handleChange={(e) => handleSelectChange(e)}
					/>
				</td>
				<td className={tableCellClasses}>
					{!selectedEvent?.isVenue && (
						<EditableCell
							value={
								selectedEvent?.participants ? selectedEvent?.participants : pax
							}
							originalValue={originalRestaurant?.participants || pax}
							typeValue="unit"
							onSave={(newValue) => handleUpdate(newValue, 'unit')}
						/>
					)}
				</td>
				<td className={tableCellClasses}>
					{!selectedEvent?.isVenue && (
						<EditableCell
							value={selectedEvent?.price as number}
							originalValue={originalRestaurant?.price || 0}
							typeValue="price"
							onSave={(newValue) => handleUpdate(newValue, 'price')}
						/>
					)}
				</td>
				<td className=" text-gray-100 px-16 py-1 min-w-[80px]">
					{/* FIXED: Improved positioning with flex layout */}
					<div className="flex items-center justify-center">
						<span>
							{!selectedEvent?.isVenue
								? accounting.formatMoney(
										Number(nrUnits * Number(selectedEvent?.price)),
										'€'
								  )
								: accounting.formatMoney(getVenuesCost(selectedEvent), '€')}
						</span>

						{/* Fixed note icon */}
						{showActionIcons && selectedEvent && (
							<NoteActionIcon
								entityId={selectedEvent._id || ''}
								entityName={`Restaurant: ${selectedEvent.name}`}
								entityType="restaurant"
								entitySubtype="dinner"
								date={date}
								currentNote={selectedEvent.budgetNotes || ''}
								className="ml-2"
								onNoteAdded={handleNoteAdded}
								iconColor="amber"
							/>
						)}
					</div>
				</td>
			</tr>

			{/* Render note row if hasNote is true */}
			{hasNote && selectedEvent?.budgetNotes && (
				<EntityNoteRow
					note={selectedEvent.budgetNotes}
					entityId={selectedEvent._id || ''}
					entityName={selectedEvent.name}
					entityType="restaurant"
					entitySubtype="dinner"
					date={date}
					onNoteDeleted={handleNoteDeleted}
					onNoteEdited={handleNoteEdited}
					borderColor="amber"
					iconColor="amber"
				/>
			)}

			{selectedEvent?.isVenue && (
				<VenueBreakdownRows
					date={date}
					id="dinner"
					venue={selectedEvent}
					units={pax}
				/>
			)}
		</>
	)
}
