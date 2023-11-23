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
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
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

	const getRelevantList = (eventTypeList, activeKey) => {
		return Array.isArray(eventTypeList)
			? eventTypeList
			: activeKey === 'events'
			? eventTypeList?.events
			: eventTypeList?.restaurants
	}

	const handleDragStart = (dragEvent) => {
		const { activeDraggableId, activeEventType, activeDayIndex, activeKey } =
			getDraggableInfo(dragEvent)
		const eventTypeList = events[activeDayIndex][activeEventType]
		const relevantList = getRelevantList(eventTypeList, activeKey)
		const foundEvent = relevantList.find((el) => el._id === activeDraggableId)
		setActiveId(foundEvent)
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

	const getEventIndex = (dayIndex, eventType, eventId, activeKey) => {
		const eventTypeList = events[dayIndex][eventType]
		const relevantList = getRelevantList(eventTypeList, activeKey)
		return relevantList.findIndex((el) => el._id === eventId)
	}

	const handleDragEnd = (dragEvent) => {
		const { activeDraggableId, activeEventType, activeDayIndex, activeKey } =
			getDraggableInfo(dragEvent)
		const { hoverItemId, hoveredEventType, hoveredEventDayIndex, hoveredKey } =
			getHoveredInfo(dragEvent)
		if (activeKey !== hoveredKey) {
			setActiveId(null)
			return
		}
		const copyEvents = [...events]
		const getMovedArray = (array, from, to) => {
			const result = [...array]
			const [removed] = result.splice(from, 1)
			result.splice(to, 0, removed)
			return result
		}
		const updateSchedule = (key, action) => {
			const startEventIndex = getEventIndex(
				activeDayIndex,
				activeEventType,
				activeDraggableId,
				activeKey
			)
			const endEventIndex = getEventIndex(
				hoveredEventDayIndex,
				hoveredEventType,
				hoverItemId,
				hoveredKey
			)
			copyEvents[activeDayIndex] = {
				...copyEvents[activeDayIndex],
				[activeEventType]: {
					...copyEvents[activeDayIndex][activeEventType],
					[key]: getMovedArray(
						copyEvents[activeDayIndex][activeEventType][key],
						startEventIndex,
						endEventIndex
					)
				}
			}
			if (
				activeEventType === hoveredEventType &&
				activeDayIndex === hoveredEventDayIndex
			) {
				setEvents(copyEvents)
			}
			action({ newSchedule: copyEvents })
		}
		if (activeKey === 'events') {
			updateSchedule('events', dragAndDropEvent)
		} else if (activeKey === 'restaurants') {
			updateSchedule('restaurants', dragAndDropRestaurant)
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
