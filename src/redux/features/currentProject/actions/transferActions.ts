import { AppThunk } from 'src/redux/store'
import {
	EditTransferEventOrRestaurantPayload,
	IAddIntroTransferItinerary,
	IAddItenerayTransfer,
	IRemoveIteneraryTransfer,
	TransferTimeOfEvent
} from '../types'
import {
	ADD_INTRO_TRANSFER_TO_ITINERARY,
	ADD_ITENERARY_TRANSFER_TO_SCHEDULE,
	ADD_TRANSFER_IN_OR_TRANSFER_OUT_TO_SCHEDULE,
	ADD_TRANSFER_TO_SCHEDULE,
	EDIT_TRANSFER_EVENT_OR_RESTAURANT,
	REMOVE_ITENERARY_TRANSFER_FROM_SCHEDULE,
	REMOVE_TRANSFER_FROM_SCHEDULE
} from '../CurrentProjectSlice'
import { ITransfer } from '@interfaces/transfer'
import { useAppDispatch } from 'src/hooks/redux/redux'
import { IDay } from '@interfaces/project'
import { IEvent } from '@interfaces/event'

export const useTransferActions = () => {
	const dispatch = useAppDispatch()

	const addItineraryTransfer = (addTransfer: IAddItenerayTransfer) => {
		dispatch(addItineraryTransferToScheduleThunk(addTransfer))
	}

	const addIntroTransferItinerary = (
		introTransfer: IAddIntroTransferItinerary
	) => {
		dispatch(ADD_INTRO_TRANSFER_TO_ITINERARY(introTransfer))
	}

	const addTransferToSchedule = (
		timeOfEvent: TransferTimeOfEvent,
		transfers: ITransfer[]
	) => {
		dispatch(ADD_TRANSFER_TO_SCHEDULE({ timeOfEvent, transfers }))
	}

	const addTransferInOrTransferOutSchedule = (transfer: any) => {
		dispatch(ADD_TRANSFER_IN_OR_TRANSFER_OUT_TO_SCHEDULE(transfer))
	}

	const editTransferEventOrRestaurant = (
		eventEdit: EditTransferEventOrRestaurantPayload
	) => {
		dispatch(editTransferEventOrRestaurantThunk(eventEdit))
	}

	const removeIteneraryTransfer = (transfer: IRemoveIteneraryTransfer) => {
		dispatch(REMOVE_ITENERARY_TRANSFER_FROM_SCHEDULE(transfer))
	}

	const removeTransferFromSchedule = (
		timeOfEvent: TransferTimeOfEvent,
		transferId: string
	) => {
		dispatch(removeTransferFromScheduleThunk(timeOfEvent, transferId))
	}

	return {
		addItineraryTransfer,
		removeTransferFromSchedule,
		addIntroTransferItinerary,
		addTransferToSchedule,
		addTransferInOrTransferOutSchedule,
		editTransferEventOrRestaurant,
		removeIteneraryTransfer
	}
}

const addItineraryTransferToScheduleThunk = (
	payload: IAddItenerayTransfer
): AppThunk => {
	return (dispatch, getState) => {
		const { dayIndex, starts, ends, transfers } = payload
		const state = getState()
		const currentSchedule = state.currentProject.project.schedule

		if (dayIndex < 0 || dayIndex >= currentSchedule.length) {
			console.error('Invalid dayIndex:', dayIndex)
			return
		}

		const updatedSchedule = currentSchedule.map((day, index) => {
			if (index === dayIndex) {
				return {
					...day,
					itinerary: {
						...day.itinerary,
						starts,
						ends,
						itinerary: transfers
					}
				}
			}
			return day
		})

		dispatch(ADD_ITENERARY_TRANSFER_TO_SCHEDULE(updatedSchedule))
	}
}

const editTransferEventOrRestaurantThunk =
	(eventEdit: EditTransferEventOrRestaurantPayload): AppThunk =>
	(dispatch, getState) => {
		const { typeEvent, dayIndex, idEvent, transferEdit } = eventEdit
		const state = getState()
		const currentSchedule = state.currentProject.project.schedule

		//validate dayIndex
		if (dayIndex < 0 || dayIndex >= currentSchedule.length) {
			throw new Error(`Invalid dayIndex: ${dayIndex}`)
		}

		const dayToUpdate: IDay = currentSchedule[dayIndex]

		if (['morningEvents', 'afternoonEvents'].includes(typeEvent)) {
			const eventKey = typeEvent as 'morningEvents' | 'afternoonEvents'
			const events = dayToUpdate[eventKey]?.events

			if (!events) {
				throw new Error(`Invalid or missing events array for ${eventKey}`)
			}

			const eventIndex = events.findIndex((event) => event._id === idEvent)
			if (eventIndex === -1) {
				throw new Error(`Event with ID ${idEvent} not found in ${eventKey}`)
			}

			const updatedEvent: IEvent = {
				...events[eventIndex],
				transfer: transferEdit
			}

			const updatedEvents = [...events]
			updatedEvents[eventIndex] = updatedEvent

			const updatedDay = {
				...dayToUpdate,
				[eventKey]: {
					...dayToUpdate[eventKey],
					events: updatedEvents
				}
			}

			const updatedSchedule = [
				...currentSchedule.slice(0, dayIndex),
				updatedDay,
				...currentSchedule.slice(dayIndex + 1)
			]

			dispatch(EDIT_TRANSFER_EVENT_OR_RESTAURANT(updatedSchedule))
		} else if (['lunch', 'dinner'].includes(typeEvent)) {
			const eventKey = typeEvent as 'lunch' | 'dinner'
			const restaurants = dayToUpdate[eventKey]?.restaurants

			if (!restaurants) {
				throw new Error(`Invalid or missing restaurants array for ${eventKey}`)
			}

			const restaurantIndex = restaurants.findIndex(
				(restaurant) => restaurant._id === idEvent
			)

			if (restaurantIndex === -1) {
				throw new Error(
					`Restaurant with ID ${idEvent} not found in ${eventKey}`
				)
			}

			const updatedRestaurant = {
				...restaurants[restaurantIndex],
				transfer: transferEdit
			}

			const updatedRestaurants = [...restaurants]
			updatedRestaurants[restaurantIndex] = updatedRestaurant

			const updatedDay = {
				...dayToUpdate,
				[eventKey]: {
					...dayToUpdate[eventKey],
					restaurants: updatedRestaurants
				}
			}

			const updatedSchedule = [
				...currentSchedule.slice(0, dayIndex),
				updatedDay,
				...currentSchedule.slice(dayIndex + 1)
			]

			dispatch(EDIT_TRANSFER_EVENT_OR_RESTAURANT(updatedSchedule))
		} else {
			throw new Error(`Invalid typeEvent: ${typeEvent}`)
		}
	}

const removeTransferFromScheduleThunk = (
	timeOfEvent: TransferTimeOfEvent,
	transferId: string
): AppThunk => {
	return (dispatch, getState) => {
		const state = getState()
		const currentSchedule = state.currentProject.project.schedule

		// Determine the day index based on the timeOfEvent
		const dayIndex =
			timeOfEvent === 'transfer_in' ? 0 : currentSchedule.length - 1

		// Validate the day index
		if (dayIndex < 0 || dayIndex >= currentSchedule.length) {
			console.error('Invalid day index.')
			return
		}

		// Retrieve the day to update
		const dayToUpdate = currentSchedule[dayIndex]
		const transfersArray = dayToUpdate[timeOfEvent]

		// Validate the transfers array
		if (!Array.isArray(transfersArray)) {
			console.error(`Invalid or missing array for ${timeOfEvent}.`)
			return
		}

		// Log the transfer IDs for debugging
		console.log('Transfer ID to remove:', transferId)
		transfersArray.forEach((transfer) => {
			console.log('Existing Transfer ID:', transfer._id)
		})

		// Filter out the transfer with the specified ID
		const updatedTransfers = transfersArray.filter(
			(transfer: ITransfer) => String(transfer._id) !== String(transferId)
		)

		// Log the updated transfers array
		console.log('Transfers after filtering:', updatedTransfers)

		// Create the updated day object
		const updatedDay = {
			...dayToUpdate,
			[timeOfEvent]: updatedTransfers
		}

		// Construct the updated schedule
		const updatedSchedule = [
			...currentSchedule.slice(0, dayIndex),
			updatedDay,
			...currentSchedule.slice(dayIndex + 1)
		]

		// Log the updated schedule
		console.log('Updated schedule:', updatedSchedule)

		// Dispatch the action to update the schedule
		dispatch(REMOVE_TRANSFER_FROM_SCHEDULE(updatedSchedule))
	}
}
