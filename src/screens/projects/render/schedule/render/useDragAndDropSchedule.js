/* eslint-disable no-console */
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
import { getDraggableInfo, getHoveredInfo, updateFunc } from './helper'
import { useCurrentProject } from '../../../../../hooks'

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
		const { activeDraggableId, activeEventType, activeDayIndex } =
			getDraggableInfo(dragEvent)
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
		const {
			activeDraggable,
			activeDraggableId,
			activeEventType,
			activeDayIndex,
			activeKey
		} = getDraggableInfo(dragEvent)
		const {
			hoverItem,
			hoverItemId,
			hoveredEventType,
			hoveredEventDayIndex,
			hoveredKey
		} = getHoveredInfo(dragEvent)

		if (
			activeDraggableId === hoverItemId ||
			(activeEventType === hoveredEventType &&
				activeDayIndex === hoveredEventDayIndex)
		) {
			return
		}

		if (activeKey === 'events' && hoveredKey === 'events') {
			setEvents((prevActivities) => {
				const newActivities = updateFunc({
					prevEvents: prevActivities,
					activeDayIndex,
					activeEventType,
					hoveredEventDayIndex,
					hoveredEventType,
					activeDraggable,
					hoverItem,
					activeId,
					targetKey: 'events'
				})
				return newActivities
			})
		}

		if (activeKey === 'restaurants' && hoveredKey === 'restaurants') {
			setEvents((prevRestaurants) => {
				const newRestaurants = updateFunc({
					prevEvents: prevRestaurants,
					activeDayIndex,
					activeEventType,
					hoveredEventDayIndex,
					hoveredEventType,
					activeDraggable,
					hoverItem,
					activeId,
					targetKey: 'restaurants'
				})
				return newRestaurants
			})
		}
	}

	const getEventIndex = (dayIndex, eventType, eventId, isRestaurant) => {
		const eventTypeList = events[dayIndex][eventType]
		const list = Array.isArray(eventTypeList)
			? eventTypeList
			: isRestaurant
			? eventTypeList?.restaurants
			: eventTypeList?.events
		return list.findIndex((el) => el._id === eventId)
	}

	const handleDragEnd = (dragEvent) => {
		const { activeDraggableId, activeEventType, activeDayIndex, activeKey } =
			getDraggableInfo(dragEvent)
		const { hoverItemId, hoveredEventType, hoveredEventDayIndex, hoveredKey } =
			getHoveredInfo(dragEvent)

		if (activeKey === 'events' && hoveredKey === 'events') {
			const endEventIndex = getEventIndex(
				hoveredEventDayIndex,
				hoveredEventType,
				hoverItemId,
				false
			)
			const startEventIndex = getEventIndex(
				activeDayIndex,
				activeEventType,
				activeDraggableId,
				false
			)
			let copyEvents = [...events]
			copyEvents[hoveredEventDayIndex] = { ...copyEvents[hoveredEventDayIndex] }
			copyEvents[hoveredEventDayIndex][hoveredEventType] = arrayMove(
				copyEvents[hoveredEventDayIndex][hoveredEventType],
				startEventIndex,
				endEventIndex
			)
			if (
				activeEventType === hoveredEventType &&
				activeDayIndex === hoveredEventDayIndex
			) {
				setEvents(copyEvents)
			}

			dragAndDropEvent({
				newSchedule: copyEvents
			})
		}

		if (activeKey === 'restaurants' && hoveredKey === 'restaurants') {
			const keys = Object.keys(events[activeDayIndex][activeEventType])
			const hasRestaurants = keys.includes('restaurants')
			let copyEvents = []
			if (!hasRestaurants) {
				const endEventIndex = events[hoveredEventDayIndex][
					hoveredEventType
				].findIndex((el) => el._id === hoverItemId)
				const startEventIndex = events[activeDayIndex][
					activeEventType
				].findIndex((el) => el._id === activeDraggableId)
				copyEvents = [...events]
				copyEvents[hoveredEventDayIndex] = {
					...copyEvents[hoveredEventDayIndex]
				}
				copyEvents[hoveredEventDayIndex][hoveredEventType] = arrayMove(
					copyEvents[hoveredEventDayIndex][hoveredEventType],
					startEventIndex,
					endEventIndex
				)
			} else {
				const endEventIndex = events[hoveredEventDayIndex][
					hoveredEventType
				].restaurants.findIndex((el) => el._id === hoverItemId)
				const startEventIndex = events[activeDayIndex][
					activeEventType
				].restaurants.findIndex((el) => el._id === activeDraggableId)
				copyEvents = [...events]
				const end = [
					...copyEvents[hoveredEventDayIndex][hoveredEventType].restaurants
				]
				copyEvents[hoveredEventDayIndex] = {
					...copyEvents[hoveredEventDayIndex]
				}
				copyEvents[hoveredEventDayIndex][hoveredEventType] = {
					...copyEvents[hoveredEventDayIndex][hoveredEventType]
				}
				copyEvents[hoveredEventDayIndex][hoveredEventType].restaurants =
					arrayMove(end, startEventIndex, endEventIndex)
			}
			if (
				activeEventType === hoveredEventType &&
				activeDayIndex === hoveredEventDayIndex &&
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
