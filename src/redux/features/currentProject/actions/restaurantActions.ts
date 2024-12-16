import {
	AddOrEditVenuePayload,
	IAddEntertainment,
	IDeletedEntertainment,
	IEditEntertainment,
	IEditModalRestaurantPayload,
	UpdateDinnerRestaurantPayload,
	UpdateLunchRestaurantPayload,
	UpdateRestaurantEntertainmentPayload,
	UpdateRestaurantVenuePayload,
	UpdateTransferRestaurantPayload
} from '../types'
import { UPDATE_PROJECT_SCHEDULE } from '../CurrentProjectSlice'
import { useAppDispatch } from 'src/hooks/redux/redux'
import { AppThunk } from 'src/redux/store'
import { IDay } from '@interfaces/project'
import { IRestaurant } from '@interfaces/restaurant'
import { IEntertainment, IEntertainmentPrice } from '@interfaces/entertainment'
import { ITransfer } from '@interfaces/transfer'

export const useRestaurantActions = () => {
	const dispatch = useAppDispatch()

	const editModalRestaurant = (eventModal: IEditModalRestaurantPayload) => {
		dispatch(editModalRestaurantThunk(eventModal))
	}

	const updateRestaurantEntertainment = (
		payload: UpdateRestaurantEntertainmentPayload
	) => {
		dispatch(updateRestaurantEntertainmentThunk(payload))
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

	const updateLunchRestaurant = (payload: UpdateLunchRestaurantPayload) => {
		dispatch(updateLunchRestaurantThunk(payload))
	}

	const addOrEditVenue = (infoRestaurant: AddOrEditVenuePayload) => {
		dispatch(addOrEditVenueThunk(infoRestaurant))
	}

	const updateDinnerRestaurant = (payload: UpdateDinnerRestaurantPayload) => {
		dispatch(updateDinnerRestaurantThunk(payload))
	}

	const updateTransferRestaurant = (
		payload: UpdateTransferRestaurantPayload
	) => {
		dispatch(updateTransferRestaurantThunk(payload))
	}

	const updateRestaurantVenue = (payload: UpdateRestaurantVenuePayload) =>
		dispatch(updateRestaurantVenueThunk(payload))

	return {
		editModalRestaurant,
		updateRestaurantEntertainment,
		addEntertainmentToRestaurant,
		updateLunchRestaurant,
		deletedEntertainmetInRestaurant,
		editEntertainmentInRestaurant,
		addOrEditVenue,
		updateDinnerRestaurant,
		updateTransferRestaurant,
		updateRestaurantVenue
	}
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

		dispatch(
			UPDATE_PROJECT_SCHEDULE(
				updatedSchedule,
				'Add Entertainment to a Restaurant'
			)
		)
	}

const updateRestaurantEntertainmentThunk =
	(payload: UpdateRestaurantEntertainmentPayload): AppThunk =>
	(dispatch, getState) => {
		// Retrieve the current state
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		// Deep copy the schedule
		const copySchedule = JSON.parse(JSON.stringify(currentSchedule))

		// Find the specific day
		const day = copySchedule[payload.dayIndex]
		if (!day) return

		// Find the specific meal type
		const meal = day[payload.typeMeal]
		if (!meal || !meal.restaurants) return

		// Find the specific restaurant
		const restaurantIndex = meal.restaurants.findIndex(
			(restaurant: IRestaurant) => restaurant._id === payload.idRestaurant
		)
		if (restaurantIndex === -1) return

		const restaurant = meal.restaurants[restaurantIndex]

		// Find the specific entertainment
		const entertainmentIndex = restaurant.entertainment?.findIndex(
			(entertainment: IEntertainment) =>
				entertainment._id === payload.idEntertainment
		)
		if (entertainmentIndex === -1) return

		// Update the price
		if (!restaurant.entertainment[entertainmentIndex].price) {
			restaurant.entertainment[entertainmentIndex].price =
				{} as IEntertainmentPrice
		}
		restaurant.entertainment[entertainmentIndex].price[
			payload.keyEntertainmentPrice
		] = payload.value

		// Dispatch the action
		dispatch(
			UPDATE_PROJECT_SCHEDULE(
				copySchedule,
				'Update Restaurant Entertainment Price'
			)
		)
	}

const updateLunchRestaurantThunk =
	({ value, dayIndex, id, key }: UpdateLunchRestaurantPayload): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		// Deep copy of the schedule
		const copySchedule: IDay[] = JSON.parse(JSON.stringify(currentSchedule))

		const updatedRestaurants = copySchedule[dayIndex].lunch.restaurants.map(
			(el: any) => {
				if (el._id === id) {
					el[key] = value
				}
				return el
			}
		)

		copySchedule[dayIndex].lunch.restaurants = updatedRestaurants

		dispatch(UPDATE_PROJECT_SCHEDULE(copySchedule, 'Update lunch restaurant'))
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

		dispatch(UPDATE_PROJECT_SCHEDULE(updatedSchedule, 'Add or Edit Venue'))
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

		dispatch(UPDATE_PROJECT_SCHEDULE(updatedSchedule, 'Edit Restaurant Modal'))
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

		dispatch(
			UPDATE_PROJECT_SCHEDULE(
				updatedSchedule,
				'Edit Entertainment in Restaurant'
			)
		)
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

		dispatch(
			UPDATE_PROJECT_SCHEDULE(
				updatedSchedule,
				'Delete Entertainment from Restaurant'
			)
		)
	}

const updateDinnerRestaurantThunk =
	({ value, dayIndex, id, key }: UpdateDinnerRestaurantPayload): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		// Deep copy of the schedule
		const copySchedule: IDay[] = JSON.parse(JSON.stringify(currentSchedule))
		const updatedRestaurants = copySchedule[dayIndex].dinner.restaurants.map(
			(el: any) => {
				if (el._id === id) {
					el[key] = value
				}
				return el
			}
		)

		copySchedule[dayIndex].dinner.restaurants = updatedRestaurants

		dispatch(UPDATE_PROJECT_SCHEDULE(copySchedule, 'Update dinner restaurant'))
	}

const updateTransferRestaurantThunk =
	({
		value,
		dayIndex,
		typeEvent,
		idRestaurant,
		typeUpdate,
		idTransfer,
		serviceKey
	}: UpdateTransferRestaurantPayload): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		// Deep copy of the schedule
		const copySchedule: IDay[] = JSON.parse(JSON.stringify(currentSchedule))
		const restaurants: IRestaurant[] =
			copySchedule[dayIndex][typeEvent].restaurants
		const restaurant = restaurants.find(
			(el) => el._id === idRestaurant
		) as IRestaurant

		if (restaurant && restaurant.transfer) {
			if (typeUpdate === 'priceTransfer') {
				const transfers = restaurant.transfer.map((el: ITransfer) => {
					if (el._id === idTransfer && el.selectedService === serviceKey) {
						el[serviceKey] = value
					}
					return el
				})
				restaurant.transfer = transfers
			}

			if (typeUpdate === 'transfer') {
				const findTransfer = restaurant.transfer.find(
					(el) => el._id === idTransfer && el.selectedService === serviceKey
				)
				const findIndexTransfer = restaurant.transfer.findIndex(
					(el) => el._id === idTransfer && el.selectedService === serviceKey
				)

				// Transform each element using map
				const arraysOfTransfers = restaurant.transfer.map((el, index) => {
					if (index === findIndexTransfer && findTransfer) {
						// Replace the found element with multiple copies of findTransfer
						return Array(value).fill(findTransfer)
					} else if (index === findIndexTransfer) {
						// If no findTransfer is found but this is the target index, return empty array
						return []
					} else {
						// All other elements remain single-element arrays
						return [el]
					}
				})

				// Flatten the resulting array of arrays with reduce
				const flattenedTransfers = arraysOfTransfers.reduce<ITransfer[]>(
					(acc, arr) => acc.concat(arr),
					[]
				)

				restaurant.transfer = flattenedTransfers
			}
		}

		dispatch(
			UPDATE_PROJECT_SCHEDULE(copySchedule, 'Update transfer restaurant')
		)
	}

const updateRestaurantVenueThunk =
	(payload: UpdateRestaurantVenuePayload): AppThunk =>
	(dispatch, getState) => {
		const { value, dayIndex, typeMeal, restaurantId, keyVenue } = payload
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		const restaurants = currentSchedule[dayIndex][typeMeal].restaurants

		const restaurantIndex = restaurants.findIndex(
			(restaurant) => restaurant._id === restaurantId
		)

		if (restaurantIndex === -1) {
			throw new Error('Restaurant not found.')
		}

		const restaurant = { ...restaurants[restaurantIndex] }

		restaurant.venue_price = {
			...(restaurant.venue_price || {}),
			[keyVenue]: value
		}

		const updatedRestaurants = restaurants.map((rest, index) =>
			index === restaurantIndex ? restaurant : rest
		)

		// Replace the updated meal type in the day object
		const updatedDay: IDay = {
			...currentSchedule[dayIndex],
			[typeMeal]: {
				...currentSchedule[dayIndex][typeMeal],
				restaurants: updatedRestaurants
			}
		}

		// Replace the updated day in the schedule
		const updatedSchedule = currentSchedule.map((day, index) =>
			index === dayIndex ? updatedDay : day
		)

		// Dispatch the updated schedule
		dispatch(
			UPDATE_PROJECT_SCHEDULE(updatedSchedule, 'Update Restaurant Venue')
		)
	}
