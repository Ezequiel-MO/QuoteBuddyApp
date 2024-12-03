import {
	IAddEventToItenerary,
	IAddIntro,
	IIntroEventItinerary,
	IRemoveEventToItinerary
} from '../types'
import {
	ADD_EVENT_TO_ITENERARY,
	ADD_INTRO_EVENT_TO_ITENERARY,
	ADD_INTRO_HOTEL_OVERNIGHT,
	REMOVE_EVENT_TO_ITENERARY
} from '../CurrentProjectSlice'
import { useAppDispatch } from 'src/hooks/redux/redux'
import { AppThunk } from 'src/redux/store'
import { IDay, IItinerary } from '@interfaces/project'

export const useItineraryActions = () => {
	const dispatch = useAppDispatch()

	const addIntroHotelOvernight = (introHotel: IAddIntro) => {
		dispatch(ADD_INTRO_HOTEL_OVERNIGHT(introHotel))
	}

	const addIntroEventItinerary = (introEvent: IIntroEventItinerary) => {
		dispatch(ADD_INTRO_EVENT_TO_ITENERARY(introEvent))
	}

	const addEventToItenerary = (addEvent: IAddEventToItenerary) => {
		dispatch(addEventToItineraryThunk(addEvent))
	}

	const removeIteneraryEvent = (event: IRemoveEventToItinerary) => {
		dispatch(REMOVE_EVENT_TO_ITENERARY(event))
	}

	return {
		addIntroHotelOvernight,
		addIntroEventItinerary,
		addEventToItenerary,
		removeIteneraryEvent
	}
}

const addEventToItineraryThunk =
	(addEvent: IAddEventToItenerary): AppThunk =>
	(dispatch, getState) => {
		const { dayIndex, typeOfEvent, event } = addEvent
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		// Validate day index
		if (dayIndex < 0 || dayIndex >= currentSchedule.length) {
			throw new Error(`Invalid day index: ${dayIndex}`)
		}

		const dayToUpdate = currentSchedule[dayIndex]

		// Validate itinerary
		const itinerary = dayToUpdate.itinerary
		if (!itinerary || itinerary.itinerary.length === 0) {
			throw new Error('ERROR! The Itinerary has no Transfer/s')
		}

		// Ensure immutability at every level
		const typesMeals = ['lunch', 'dinner']
		const typesActivities = [
			'morningActivity',
			'afternoonActivity',
			'nightActivity'
		]
		let updatedItinerary

		if (typesMeals.includes(typeOfEvent)) {
			updatedItinerary = {
				...itinerary,
				[typeOfEvent]: {
					...itinerary[typeOfEvent],
					restaurants: [...itinerary[typeOfEvent].restaurants, event]
				}
			}
		} else if (typesActivities.includes(typeOfEvent)) {
			updatedItinerary = {
				...itinerary,
				[typeOfEvent]: {
					...itinerary[typeOfEvent],
					events: [...itinerary[typeOfEvent].events, event]
				}
			}
		} else {
			throw new Error(`Invalid type of event: ${typeOfEvent}`)
		}

		// Create updated day
		const updatedDay: IDay = {
			...dayToUpdate,
			itinerary: updatedItinerary
		}

		// Update schedule immutably
		const updatedSchedule = currentSchedule.map((day, index) =>
			index === dayIndex ? updatedDay : day
		)

		// Dispatch the updated schedule
		dispatch(ADD_EVENT_TO_ITENERARY(updatedSchedule))
	}
