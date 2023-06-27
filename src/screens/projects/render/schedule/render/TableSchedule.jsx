import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../helper/toast'
import { useCurrentProject } from '../../../../../hooks'
import { TableHeaders } from '../../../../../ui'

import {
	DndContext,
	DragOverlay,
	closestCorners,
	useSensor,
	useSensors,
	MouseSensor,
	TouchSensor,
	PointerSensor,
	KeyboardSensor
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { EventActivate } from './card/EventActivate'
import { ScheduleTableRow } from './ScheduleTableRow'

export const TableSchedule = () => {
	const { currentProject, removeEventFromSchedule, dragAndDropEvent } =
		useCurrentProject()
	const { updatedAt } = currentProject

	const legacyProject = updatedAt < '2023-06-15T11:52:28.691Z'

	const handleDeleteEvent = (dayOfEvent, timeOfEvent, eventId) => {
		removeEventFromSchedule({ dayOfEvent, timeOfEvent, eventId })
		toast.success('Event Removed', toastOptions)
	}

	//prueba dnd kit
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(MouseSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	const [events, setEvents] = useState([])
	const [activeId, setActiveId] = useState()

	useEffect(() => {
		setEvents(currentProject.schedule)
	}, [currentProject.schedule])

	const handleDragStart = (e) => {
		const { active } = e
		const { id } = active
		const [nameEventActivate, dayIndexActivate] =
			active.data.current.sortable.containerId.split('-')
		const findEvent = events[dayIndexActivate][nameEventActivate].find(
			(el) => el._id === id
		)
		setActiveId(findEvent)
	}

	const handleDragOver = (e) => {
		const { active, over } = e
		if (!active || !over) {
			return
		}
		const [nameEventActivate, dayIndexActivate] =
			active.data.current.sortable.containerId.split('-')
		const [nameEventOver, dayIndexOver] = over.data.current
			? over.data.current.sortable.containerId.split('-')
			: over.id.split('-')
		if (
			active.id === over.id ||
			(nameEventActivate === nameEventOver && dayIndexActivate === dayIndexOver)
		) {
			return
		}
		const namesEvents = ['morningEvents', 'afternoonEvents']
		if (
			namesEvents.includes(nameEventActivate) &&
			namesEvents.includes(nameEventOver)
		) {
			setEvents((prevEvents) => {
				const newEvents = JSON.parse(JSON.stringify(prevEvents)) // Creamos una copia profunda de prevEvents
				const filtrado = newEvents[dayIndexActivate][nameEventActivate].filter(
					(el) => el._id !== active.id
				)
				let newIndex = newEvents[dayIndexOver][nameEventOver].findIndex(
					(el) => el._id === over.id
				)
				newIndex = newIndex >= 0 ? newIndex : 0
				let sourceArray = [...newEvents[dayIndexOver][nameEventOver]]
				const [elementEvent] = sourceArray.splice(newIndex, 1)
				sourceArray.splice(newIndex, 0, activeId)
				elementEvent && sourceArray.splice(newIndex, 0, elementEvent)
				newEvents[dayIndexActivate][nameEventActivate] = filtrado
				newEvents[dayIndexOver][nameEventOver] = sourceArray
				return newEvents
			})
		}
	}

	const handleDragEnd = (e) => {
		const { active, over } = e
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
			//REDUCER PARA EL DRAG AND DROP EVENTS
			dragAndDropEvent({
				newSchedule: copyEvents
			})
		}
		setActiveId(null)
	}

	return (
		<table className="table-auto border-collapse border-2 border-white-0 text-white-0">
			<TableHeaders headers="projectBase" />
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
