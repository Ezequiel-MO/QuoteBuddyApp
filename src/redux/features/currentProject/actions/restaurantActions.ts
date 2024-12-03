import {
	AddOrEditVenuePayload,
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
import { IRestaurant } from '@interfaces/restaurant'
import { IEntertainment } from '@interfaces/entertainment'

export const useRestaurantActions = () => {
	const dispatch = useAppDispatch()

	const addIntroRestaurant = (introRestaurant: IAddIntro) => {
		dispatch(AddIntroRestaurantThunk(introRestaurant))
	}

	const editModalRestaurant = (eventModal: IEditModalRestaurantPayload) => {
		dispatch(editModalRestaurantThunk(eventModal))
	}

	const addEntertainmentToRestaurant = (
		addEntertainment: IAddEntertainment
	) => {
		dispatch(addEntertainmentToRestaurantThunk(addEntertainment))
	}
	const deletedEntertainmetInRestaurant = (
		deletedEntertainmet: IDeletedEntertainment
	) => {
		dispatch(deleteEntertainmentInRestaurantThunk(deletedEntertainmet))
	}
	const editEntertainmentInRestaurant = (
		editEntainment: IEditEntertainment
	) => {
		dispatch(editEntertainmentInRestaurantThunk(editEntainment))
	}

	const addOrEditVenue = (infoRestaurant: AddOrEditVenuePayload) => {
		dispatch(addOrEditVenueThunk(infoRestaurant))
	}

	return {
		addIntroRestaurant,
		editModalRestaurant,
		addEntertainmentToRestaurant,
		deletedEntertainmetInRestaurant,
		editEntertainmentInRestaurant,
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

const addEntertainmentToRestaurantThunk =
	(addEntertainment: IAddEntertainment): AppThunk =>
	(dispatch, getState) => {
		const { typeMeal, dayIndex, idRestaurant, entertainmentShow } =
			addEntertainment
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		if (dayIndex < 0 || dayIndex >= currentSchedule.length) {
			throw new Error('Invalid day index.')
		}

		const dayToUpdate = currentSchedule[dayIndex]
		const restaurantKey = typeMeal as 'lunch' | 'dinner'

		const restaurants: IRestaurant[] = dayToUpdate[restaurantKey]?.restaurants

		if (!restaurants) {
			throw new Error('Restaurants not found for the specified event type.')
		}

		const restaurant: IRestaurant | undefined = restaurants.find(
			(el: IRestaurant) => el._id === idRestaurant
		)

		if (!restaurant) {
			throw new Error('Restaurant not found.')
		}

		const updatedEntertainment = [
			...(restaurant.entertainment || []),
			entertainmentShow
		]

		const updatedRestaurant: IRestaurant = {
			...restaurant,
			entertainment: updatedEntertainment
		}

		const updatedRestaurants: IRestaurant[] = restaurants.map((rest) =>
			rest._id === idRestaurant ? updatedRestaurant : rest
		)

		const updatedDay: IDay = {
			...dayToUpdate,
			[restaurantKey]: {
				...dayToUpdate[restaurantKey],
				restaurants: updatedRestaurants
			}
		}

		const updatedSchedule: IDay[] = currentSchedule.map((day, index) =>
			index === dayIndex ? updatedDay : day
		)

		dispatch(ADD_ENTERTAINMENT_IN_RESTAURANT(updatedSchedule))
	}

const addOrEditVenueThunk =
	(infoRestaurant: AddOrEditVenuePayload): AppThunk =>
	(dispatch, getState) => {
		const { typeMeal, dayIndex, idRestaurant, venueEdit } = infoRestaurant
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		if (dayIndex < 0 || dayIndex >= currentSchedule.length) {
			throw new Error('Invalid day index.')
		}

		const dayToUpdate = currentSchedule[dayIndex]
		const restaurantKey = typeMeal as 'lunch' | 'dinner'

		const restaurants = dayToUpdate[restaurantKey]?.restaurants

		if (!restaurants) {
			throw new Error('Restaurants not found for the specified event type.')
		}

		const restaurantIndex = restaurants.findIndex(
			(el) => el._id === idRestaurant
		)

		if (restaurantIndex === -1) {
			throw new Error('Restaurant not found.')
		}

		const updatedRestaurant: IRestaurant = {
			...restaurants[restaurantIndex],
			venue_price: venueEdit
		}

		const updatedRestaurants = [...restaurants]
		updatedRestaurants[restaurantIndex] = updatedRestaurant

		const updatedDay: IDay = {
			...dayToUpdate,
			[restaurantKey]: {
				...dayToUpdate[restaurantKey],
				restaurants: updatedRestaurants
			}
		}

		const updatedSchedule = [
			...currentSchedule.slice(0, dayIndex),
			updatedDay,
			...currentSchedule.slice(dayIndex + 1)
		]

		dispatch(ADD_OR_EDIT_VENUE(updatedSchedule))
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

const editEntertainmentInRestaurantThunk =
	(editEntertainment: IEditEntertainment): AppThunk =>
	(dispatch, getState) => {
		const { typeMeal, dayIndex, idRestaurant, idEntertainment, editPrice } =
			editEntertainment
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		if (dayIndex < 0 || dayIndex >= currentSchedule.length) {
			throw new Error('Invalid day index.')
		}

		const dayToUpdate: IDay = currentSchedule[dayIndex]
		const restaurantKey = typeMeal as 'lunch' | 'dinner'

		const restaurants: IRestaurant[] = dayToUpdate[restaurantKey]?.restaurants

		if (!restaurants) {
			throw new Error('Restaurants not found for the specified event type.')
		}

		const restaurant: IRestaurant | undefined = restaurants.find(
			(el) => el._id === idRestaurant
		)

		if (!restaurant) {
			throw new Error('Restaurant not found.')
		}

		if (!restaurant.entertainment) {
			throw new Error('Entertainment not found.')
		}

		const entertainmentIndex: number = restaurant.entertainment.findIndex(
			(el) => el._id === idEntertainment
		)

		if (entertainmentIndex === -1) {
			throw new Error('Entertainment not found.')
		}

		const updatedEntertainment: IEntertainment = {
			...restaurant.entertainment[entertainmentIndex],
			price: editPrice
		}

		const updatedEntertainmentArray: IEntertainment[] = [
			...restaurant.entertainment
		]
		updatedEntertainmentArray[entertainmentIndex] = updatedEntertainment

		const updatedRestaurant: IRestaurant = {
			...restaurant,
			entertainment: updatedEntertainmentArray
		}

		const updatedRestaurants: IRestaurant[] = restaurants.map((rest) =>
			rest._id === idRestaurant ? updatedRestaurant : rest
		)

		const updatedDay: IDay = {
			...dayToUpdate,
			[restaurantKey]: {
				...dayToUpdate[restaurantKey],
				restaurants: updatedRestaurants
			}
		}

		const updatedSchedule: IDay[] = [
			...currentSchedule.slice(0, dayIndex),
			updatedDay,
			...currentSchedule.slice(dayIndex + 1)
		]

		dispatch(EDIT_ENTERTAINMENT_IN_RESTAURANT(updatedSchedule))
	}

const deleteEntertainmentInRestaurantThunk =
	(deletedEntertainmet: IDeletedEntertainment): AppThunk =>
	(dispatch, getState) => {
		const { typeMeal, dayIndex, idRestaurant, idEntertainment } =
			deletedEntertainmet

		const state = getState()

		const currentSchedule: IDay[] = state.currentProject.project.schedule

		if (dayIndex < 0 || dayIndex >= currentSchedule.length) {
			throw new Error('Invalid day index.')
		}

		const dayToUpdate: IDay = currentSchedule[dayIndex]

		const restaurantKey = typeMeal as 'lunch' | 'dinner'

		const restaurants: IRestaurant[] = dayToUpdate[restaurantKey]?.restaurants

		if (!restaurants) {
			throw new Error('Restaurants not found for the specified event type.')
		}

		const restaurant: IRestaurant | undefined = restaurants.find(
			(el) => el._id === idRestaurant
		)

		if (!restaurant) {
			throw new Error('Restaurant not found.')
		}

		if (!restaurant.entertainment) {
			throw new Error('Entertainment not found.')
		}

		const entertainmentIndex: number = restaurant.entertainment.findIndex(
			(el) => el._id === idEntertainment
		)

		if (entertainmentIndex === -1) {
			throw new Error('Entertainment not found.')
		}

		const updatedEntertainmentArray: IEntertainment[] =
			restaurant.entertainment.filter((ent) => ent._id !== idEntertainment)

		const updatedRestaurant: IRestaurant = {
			...restaurant,
			entertainment: updatedEntertainmentArray
		}

		const updatedRestaurants: IRestaurant[] = restaurants.map((rest) =>
			rest._id === idRestaurant ? updatedRestaurant : rest
		)

		const updatedDay: IDay = {
			...dayToUpdate,
			[restaurantKey]: {
				...dayToUpdate[restaurantKey],
				restaurants: updatedRestaurants
			}
		}

		const updatedSchedule: IDay[] = [
			...currentSchedule.slice(0, dayIndex),
			updatedDay,
			...currentSchedule.slice(dayIndex + 1)
		]

		dispatch(DELETED_ENTERTAINMENT_IN_RESTAURANT(updatedSchedule))
	}
