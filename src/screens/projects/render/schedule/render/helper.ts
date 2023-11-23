import {
	DragStartEvent,
	DragMoveEvent,
	Active,
	DroppableContainer
} from '@dnd-kit/core'
import { IDay, IRestaurant, IEvent, IActivity, IMeal } from 'src/interfaces'

interface ISortableData {
	sortable: {
		containerId: string
		index: number
		items: string[]
	}
}

interface IDraggableData {
	current: ISortableData
}

interface UpdateFuncProps {
	prevEvents: IDay[]
	activeDayIndex: number
	activeEventType: 'morningEvents' | 'afternoonEvents' | 'lunch' | 'dinner'
	hoveredEventDayIndex: number
	hoveredEventType: 'morningEvents' | 'afternoonEvents' | 'lunch' | 'dinner'
	activeDraggable: Active
	hoverItem: DroppableContainer
	activeId: IRestaurant | IEvent
	targetKey: 'events' | 'restaurants'
}

const EVENT_TYPES_ACTIVITIES = ['morningEvents', 'afternoonEvents']
const EVENT_TYPES_MEALS = ['lunch', 'dinner']

export const getDraggableInfo = (dragEvent: DragStartEvent) => {
	const { active: activeDraggable } = dragEvent
	// if (!activeDraggable) { // ESTE IF "CREO" QUE SE PUEDE SACAR
	// 	return
	// }
	const { id: activeDraggableId, data } = activeDraggable
	const currentData = data as IDraggableData
	const { containerId } = currentData.current.sortable
	const [activeEventType, activeDayIndex] = containerId.split('-')
	let activeKey
	if (EVENT_TYPES_ACTIVITIES.includes(activeEventType)) {
		activeKey = 'events'
	}
	if (EVENT_TYPES_MEALS.includes(activeEventType)) {
		activeKey = 'restaurants'
	}
	return {
		activeDraggable,
		activeDraggableId,
		activeEventType,
		activeDayIndex,
		activeKey
	}
}

export const getHoveredInfo = (dragEvent: DragMoveEvent) => {
	const { over: hoverItem } = dragEvent

	if (!hoverItem) {
		return
	}

	const { id: hoverItemId } = hoverItem
	const [hoveredEventType, hoveredEventDayIndex] = hoverItem.data.current
		? hoverItem.data.current.sortable.containerId.split('-')
		: (hoverItemId as string).split('-')
	let hoveredKey = ''
	if (EVENT_TYPES_ACTIVITIES.includes(hoveredEventType)) {
		hoveredKey = 'events'
	}
	if (EVENT_TYPES_MEALS.includes(hoveredEventType)) {
		hoveredKey = 'restaurants'
	}
	return {
		hoverItem,
		hoverItemId,
		hoveredEventType,
		hoveredEventDayIndex,
		hoveredKey
	}
}

export const updateFunc = ({
	prevEvents,
	activeDayIndex,
	activeEventType,
	hoveredEventDayIndex,
	hoveredEventType,
	activeDraggable,
	hoverItem,
	activeId,
	targetKey
}: UpdateFuncProps) => {
	const clonedEvents: IDay[] = JSON.parse(JSON.stringify(prevEvents))
	const activeEntry = clonedEvents[activeDayIndex][activeEventType]
	const hoveredEntry = clonedEvents[hoveredEventDayIndex][hoveredEventType]
	const filteredEntries: IEvent[] | IRestaurant[] = activeEntry[
		targetKey
	].filter((el: IEvent | IRestaurant) => el._id !== activeDraggable.id)
	let insertIndex = hoveredEntry[targetKey].findIndex(
		(el: IEvent | IRestaurant) => el._id === hoverItem.id
	)
	insertIndex = insertIndex >= 0 ? insertIndex : 0
	const updatedEntries = [...hoveredEntry[targetKey]]
	const [replacedEntry] = updatedEntries.splice(insertIndex, 1, activeId)
	replacedEntry && updatedEntries.splice(insertIndex, 0, replacedEntry)
	const updatedActiveEntry: IActivity | IMeal = {
		...activeEntry,
		[targetKey]: filteredEntries
	}
	const updatedHoveredEntry: IActivity | IMeal = {
		...hoveredEntry,
		[targetKey]: updatedEntries
	}
	clonedEvents[activeDayIndex][activeEventType] =
		updatedActiveEntry as IActivity & IMeal
	clonedEvents[hoveredEventDayIndex][hoveredEventType] =
		updatedHoveredEntry as IActivity & IMeal
	return clonedEvents
}
