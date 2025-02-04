import {
	DragStartEvent,
	DragMoveEvent,
	Active,
	DroppableContainer,
	Over // Make sure Over is imported from '@dnd-kit/core'
} from '@dnd-kit/core'
import { IEvent } from '@interfaces/event'
import { IActivity, IDay, IMeal } from '@interfaces/project'
import { IRestaurant } from '@interfaces/restaurant'

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

interface DraggableInfo {
	activeDraggableId: string
	activeEventType: 'morningEvents' | 'afternoonEvents' | 'lunch' | 'dinner'
	activeDayIndex: number
	activeKey: 'events' | 'restaurants'
	activeDraggable: Active
}

interface HoveredInfo {
	hoverItem: DroppableContainer
	hoverItemId: string
	hoveredEventType: 'morningEvents' | 'afternoonEvents' | 'lunch' | 'dinner'
	hoveredEventDayIndex: number
	hoveredKey: 'events' | 'restaurants'
}

const EVENT_TYPES_ACTIVITIES = ['morningEvents', 'afternoonEvents']
const EVENT_TYPES_MEALS = ['lunch', 'dinner']

export const getDraggableInfo = (dragEvent: DragStartEvent): DraggableInfo => {
	const { active } = dragEvent
	const activeDraggable = active as Active
	const { id: activeDraggableId, data } = activeDraggable
	const currentData = data as IDraggableData
	const { containerId } = currentData.current.sortable
	const [activeEventType, activeDayIndexStr] = containerId.split('-') as [
		'morningEvents' | 'afternoonEvents' | 'lunch' | 'dinner',
		string
	]
	const activeDayIndex = parseInt(activeDayIndexStr, 10)
	let activeKey: 'events' | 'restaurants' = EVENT_TYPES_ACTIVITIES.includes(
		activeEventType
	)
		? 'events'
		: 'restaurants'

	return {
		activeDraggable,
		activeDraggableId: String(activeDraggableId), // Convert to string
		activeEventType,
		activeDayIndex,
		activeKey
	}
}

export const getHoveredInfo = (
	dragEvent: DragMoveEvent
): HoveredInfo | null => {
	const { over } = dragEvent
	if (!over) return null // Return early if over is null

	const hoverItem = over as unknown as DroppableContainer // Correct casting
	const hoverItemId = hoverItem.id as string

	const [hoveredEventType, hoveredEventDayIndexStr] = hoverItem.data.current
		? (hoverItem.data.current.sortable.containerId.split('-') as [
				'morningEvents' | 'afternoonEvents' | 'lunch' | 'dinner',
				string
		  ])
		: ((hoverItemId as string).split('-') as [
				'morningEvents' | 'afternoonEvents' | 'lunch' | 'dinner',
				string
		  ])
	const hoveredEventDayIndex = parseInt(hoveredEventDayIndexStr, 10)
	let hoveredKey: 'events' | 'restaurants' = EVENT_TYPES_ACTIVITIES.includes(
		hoveredEventType
	)
		? 'events'
		: 'restaurants'

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
}: UpdateFuncProps): IDay[] => {
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
	if (replacedEntry) updatedEntries.splice(insertIndex, 0, replacedEntry)

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
