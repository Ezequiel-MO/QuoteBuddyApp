export const updateEvents = ({
	prevEvents,
	activeDayIndex,
	activeEventType,
	hoveredEventDayIndex,
	hoveredEventType,
	activeDraggable,
	hoverItem,
	activeId
}) => {
	const newEvents = JSON.parse(JSON.stringify(prevEvents))
	const restaurantsStart =
		newEvents[activeDayIndex][activeEventType]?.restaurants ||
		newEvents[activeDayIndex][activeEventType]
	const restaurantsFilter = restaurantsStart.filter(
		(el) => el._id !== activeDraggable.id
	)
	const restaurantsOver =
		newEvents[hoveredEventDayIndex][hoveredEventType]?.restaurants ||
		newEvents[hoveredEventDayIndex][hoveredEventType]
	const { intro: startIntro } = newEvents[activeDayIndex][activeEventType]
	const startRestaurantsFilter = {
		restaurants: restaurantsFilter
	}
	startIntro && (startRestaurantsFilter.intro = startIntro)
	let newIndex = restaurantsOver.findIndex((el) => el._id === hoverItem.id)
	newIndex = newIndex >= 0 ? newIndex : 0
	let sourceArray =
		newEvents[hoveredEventDayIndex][hoveredEventType]?.restaurants ||
		newEvents[hoveredEventDayIndex][hoveredEventType]
	const [elementRestaurant] = sourceArray.splice(newIndex, 1)
	sourceArray.splice(newIndex, 0, activeId)
	elementRestaurant && sourceArray.splice(newIndex, 0, elementRestaurant)
	const { intro: overIntro } = newEvents[hoveredEventDayIndex][hoveredEventType]
	const destinationSourceArray = {
		restaurants: sourceArray
	}
	overIntro && (destinationSourceArray.intro = overIntro)
	newEvents[activeDayIndex][activeEventType] = startRestaurantsFilter
	newEvents[hoveredEventDayIndex][hoveredEventType] = destinationSourceArray
	return newEvents
}
