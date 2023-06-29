import { useEffect, useState } from 'react'
import {
	KeyboardSensor,
	MouseSensor,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { updateRestaurants } from './helper'
import { useCurrentProject } from '../../../../../hooks'

const EVENT_TYPES_ACTIVITIES = ['morningEvents', 'afternoonEvents']
const EVENT_TYPES_MEALS = ['lunch', 'dinner']

export const useDragAndDropSchedule = () => {
	const [events, setEvents] = useState([])
	const [activeId, setActiveId] = useState()
	const { currentProject, dragAndDropEvent, dragAndDropRestaurant } =
		useCurrentProject()
	const { schedule, arrivalDate, departureDate } = currentProject

	useEffect(() => {
		setEvents(schedule)
	}, [schedule, arrivalDate, departureDate, setEvents])

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(MouseSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)
	const handleDragStart = (dragEvent) => {
		const { active: activeDraggable } = dragEvent
		if (!activeDraggable) {
			return
		}
		const {
			id: activeDraggableId,
			data: {
				current: {
					sortable: { containerId }
				}
			}
		} = activeDraggable
		const [activeEventType, activeDayIndex] = containerId.split('-')

		const eventTypeList = events[activeDayIndex][activeEventType]

		const restaurantTypeList = eventTypeList && eventTypeList.restaurants
		const relevantList = Array.isArray(eventTypeList)
			? eventTypeList
			: restaurantTypeList

		if (relevantList) {
			const foundEvent = relevantList.find((el) => el._id === activeDraggableId)
			setActiveId(foundEvent)
		} else {
			console.error(
				`Cannot find relevant list for activeEventType: ${activeEventType} and activeDayIndex: ${activeDayIndex}`
			)
		}
	}

	const handleDragOver = (dragEvent) => {
		const { active: activeDraggable, over: hoverItem } = dragEvent
		if (!activeDraggable || !hoverItem) {
			return
		}
		const {
			id: activeDraggableId,
			data: {
				current: {
					sortable: { containerId: activeContainerId }
				}
			}
		} = activeDraggable
		const { id: hoverItemId } = hoverItem
		const [activeEventType, activeDayIndex] = activeContainerId.split('-')
		const [hoveredEventType, hoveredEventDayIndex] = hoverItem.data.current
			? hoverItem.data.current.sortable.containerId.split('-')
			: hoverItemId.split('-')

		if (
			activeDraggableId === hoverItemId ||
			(activeEventType === hoveredEventType &&
				activeDayIndex === hoveredEventDayIndex)
		) {
			return
		}

		if (
			EVENT_TYPES_ACTIVITIES.includes(activeEventType) &&
			EVENT_TYPES_ACTIVITIES.includes(hoveredEventType)
		) {
			setEvents((prevEvents) => {
				const newEvents = JSON.parse(JSON.stringify(prevEvents))
				const eventFilter = newEvents[activeDayIndex][activeEventType].filter(
					(el) => el._id !== activeDraggableId
				)
				let newIndex = newEvents[hoveredEventDayIndex][
					hoveredEventType
				].findIndex((el) => el._id === hoverItemId)
				newIndex = newIndex >= 0 ? newIndex : 0
				let sourceArray = [...newEvents[hoveredEventDayIndex][hoveredEventType]]
				const [elementEvent] = sourceArray.splice(newIndex, 1)
				sourceArray.splice(newIndex, 0, activeId)
				elementEvent && sourceArray.splice(newIndex, 0, elementEvent)
				newEvents[activeDayIndex][activeEventType] = eventFilter
				newEvents[hoveredEventDayIndex][hoveredEventType] = sourceArray
				return newEvents
			})
		}

		if (
			EVENT_TYPES_MEALS.includes(activeEventType) &&
			EVENT_TYPES_MEALS.includes(hoveredEventType)
		) {
			setEvents((prevRestaurants) => {
				const newRestaurants = updateRestaurants({
					prevEvents: prevRestaurants,
					activeDayIndex,
					activeEventType,
					hoveredEventDayIndex,
					hoveredEventType,
					activeDraggable,
					hoverItem,
					activeId
				})
				return newRestaurants
			})
		}
	}

	const handleDragEnd = (dragEvent) => {
		const { active: activeDraggable, over: hoverItem } = dragEvent
		if (!hoverItem) {
			return
		}
		const {
			id: activeDraggableId,
			data: {
				current: {
					sortable: { containerId: activeContainerId }
				}
			}
		} = activeDraggable
		const { id: hoverItemId } = hoverItem
		const [activeEventType, activeDayIndex] = activeContainerId.split('-')
		const [hoveredEventType, dayIndexOver] = hoverItem.data.current
			? hoverItem.data.current.sortable.containerId.split('-')
			: hoverItemId.split('-')

		if (
			EVENT_TYPES_ACTIVITIES.includes(activeEventType) &&
			EVENT_TYPES_ACTIVITIES.includes(hoveredEventType)
		) {
			const endEventIndex = events[dayIndexOver][hoveredEventType].findIndex(
				(el) => el._id === hoverItemId
			)
			const startEventIndex = events[activeDayIndex][activeEventType].findIndex(
				(el) => el._id === activeDraggableId
			)
			let copyEvents = [...events]
			copyEvents[dayIndexOver] = { ...copyEvents[dayIndexOver] }
			copyEvents[dayIndexOver][hoveredEventType] = arrayMove(
				copyEvents[dayIndexOver][hoveredEventType],
				startEventIndex,
				endEventIndex
			)
			if (
				activeEventType === hoveredEventType &&
				activeDayIndex === dayIndexOver
			) {
				setEvents(copyEvents)
			}

			dragAndDropEvent({
				newSchedule: copyEvents
			})
		}

		if (
			EVENT_TYPES_MEALS.includes(activeEventType) &&
			EVENT_TYPES_MEALS.includes(hoveredEventType)
		) {
			const keys = Object.keys(events[activeDayIndex][activeEventType])
			const hasRestaurants = keys.includes('restaurants')
			let copyEvents = []
			if (!hasRestaurants) {
				const endEventIndex = events[dayIndexOver][hoveredEventType].findIndex(
					(el) => el._id === hoverItemId
				)
				const startEventIndex = events[activeDayIndex][
					activeEventType
				].findIndex((el) => el._id === activeDraggableId)
				copyEvents = [...events]
				copyEvents[dayIndexOver] = { ...copyEvents[dayIndexOver] }
				copyEvents[dayIndexOver][hoveredEventType] = arrayMove(
					copyEvents[dayIndexOver][hoveredEventType],
					startEventIndex,
					endEventIndex
				)
			} else {
				const endEventIndex = events[dayIndexOver][
					hoveredEventType
				].restaurants.findIndex((el) => el._id === hoverItemId)
				const startEventIndex = events[activeDayIndex][
					activeEventType
				].restaurants.findIndex((el) => el._id === activeDraggableId)
				copyEvents = [...events]
				const end = [...copyEvents[dayIndexOver][hoveredEventType].restaurants]
				copyEvents[dayIndexOver] = { ...copyEvents[dayIndexOver] }
				copyEvents[dayIndexOver][hoveredEventType] = {
					...copyEvents[dayIndexOver][hoveredEventType]
				}
				copyEvents[dayIndexOver][hoveredEventType].restaurants = arrayMove(
					end,
					startEventIndex,
					endEventIndex
				)
			}
			if (
				activeEventType === hoveredEventType &&
				activeDayIndex === dayIndexOver &&
				copyEvents.length > 0
			) {
				setEvents(copyEvents)
			}
			dragAndDropRestaurant({
				newSchedule: copyEvents
			})
		}
		setActiveId(null)
	}

	return {
		events,
		activeId,
		sensors,
		handleDragStart,
		handleDragOver,
		handleDragEnd
	}
}
