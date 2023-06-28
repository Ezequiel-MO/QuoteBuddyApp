export const updateRestaurants = ({
	prevEvents,
	activeDayIndex,
	activeEventType,
	hoveredEventDayIndex,
	hoveredEventType,
	activeDraggable,
	hoverItem,
	activeId
}) => {
	const clonedEvents = JSON.parse(JSON.stringify(prevEvents))

	const activeMeal = clonedEvents[activeDayIndex][activeEventType]
	const hoveredMeal = clonedEvents[hoveredEventDayIndex][hoveredEventType]

	if (!activeMeal?.restaurants || !hoveredMeal?.restaurants) return

	const filteredRestaurants = activeMeal.restaurants.filter(
		(el) => el._id !== activeDraggable.id
	)

	let insertIndex = hoveredMeal.restaurants.findIndex(
		(el) => el._id === hoverItem.id
	)
	insertIndex = insertIndex >= 0 ? insertIndex : 0

	const updatedRestaurants = [...hoveredMeal.restaurants]
	const [replacedRestaurant] = updatedRestaurants.splice(
		insertIndex,
		1,
		activeId
	)

	replacedRestaurant &&
		updatedRestaurants.splice(insertIndex, 0, replacedRestaurant)

	const updatedActiveMeal = {
		intro: activeMeal.intro,
		restaurants: filteredRestaurants
	}

	const updatedHoveredMeal = {
		intro: hoveredMeal.intro,
		restaurants: updatedRestaurants
	}

	clonedEvents[activeDayIndex][activeEventType] = updatedActiveMeal
	clonedEvents[hoveredEventDayIndex][hoveredEventType] = updatedHoveredMeal

	return clonedEvents
}
