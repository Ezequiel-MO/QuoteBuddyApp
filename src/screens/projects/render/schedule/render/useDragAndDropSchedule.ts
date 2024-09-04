import { useEffect, useState } from 'react'
import {
	DragEndEvent,
	DragMoveEvent,
	DragStartEvent,
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
import { IEvent } from '@interfaces/event'
import { IRestaurant } from '@interfaces/restaurant'
import { IDay, IActivity, IMeal } from '@interfaces/index'

export const useDragAndDropSchedule = () => {
	const { currentProject, dragAndDropEvent, dragAndDropRestaurant } =
		useCurrentProject()
	const { schedule, arrivalDay, departureDay } = currentProject

	// Initialize state with default values to avoid undefined issues
	const [events, setEvents] = useState<IDay[]>(() => {
		return currentProject.schedule.map((day) => ({
			...day,
			morningEvents: day.morningEvents || {
				intro: '',
				events: [],
				restaurants: []
			},
			afternoonEvents: day.afternoonEvents || {
				intro: '',
				events: [],
				restaurants: []
			},
			lunch: day.lunch || { intro: '', events: [], restaurants: [] },
			dinner: day.dinner || { intro: '', events: [], restaurants: [] }
		}))
	})

	const [activeId, setActiveId] = useState<IEvent | IRestaurant | null>(null)

	useEffect(() => {
		setEvents(schedule)
	}, [schedule, arrivalDay, departureDay])

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(MouseSensor),
		useSensor(TouchSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	const getRelevantList = (eventTypeList: any, activeKey: string) => {
		return Array.isArray(eventTypeList)
			? eventTypeList
			: activeKey === 'events'
			? eventTypeList?.events
			: eventTypeList?.restaurants
	}

	const handleDragStart = (dragEvent: DragStartEvent) => {
		const { activeDraggableId, activeEventType, activeDayIndex, activeKey } =
			getDraggableInfo(dragEvent)
		const eventTypeList = events[activeDayIndex][activeEventType]
		const relevantList = getRelevantList(eventTypeList, activeKey)
		const foundEvent = relevantList.find(
			(el: IEvent | IRestaurant) => el._id === activeDraggableId
		)
		setActiveId(foundEvent || null)
	}

	const handleDragOver = (dragEvent: DragMoveEvent) => {
		const draggableInfo = getDraggableInfo(dragEvent)
		const hoveredInfo = getHoveredInfo(dragEvent)

		if (!hoveredInfo) {
			return // Exit early if hoveredInfo is null
		}

		const {
			activeDraggable,
			activeDraggableId,
			activeEventType,
			activeDayIndex,
			activeKey
		} = draggableInfo
		const {
			hoverItem,
			hoverItemId,
			hoveredEventType,
			hoveredEventDayIndex,
			hoveredKey
		} = hoveredInfo

		if (
			activeDraggableId === hoverItemId ||
			(activeEventType === hoveredEventType &&
				activeDayIndex === hoveredEventDayIndex)
		) {
			return
		}

		if (activeId && activeKey === 'events' && hoveredKey === 'events') {
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

		if (
			activeId &&
			activeKey === 'restaurants' &&
			hoveredKey === 'restaurants'
		) {
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

	const getEventIndex = (
		dayIndex: number,
		eventType: string,
		eventId: string,
		activeKey: string
	) => {
		const eventTypeList = events[dayIndex][eventType]
		const relevantList = getRelevantList(eventTypeList, activeKey)
		return relevantList.findIndex(
			(el: IEvent | IRestaurant) => el._id === eventId
		)
	}

	const handleDragEnd = (dragEvent: DragEndEvent) => {
		const draggableInfo = getDraggableInfo(dragEvent)
		const hoveredInfo = getHoveredInfo(dragEvent)

		if (!hoveredInfo) {
			setActiveId(null)
			return
		}

		const { activeDraggableId, activeEventType, activeDayIndex, activeKey } =
			draggableInfo
		const { hoverItemId, hoveredEventType, hoveredEventDayIndex, hoveredKey } =
			hoveredInfo

		if (activeKey !== hoveredKey) {
			setActiveId(null)
			return
		}

		if (activeId) {
			const newEvents = [...events]

			// Correct initialization for empty slots
			if (!newEvents[hoveredEventDayIndex][hoveredEventType]) {
				if (hoveredKey === 'events') {
					newEvents[hoveredEventDayIndex][hoveredEventType] = {
						intro: '',
						events: [] as IEvent[],
						restaurants: [] as IRestaurant[]
					} as IActivity & IMeal
				} else {
					newEvents[hoveredEventDayIndex][hoveredEventType] = {
						intro: '',
						events: [] as IEvent[],
						restaurants: [] as IRestaurant[]
					} as IActivity & IMeal
				}
				// Update state outside of the render cycle to avoid triggering hooks re-rendering
				setEvents(newEvents)
			}

			const getMovedArray = (
				array: (IEvent | IRestaurant)[],
				from: number,
				to: number
			) => {
				const result = [...array]
				const [removed] = result.splice(from, 1)
				result.splice(to, 0, removed)
				return result
			}

			const updateSchedule = (
				key: 'events' | 'restaurants',
				action: (arg: any) => void
			) => {
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
				const copyEvents = [...events]
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
