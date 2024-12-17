import {
	IAddEventToItenerary,
	IIntroEventItinerary,
	IRemoveEventToItinerary,
	UpdateAfternoonActivityItineraryPayload,
	UpdateAssistanceTransfersItineraryPayload,
	UpdateDinnerRestaurantItineraryPayload,
	UpdateLunchRestaurantItineraryPayload,
	UpdateMorningActivityItineraryPayload,
	UpdateTransfersItineraryPayload
} from '../types'
import { UPDATE_PROJECT_SCHEDULE } from '../CurrentProjectSlice'
import { useAppDispatch } from 'src/hooks/redux/redux'
import { AppThunk } from 'src/redux/store'
import { IActivity, IDay, IItinerary } from '@interfaces/project'
import { IRestaurant } from '@interfaces/restaurant'
import { ITransfer } from '@interfaces/transfer'

export const useItineraryActions = () => {
	const dispatch = useAppDispatch()

	const addIntroToEventItinerary = (introEvent: IIntroEventItinerary) => {
		dispatch(addIntroToEventItineraryThunk(introEvent))
	}

	const addEventToItinerary = (addEvent: IAddEventToItenerary) => {
		dispatch(addEventToItineraryThunk(addEvent))
	}

	const removeEventFromItinerary = (event: IRemoveEventToItinerary) => {
		dispatch(removeEventFromItineraryThunk(event))
	}

	const updateAssistanceTransfersItinerary = (
		payload: UpdateAssistanceTransfersItineraryPayload
	) => {
		dispatch(updateAssistanceTransfersItineraryThunk(payload))

		return {
			addIntroToEventItinerary,
			addEventToItinerary,
			removeEventFromItinerary,
			updateAssistanceTransfersItinerary
		}
	}

	const updateTransfersItinerary = (
		payload: UpdateTransfersItineraryPayload
	) => {
		dispatch(updateTransfersItineraryThunk(payload))
	}

	const updateMorningActivityItinerary = (
		payload: UpdateMorningActivityItineraryPayload
	) => {
		dispatch(updateMorningActivityItineraryThunk(payload))
	}

	const updateAfternoonActivityItinerary = (
		payload: UpdateAfternoonActivityItineraryPayload
	) => {
		dispatch(updateAfternoonActivityItineraryThunk(payload))
	}

	const updateLunchRestaurantItinerary = (
		payload: UpdateLunchRestaurantItineraryPayload
	) => dispatch(updateLunchRestaurantItinearyThunk(payload))

	const updateDinnerRestaurantItinerary = (
		payload: UpdateDinnerRestaurantItineraryPayload
	) => {
		dispatch(updateDinnerRestaurantItineraryThunk(payload))
	}

	return {
		addIntroToEventItinerary,
		addEventToItinerary,
		removeEventFromItinerary,
		updateAssistanceTransfersItinerary,
		updateTransfersItinerary,
		updateMorningActivityItinerary,
		updateAfternoonActivityItinerary,
		updateLunchRestaurantItinerary,
		updateDinnerRestaurantItinerary
	}
}

const addIntroToEventItineraryThunk =
	(introEvent: IIntroEventItinerary): AppThunk =>
	(dispatch, getState) => {
		const { dayIndex, typeOfEvent, textContent } = introEvent
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		if (dayIndex < 0 || dayIndex >= currentSchedule.length) {
			throw new Error(`Invalid day index: ${dayIndex}`)
		}

		const dayToUpdate = currentSchedule[dayIndex]
		const itinerary = dayToUpdate.itinerary

		if (!itinerary || itinerary.itinerary.length === 0) {
			throw new Error('ERROR! The Itinerary has no Transfer/s')
		}

		const updatedItinerary: IItinerary = {
			...itinerary,
			[typeOfEvent]: {
				...itinerary[typeOfEvent],
				intro: textContent !== '<p><br></p>' ? textContent : ''
			}
		}

		const updatedDay: IDay = {
			...dayToUpdate,
			itinerary: updatedItinerary
		}

		const updatedSchedule = currentSchedule.map((day, index) =>
			index === dayIndex ? updatedDay : day
		)

		dispatch(
			UPDATE_PROJECT_SCHEDULE(updatedSchedule, 'Add intro to an itinerary')
		)
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
		dispatch(
			UPDATE_PROJECT_SCHEDULE(updatedSchedule, 'Add event to an itinerary')
		)
	}

const removeEventFromItineraryThunk =
	(eventToRemove: IRemoveEventToItinerary): AppThunk =>
	(dispatch, getState) => {
		const { dayIndex, typeOfEvent, idEvent } = eventToRemove
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		// Validate day index
		if (dayIndex < 0 || dayIndex >= currentSchedule.length) {
			throw new Error(`Invalid day index: ${dayIndex}`)
		}

		const dayToUpdate = currentSchedule[dayIndex]
		const itinerary = dayToUpdate.itinerary

		// Validate itinerary
		if (!itinerary || itinerary.itinerary.length === 0) {
			throw new Error('ERROR! The Itinerary has no Transfer/s')
		}

		const typesMeals = ['lunch', 'dinner']
		const typesActivities = [
			'morningActivity',
			'afternoonActivity',
			'nightActivity'
		]

		let updatedItinerary: IItinerary

		if (typesMeals.includes(typeOfEvent)) {
			updatedItinerary = {
				...itinerary,
				[typeOfEvent]: {
					...itinerary[typeOfEvent],
					restaurants: itinerary[typeOfEvent].restaurants.filter(
						(el: IRestaurant) => el._id !== idEvent
					)
				}
			}
		} else if (typesActivities.includes(typeOfEvent)) {
			updatedItinerary = {
				...itinerary,
				[typeOfEvent]: {
					...itinerary[typeOfEvent],
					events: itinerary[typeOfEvent].events.filter(
						(el: IActivity) => el._id !== idEvent
					)
				}
			}
		} else {
			throw new Error(`Invalid type of event: ${typeOfEvent}`)
		}

		const updatedDay: IDay = {
			...dayToUpdate,
			itinerary: updatedItinerary
		}

		const updatedSchedule = currentSchedule.map((day, index) =>
			index === dayIndex ? updatedDay : day
		)

		dispatch(
			UPDATE_PROJECT_SCHEDULE(updatedSchedule, 'Remove event from itinerary')
		)
	}

const updateAssistanceTransfersItineraryThunk =
	(payload: UpdateAssistanceTransfersItineraryPayload): AppThunk =>
	(dispatch, getState) => {
		const { dayIndex, key, value } = payload
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		// Deep copy the schedule
		const updatedSchedule = JSON.parse(JSON.stringify(currentSchedule))

		// Find the transfers for the specified day
		const transfers = updatedSchedule[dayIndex]?.itinerary?.itinerary

		if (transfers) {
			transfers.forEach((transfer: ITransfer) => {
				transfer[key] = value
			})
		} else {
			console.warn(`No transfers found for dayIndex: ${dayIndex}`)
		}

		// Dispatch the updated schedule
		dispatch(
			UPDATE_PROJECT_SCHEDULE(
				updatedSchedule,
				'Update assistance transfers itinerary'
			)
		)
	}

const updateTransfersItineraryThunk =
	(payload: UpdateTransfersItineraryPayload): AppThunk =>
	(dispatch, getState) => {
		const { dayIndex, idTransfer, typeUpdate, serviceKey, value } = payload
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		// Deep copy the schedule
		const updatedSchedule = JSON.parse(JSON.stringify(currentSchedule))

		const transfersItinerary = updatedSchedule[dayIndex]?.itinerary?.itinerary

		if (!transfersItinerary) {
			console.warn(`No transfers itinerary found for dayIndex: ${dayIndex}`)
			return
		}

		if (typeUpdate === 'priceTransfer') {
			transfersItinerary.forEach((transfer: any) => {
				if (
					transfer._id === idTransfer &&
					transfer.selectedService === serviceKey
				) {
					transfer[serviceKey] = value
				}
			})
		} else if (typeUpdate === 'transfer') {
			const transfer = transfersItinerary.find(
				(el: any) => el._id === idTransfer && el.selectedService === serviceKey
			)
			const indexTransfer = transfersItinerary.findIndex(
				(el: any) => el._id === idTransfer && el.selectedService === serviceKey
			)

			if (transfer !== undefined && indexTransfer !== -1) {
				const transfers = transfersItinerary.map((el: any, idx: number) =>
					idx === indexTransfer ? [] : el
				)

				const updateTransfer = Array(value).fill(transfer)
				transfers[indexTransfer] = updateTransfer
				updatedSchedule[dayIndex].itinerary.itinerary = transfers.flat()
			} else {
				console.warn(
					`Transfer not found for id: ${idTransfer} and serviceKey: ${serviceKey}`
				)
			}
		} else {
			console.warn(`Invalid typeUpdate: ${typeUpdate}`)
		}

		// Dispatch the updated schedule
		dispatch(
			UPDATE_PROJECT_SCHEDULE(updatedSchedule, 'Update transfers itinerary')
		)
	}

const updateMorningActivityItineraryThunk =
	(payload: UpdateMorningActivityItineraryPayload): AppThunk =>
	(dispatch, getState) => {
		const { dayIndex, id, key, value } = payload
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		if (dayIndex < 0 || dayIndex >= currentSchedule.length) {
			console.warn(`Invalid dayIndex: ${dayIndex}`)
			return
		}

		// Deep copy of the schedule
		const updatedSchedule = JSON.parse(JSON.stringify(currentSchedule))

		// Locate and update the morning activity
		const morningActivities =
			updatedSchedule[dayIndex].itinerary?.morningActivity?.events

		if (!morningActivities) {
			console.warn(`No morning activities found for dayIndex: ${dayIndex}`)
			return
		}

		const activity = morningActivities.find((el: IActivity) => el._id === id)

		if (!activity) {
			console.warn(`Activity with id: ${id} not found in morning activities`)
			return
		}

		if (key in activity) {
			activity[key] = value
		} else {
			console.warn(`Invalid key: ${key} for activity with id: ${id}`)
			return
		}

		// Dispatch the updated schedule
		dispatch(
			UPDATE_PROJECT_SCHEDULE(
				updatedSchedule,
				'Update morning activity in itinerary'
			)
		)
	}

const updateAfternoonActivityItineraryThunk =
	(payload: UpdateAfternoonActivityItineraryPayload): AppThunk =>
	(dispatch, getState) => {
		const { dayIndex, id, key, value } = payload
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		if (dayIndex < 0 || dayIndex >= currentSchedule.length) {
			console.warn(`Invalid dayIndex: ${dayIndex}`)
			return
		}

		// Deep copy of the schedule
		const updatedSchedule = JSON.parse(JSON.stringify(currentSchedule))

		// Locate and update the afternoon activity
		const afternoonActivities =
			updatedSchedule[dayIndex]?.itinerary?.afternoonActivity?.events

		if (!afternoonActivities) {
			console.warn(`No afternoon activities found for dayIndex: ${dayIndex}`)
			return
		}

		const activity = afternoonActivities.find((el: IActivity) => el._id === id)

		if (!activity) {
			console.warn(`Activity with id: ${id} not found in afternoon activities`)
			return
		}

		if (key in activity) {
			activity[key] = value
		} else {
			console.warn(`Invalid key: ${key} for activity with id: ${id}`)
			return
		}

		// Dispatch the updated schedule
		dispatch(
			UPDATE_PROJECT_SCHEDULE(
				updatedSchedule,
				'Update afternoon activity in itinerary'
			)
		)
	}

const updateLunchRestaurantItinearyThunk =
	(payload: UpdateLunchRestaurantItineraryPayload): AppThunk =>
	(dispatch, getState) => {
		const { dayIndex, id, key, value } = payload
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		if (dayIndex < 0 || dayIndex >= currentSchedule.length) {
			console.warn(`Invalid dayIndex: ${dayIndex}`)
			return
		}

		// Deep copy of the schedule
		const updatedSchedule: IDay[] = JSON.parse(JSON.stringify(currentSchedule))

		const lunchRestaurants: IRestaurant[] =
			updatedSchedule[dayIndex]?.itinerary?.lunch?.restaurants

		if (!lunchRestaurants || !Array.isArray(lunchRestaurants)) {
			console.warn(`No lunch restaurants found for dayIndex: ${dayIndex}`)
			return
		}

		const updatedRestaurants: IRestaurant[] = lunchRestaurants.map(
			(restaurant) => {
				if (restaurant._id === id) {
					return {
						...restaurant,
						[key]: value
					}
				}
				return restaurant
			}
		)

		updatedSchedule[dayIndex].itinerary.lunch.restaurants = updatedRestaurants

		dispatch(
			UPDATE_PROJECT_SCHEDULE(
				updatedSchedule,
				'Update lunch restaurant in itinerary'
			)
		)
	}

const updateDinnerRestaurantItineraryThunk =
	(payload: UpdateDinnerRestaurantItineraryPayload): AppThunk =>
	(dispatch, getState) => {
		const { dayIndex, id, key, value } = payload
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		if (dayIndex < 0 || dayIndex >= currentSchedule.length) {
			console.warn(`Invalid dayIndex: ${dayIndex}`)
			return
		}

		// Deep copy of the schedule
		const updatedSchedule = JSON.parse(JSON.stringify(currentSchedule))

		// Locate and update the dinner restaurant
		const dinnerRestaurants =
			updatedSchedule[dayIndex]?.itinerary?.dinner?.restaurants

		if (!dinnerRestaurants) {
			console.warn(`No dinner restaurants found for dayIndex: ${dayIndex}`)
			return
		}

		const restaurant = dinnerRestaurants.find(
			(el: IRestaurant) => el._id === id
		)

		if (!restaurant) {
			console.warn(`Restaurant with id: ${id} not found in dinner restaurants`)
			return
		}

		if (key in restaurant) {
			restaurant[key] = value
		} else {
			console.warn(`Invalid key: ${key} for restaurant with id: ${id}`)
			return
		}

		// Dispatch the updated schedule
		dispatch(
			UPDATE_PROJECT_SCHEDULE(
				updatedSchedule,
				'Update dinner restaurant in itinerary'
			)
		)
	}
