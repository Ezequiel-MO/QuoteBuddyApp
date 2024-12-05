import { AppThunk } from 'src/redux/store'
import {
	EditTransferEventOrRestaurantPayload,
	IAddItenerayTransfer,
	IRemoveIteneraryTransfer,
	TransferTimeOfEvent
} from '../types'
import {
	ADD_TRANSFER_TO_SCHEDULE,
	REMOVE_ITENERARY_TRANSFER_FROM_SCHEDULE,
	UPDATE_PROJECT_SCHEDULE
} from '../CurrentProjectSlice'
import { ITransfer } from '@interfaces/transfer'
import { useAppDispatch } from 'src/hooks/redux/redux'
import { IActivity, IDay, IMeal } from '@interfaces/project'
import { IEvent } from '@interfaces/event'
import { eventMappings } from '../helpers/eventMappings'
import { IRestaurant } from '@interfaces/restaurant'

export const useTransferActions = () => {
	const dispatch = useAppDispatch()

	const addItineraryTransfer = (addTransfer: IAddItenerayTransfer) => {
		dispatch(addItineraryTransferToScheduleThunk(addTransfer))
	}

	const addTransferToSchedule = (
		timeOfEvent: TransferTimeOfEvent,
		transfers: ITransfer[]
	) => {
		dispatch(ADD_TRANSFER_TO_SCHEDULE({ timeOfEvent, transfers }))
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
		addTransferToSchedule,
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

		dispatch(UPDATE_PROJECT_SCHEDULE(updatedSchedule, 'Add Itinerary Transfer'))
	}
}

const editTransferEventOrRestaurantThunk =
	(eventEdit: EditTransferEventOrRestaurantPayload): AppThunk =>
	(dispatch, getState) => {
		const { typeEvent, dayIndex, idEvent, transferEdit } = eventEdit
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		if (dayIndex < 0 || dayIndex >= currentSchedule.length) {
			throw new Error(`Invalid dayIndex: ${dayIndex}`)
		}

		const dayToUpdate: IDay = currentSchedule[dayIndex]

		const mapping = eventMappings[typeEvent]
		if (!mapping) {
			throw new Error(`Invalid typeEvent: ${typeEvent}`)
		}

		const group = dayToUpdate[mapping.key]
		if (!group) {
			throw new Error(`Invalid or missing ${mapping.key} in day's schedule`)
		}

		const subArray = group[mapping.subKey]

		if (!subArray) {
			throw new Error(`Invalid or missing ${mapping.subKey} in ${mapping.key}`)
		}

		const itemIndex: number = subArray.findIndex(
			(item: IEvent | IRestaurant) => item._id === idEvent
		)

		if (itemIndex === -1) {
			throw new Error(
				`${
					mapping.subKey.charAt(0).toUpperCase() + mapping.subKey.slice(1)
				} with ID ${idEvent} not found in ${mapping.key}`
			)
		}

		const item = subArray[itemIndex]

		if (!item.transfer) {
			throw new Error(`Item does not have a transfer property`)
		}

		const updatedItem: IEvent | IRestaurant = {
			...item,
			transfer: transferEdit
		}

		const updatedSubArray: (IEvent | IRestaurant)[] = subArray.map(
			(subItem: IEvent | IRestaurant, index: number): IEvent | IRestaurant => {
				if (index === itemIndex) {
					return updatedItem
				}
				return subItem
			}
		)

		const updatedGroup: IActivity | IMeal = {
			...group,
			[mapping.subKey]: updatedSubArray
		}

		const updatedDay: IDay = {
			...dayToUpdate,
			[mapping.key]: updatedGroup
		}

		const updatedSchedule: IDay[] = currentSchedule.map(
			(day: IDay, index: number) => {
				if (index === dayIndex) {
					return updatedDay
				}
				return day
			}
		)

		dispatch(
			UPDATE_PROJECT_SCHEDULE(
				updatedSchedule,
				`Edit Transfer ${
					mapping.subKey.charAt(0).toUpperCase() + mapping.subKey.slice(1)
				} - ${mapping.key}`
			)
		)
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
		dispatch(
			UPDATE_PROJECT_SCHEDULE(updatedSchedule, 'Remove Transfer from Schedule')
		)
	}
}
