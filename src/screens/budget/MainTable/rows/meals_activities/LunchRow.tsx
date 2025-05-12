// src/screens/budget/MainTable/rows/meals_activities/LunchRow.tsx
import { useEffect, useState } from 'react'
import { OptionSelect } from '../../multipleOrSingle'
import { IEvent, IRestaurant } from '../../../../../interfaces'
import { tableCellClasses, tableRowClasses } from '@constants/styles/listStyles'
import { EditableCell } from './EditableCell'
import { VenueBreakdownRows } from '../venue'
import accounting from 'accounting'
import { getVenuesCost } from 'src/helper/budget/getVenuesCost'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getDayIndex, existRestaurant } from '../../../helpers'
import { useCurrentProject } from 'src/hooks'
import { NoteActionIcon } from '@screens/budget/components/NoteActionIcon'
import { useUIContext } from '@screens/budget/context/UIContext'
import { EntityNoteRow } from '@screens/budget/components/EntityNoteRow'
import {
	UpdateLunchRestaurantPayload,
	UpdateProgramMealsCostPayload
} from 'src/redux/features/currentProject/types'

interface LunchRowProps {
	items: IRestaurant[]
	date: string
	pax: number
	selectedEvent: IRestaurant
	setSelectedEvent: React.Dispatch<React.SetStateAction<IEvent | IRestaurant>>
}

export const LunchRow = ({
	items,
	date,
	pax,
	selectedEvent,
	setSelectedEvent
}: LunchRowProps) => {
	const mySwal = withReactContent(Swal)
	const { showActionIcons } = useUIContext()

	// Unified approach - use our hook pattern for state management
	const [hasNote, setHasNote] = useState(
		!!(selectedEvent?.budgetNotes && selectedEvent.budgetNotes.trim() !== '')
	)

	// Update hasNote when selectedEvent changes
	useEffect(() => {
		setHasNote(
			!!(selectedEvent?.budgetNotes && selectedEvent.budgetNotes.trim() !== '')
		)
	}, [selectedEvent])

	const NoLunch = items.length === 0
	if (NoLunch) return null

	const {
		currentProject,
		updateBudgetProgramMealsCost,
		updateLunchRestaurant
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
			type: 'lunch'
		}
		updateBudgetProgramMealsCost(payload)
	}, [NoLunch, date, selectedEvent])

	const dayIndex = getDayIndex(date, currentProject.schedule.length)
	const originalRestaurant = currentProject?.schedule[
		dayIndex
	]?.lunch.restaurants.find((el) => el?._id === selectedEvent?._id)

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
			const isRestaurant = existRestaurant(
				dayIndex,
				currentProject,
				'lunch',
				selectedEvent._id
			)
			if (!isRestaurant) {
				throw Error('restaurant not found')
			}
			const payload: UpdateLunchRestaurantPayload = {
				value: newValue ? newValue : 1,
				dayIndex,
				id: selectedEvent._id,
				key: typeValue === 'unit' ? 'participants' : 'price'
			}
			updateLunchRestaurant(payload)
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

	const [venueCost, setVenueCost] = useState(getVenuesCost(selectedEvent))
	useEffect(() => {
		const restaurant = currentProject?.schedule[
			dayIndex
		]?.lunch?.restaurants?.find(
			(el: IRestaurant) => el?._id === selectedEvent?._id
		)
		if (restaurant) {
			setVenueCost(getVenuesCost(restaurant))
		}
	}, [currentProject])

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
				<td className={`${tableCellClasses} min-w-[200px] text-gray-100`}>
					Lunch Restaurants
				</td>
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
								: accounting.formatMoney(venueCost, '€')}
						</span>

						{/* Use our new NoteActionIcon component */}
						{showActionIcons && selectedEvent && (
							<NoteActionIcon
								entityId={selectedEvent._id || ''}
								entityName={`Restaurant: ${selectedEvent.name}`}
								entityType="restaurant"
								entitySubtype="lunch"
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

			{/* Use our new EntityNoteRow component */}
			{hasNote && selectedEvent?.budgetNotes && (
				<EntityNoteRow
					note={selectedEvent.budgetNotes}
					entityId={selectedEvent._id || ''}
					entityName={selectedEvent.name}
					entityType="restaurant"
					entitySubtype="lunch"
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
					id="lunch"
					venue={selectedEvent}
					units={selectedEvent?.participants || pax}
				/>
			)}
		</>
	)
}
