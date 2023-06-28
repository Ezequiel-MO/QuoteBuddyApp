import {
	KeyboardSensor,
	MouseSensor,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { updateRestaurants } from './helper'

export const useDragAndDropSchedule = (
	events,
	setEvents,
	activeId,
	setActiveId
) => {
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
		//SI ES UN EVENT
		const namesEvents = ['morningEvents', 'afternoonEvents']
		if (
			namesEvents.includes(activeEventType) &&
			namesEvents.includes(hoveredEventType)
		) {
			setEvents((prevEvents) => {
				const newEvents = JSON.parse(JSON.stringify(prevEvents)) // Creamos una copia profunda de prevEvents
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
		//SI ES UN RESTAURANT
		const nameRestaurants = ['lunch', 'dinner']
		if (
			nameRestaurants.includes(activeEventType) &&
			nameRestaurants.includes(hoveredEventType)
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

	return { sensors, handleDragStart, handleDragOver }
}
