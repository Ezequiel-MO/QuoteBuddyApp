import {
	KeyboardSensor,
	MouseSensor,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'

export const useDragAndDropSchedule = (events, setActiveId) => {
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

	return { sensors, handleDragStart }
}
