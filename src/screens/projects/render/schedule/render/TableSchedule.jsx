import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../helper/toast'
import { useCurrentProject } from '../../../../../hooks'
import { TableHeaders } from '../../../../../ui'
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { EventActivate } from './card/EventActivate'
import { ScheduleTableRow } from './ScheduleTableRow'
import { useDragAndDropSchedule } from './useDragAndDropSchedule'

export const TableSchedule = () => {
	const [events, setEvents] = useState([])
	const [activeId, setActiveId] = useState()
	const { sensors, handleDragStart, handleDragOver } = useDragAndDropSchedule(
		events,
		setEvents,
		activeId,
		setActiveId
	)
	const {
		currentProject,
		removeEventFromSchedule,
		dragAndDropEvent,
		dragAndDropRestaurant
	} = useCurrentProject()

	const { updatedAt, schedule, arrivalDate, departureDate } = currentProject

	const legacyProject = updatedAt < '2023-06-15T11:52:28.691Z'

	const handleDeleteEvent = (dayOfEvent, timeOfEvent, eventId) => {
		removeEventFromSchedule({ dayOfEvent, timeOfEvent, eventId })
		toast.success('Event Removed', toastOptions)
	}

	const showFullDayMeetings = events.some(
		(event) => event.fullDayMeetings && event.fullDayMeetings.length > 0
	)

	useEffect(() => {
		setEvents(schedule)
	}, [schedule, arrivalDate, departureDate])

	const handleDragEnd = (e) => {
		const { active, over } = e
		if (!over) {
			return
		}
		const [nameEventActivate, dayIndexActivate] =
			active.data.current.sortable.containerId.split('-')
		const [nameEventOver, dayIndexOver] = over.data.current
			? over.data.current.sortable.containerId.split('-')
			: over.id.split('-') // sino se cumple es que es un array vacio
		const namesEvents = ['morningEvents', 'afternoonEvents']
		if (
			namesEvents.includes(nameEventActivate) &&
			namesEvents.includes(nameEventOver)
		) {
			const endEventIndex = events[dayIndexOver][nameEventOver].findIndex(
				(el) => el._id === over.id
			)
			const startEventIndex = events[dayIndexActivate][
				nameEventActivate
			].findIndex((el) => el._id === active.id)
			let copyEvents = [...events]
			copyEvents[dayIndexOver] = { ...copyEvents[dayIndexOver] }
			copyEvents[dayIndexOver][nameEventOver] = arrayMove(
				copyEvents[dayIndexOver][nameEventOver],
				startEventIndex,
				endEventIndex
			)
			if (
				nameEventActivate === nameEventOver &&
				dayIndexActivate === dayIndexOver
			) {
				setEvents(copyEvents)
			}
			//REDUCER PARA EL DRAG AND DROP EVENT
			dragAndDropEvent({
				newSchedule: copyEvents
			})
		}
		//SI ES UN RESTAUNRANT
		const nameRestaurants = ['lunch', 'dinner']
		if (
			nameRestaurants.includes(nameEventActivate) &&
			nameRestaurants.includes(nameEventOver)
		) {
			const keys = Object.keys(events[dayIndexActivate][nameEventActivate])
			const hasRestaurants = keys.includes('restaurants')
			let copyEvents = []
			if (!hasRestaurants) {
				const endEventIndex = events[dayIndexOver][nameEventOver].findIndex(
					(el) => el._id === over.id
				)
				const startEventIndex = events[dayIndexActivate][
					nameEventActivate
				].findIndex((el) => el._id === active.id)
				copyEvents = [...events]
				copyEvents[dayIndexOver] = { ...copyEvents[dayIndexOver] }
				copyEvents[dayIndexOver][nameEventOver] = arrayMove(
					copyEvents[dayIndexOver][nameEventOver],
					startEventIndex,
					endEventIndex
				)
			} else {
				const endEventIndex = events[dayIndexOver][
					nameEventOver
				].restaurants.findIndex((el) => el._id === over.id)
				const startEventIndex = events[dayIndexActivate][
					nameEventActivate
				].restaurants.findIndex((el) => el._id === active.id)
				copyEvents = [...events]
				const end = [...copyEvents[dayIndexOver][nameEventOver].restaurants]
				copyEvents[dayIndexOver] = { ...copyEvents[dayIndexOver] }
				copyEvents[dayIndexOver][nameEventOver] = {
					...copyEvents[dayIndexOver][nameEventOver]
				}
				copyEvents[dayIndexOver][nameEventOver].restaurants = arrayMove(
					end,
					startEventIndex,
					endEventIndex
				)
			}
			if (
				nameEventActivate === nameEventOver &&
				dayIndexActivate === dayIndexOver &&
				copyEvents.length > 0
			) {
				setEvents(copyEvents)
			}
			//REDUCER PARA EL DRAG AND DROP RESTAURANT
			dragAndDropRestaurant({
				newSchedule: copyEvents
			})
		}
		setActiveId(null)
	}

	return (
		<table className="table-auto border-collapse border-2 border-white-0 text-white-0">
			<TableHeaders
				headers="projectBase"
				showFullDayMeetings={showFullDayMeetings}
			/>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCorners}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
			>
				<tbody>
					{events?.map((day, index) => (
						<ScheduleTableRow
							key={day._id}
							day={day}
							index={index}
							handleDeleteEvent={handleDeleteEvent}
							legacyProject={legacyProject}
						/>
					))}
				</tbody>
				<DragOverlay>
					{activeId ? (
						<EventActivate
							event={activeId}
							key={activeId._id}
							id={activeId._id}
						/>
					) : null}
				</DragOverlay>
			</DndContext>
		</table>
	)
}
