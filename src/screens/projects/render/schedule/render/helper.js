const EVENT_TYPES_ACTIVITIES = ['morningEvents', 'afternoonEvents']
const EVENT_TYPES_MEALS = ['lunch', 'dinner']

export const getDraggableInfo = (dragEvent) => {
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
	let activeKey
	if (EVENT_TYPES_ACTIVITIES.includes(activeEventType)) {
		activeKey = 'events'
	} else if (EVENT_TYPES_MEALS.includes(activeEventType)) {
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

export const getHoveredInfo = (dragEvent) => {
	const { over: hoverItem } = dragEvent
	if (!hoverItem) {
		return
	}
	const { id: hoverItemId } = hoverItem
	const [hoveredEventType, hoveredEventDayIndex] = hoverItem.data.current
		? hoverItem.data.current.sortable.containerId.split('-')
		: hoverItemId.split('-')
	let hoveredKey
	if (EVENT_TYPES_ACTIVITIES.includes(hoveredEventType)) {
		hoveredKey = 'events'
	} else if (EVENT_TYPES_MEALS.includes(hoveredEventType)) {
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
}) => {
	const clonedEvents = JSON.parse(JSON.stringify(prevEvents))

	const activeEntry = { ...prevEvents[activeDayIndex][activeEventType] }
	const hoveredEntry = { ...prevEvents[hoveredEventDayIndex][hoveredEventType] }

	const filteredEntries = activeEntry[targetKey].filter(
		(el) => el._id !== activeDraggable.id
	)

	let insertIndex = hoveredEntry[targetKey].findIndex(
		(el) => el._id === hoverItem.id
	)
	insertIndex = insertIndex >= 0 ? insertIndex : 0

	const updatedEntries = [...hoveredEntry[targetKey]]
	const [replacedEntry] = updatedEntries.splice(insertIndex, 1, activeId)

	replacedEntry && updatedEntries.splice(insertIndex, 0, replacedEntry)

	const updatedActiveEntry = {
		intro: activeEntry.intro,
		[targetKey]: filteredEntries
	}

	const updatedHoveredMealEntry = {
		intro: hoveredEntry.intro,
		[targetKey]: updatedEntries
	}

	clonedEvents[activeDayIndex][activeEventType] = updatedActiveEntry
	clonedEvents[hoveredEventDayIndex][hoveredEventType] = updatedHoveredMealEntry

	return clonedEvents
}
