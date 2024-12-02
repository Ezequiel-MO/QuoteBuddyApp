import {
	IAddEntertainment,
	IAddIntro,
	IDeletedEntertainment,
	IEditEntertainment,
	IEditModalRestaurantPayload
} from '../types'
import {
	ADD_ENTERTAINMENT_IN_RESTAURANT,
	ADD_INTRO_RESTAURANT,
	ADD_OR_EDIT_VENUE,
	DELETED_ENTERTAINMENT_IN_RESTAURANT,
	EDIT_ENTERTAINMENT_IN_RESTAURANT,
	EDIT_MODAL_RESTAURANT
} from '../CurrentProjectSlice'
import { useAppDispatch } from 'src/hooks/redux/redux'
import { AppThunk } from 'src/redux/store'
import { IDay } from '@interfaces/project'

export const useRestaurantActions = () => {
	const dispatch = useAppDispatch()

	const addIntroRestaurant = (introRestaurant: IAddIntro) => {
		dispatch(AddIntroRestaurantThunk(introRestaurant))
	}

	const editModalRestaurant = (eventModal: IEditModalRestaurantPayload) => {
		dispatch(editModalRestaurantThunk(eventModal))
	}

	const addEntertainmentInRestaurant = (
		addEntertainment: IAddEntertainment
	) => {
		dispatch(ADD_ENTERTAINMENT_IN_RESTAURANT(addEntertainment))
	}
	const deletedEntertainmetInRestaurant = (
		deletedEntertainmet: IDeletedEntertainment
	) => {
		dispatch(DELETED_ENTERTAINMENT_IN_RESTAURANT(deletedEntertainmet))
	}
	const editEntertaienmentInRestaurant = (
		editEntertaienment: IEditEntertainment
	) => {
		dispatch(EDIT_ENTERTAINMENT_IN_RESTAURANT(editEntertaienment))
	}

	const addOrEditVenue = (infoRestaurant: any) => {
		dispatch(ADD_OR_EDIT_VENUE(infoRestaurant))
	}

	return {
		addIntroRestaurant,
		editModalRestaurant,
		addEntertainmentInRestaurant,
		deletedEntertainmetInRestaurant,
		editEntertaienmentInRestaurant,
		addOrEditVenue
	}
}

const AddIntroRestaurantThunk =
	(introRestaurant: IAddIntro): AppThunk =>
	(dispatch, getState) => {
		const { dayIndex, typeEvent, textContent } = introRestaurant
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		if (dayIndex < 0 || dayIndex >= currentSchedule.length) {
			throw new Error('Invalid day index.')
		}

		const typeEventKey = typeEvent as 'lunch' | 'dinner'
		const dayToUpdate = currentSchedule[dayIndex]

		//Validate the structure of the event type
		if (!dayToUpdate[typeEventKey]) {
			throw new Error(`Invalid type of event: ${typeEvent}`)
		}

		const restaurants = dayToUpdate[typeEventKey]?.restaurants || []

		const updatedRestaurantsGroup = {
			restaurants: [...restaurants],
			intro: textContent
		}

		const updatedDay = {
			...dayToUpdate,
			[typeEventKey]: updatedRestaurantsGroup
		}

		const updatedSchedule = [
			...currentSchedule.slice(0, dayIndex),
			updatedDay,
			...currentSchedule.slice(dayIndex + 1)
		]

		dispatch(ADD_INTRO_RESTAURANT(updatedSchedule))
	}

const editModalRestaurantThunk =
	(eventModal: IEditModalRestaurantPayload): AppThunk =>
	(dispatch, getState) => {
		const { id, dayIndex, typeOfEvent, data, imagesEvent, textContent } =
			eventModal

		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		if (dayIndex < 0 || dayIndex >= currentSchedule.length) {
			throw new Error('Invalid day index.')
		}

		const typeOfEventKey = typeOfEvent as 'lunch' | 'dinner'
		const dayToUpdate = currentSchedule[dayIndex]
		const restaurants = dayToUpdate[typeOfEventKey]?.restaurants

		if (!restaurants) {
			throw new Error('Restaurants not found for the specified event type.')
		}

		const findIndexEvent = restaurants.findIndex((el) => el._id === id)

		if (findIndexEvent === -1) {
			throw new Error('Event not found.')
		}

		// Update the event
		const updatedEvent = {
			...restaurants[findIndexEvent],
			price: data.price,
			isVenue: data.isVenue,
			textContent,
			imageContentUrl: imagesEvent
		}

		const updatedRestaurants = [...restaurants]
		updatedRestaurants[findIndexEvent] = updatedEvent

		const updatedDay = {
			...dayToUpdate,
			[typeOfEventKey]: {
				...dayToUpdate[typeOfEventKey],
				restaurants: updatedRestaurants
			}
		}

		const updatedSchedule = [
			...currentSchedule.slice(0, dayIndex),
			updatedDay,
			...currentSchedule.slice(dayIndex + 1)
		]

		dispatch(EDIT_MODAL_RESTAURANT(updatedSchedule))
	}
