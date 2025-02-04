import { AppThunk } from 'src/redux/store'
import {
	EditTransferEventOrRestaurantPayload,
	IAddItenerayTransfer,
	TransferTimeOfEvent,
	UpdateAssistanceTransferActivityRestaurantPayload,
	UpdateAssistanceTransferInPayload,
	UpdateAssistanceTransferOutPayload,
	UpdateMeetGreetTransferInPayload,
	UpdateMeetGreetTransferOutPayload,
	UpdateTransferActivityPayload,
	UpdateTransfersInPayload,
	UpdateTransfersOutPayload
} from '../../types'
import { UPDATE_PROJECT_SCHEDULE } from '../../CurrentProjectSlice'
import { ITransfer } from '@interfaces/transfer'
import { IActivity, IDay, IMeal } from '@interfaces/project'
import { eventMappings } from '../../helpers/eventMappings'
import { IRestaurant } from '@interfaces/restaurant'
import { IEvent } from '@interfaces/event'

export const addItineraryTransferToScheduleThunk = (
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

		const updatedSchedule = currentSchedule.map((day: IDay, index: number) => {
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

export const addTransferToScheduleThunk =
	(payload: {
		timeOfEvent: TransferTimeOfEvent
		transfers: ITransfer[]
	}): AppThunk =>
	(dispatch, getState) => {
		const { timeOfEvent, transfers } = payload
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		let dayIndex: number

		if (timeOfEvent === 'transfer_in') {
			dayIndex = 0
		} else if (timeOfEvent === 'transfer_out') {
			dayIndex = currentSchedule.length - 1
		} else {
			console.error('Invalid timeOfEvent:', timeOfEvent)
			return
		}

		if (dayIndex < 0 || dayIndex >= currentSchedule.length) {
			console.error('Invalid dayIndex:', dayIndex)
			return
		}

		const mapping = eventMappings[timeOfEvent]

		if (!mapping) {
			console.error('Invalid timeOfEvent:', timeOfEvent)
			return
		}

		const updatedSchdule: IDay[] = [...currentSchedule]

		updatedSchdule[dayIndex] = {
			...updatedSchdule[dayIndex],
			[mapping.key]: transfers
		}

		dispatch(
			UPDATE_PROJECT_SCHEDULE(updatedSchdule, 'Add Transfer to Schedule')
		)
	}

export const updateMeetGreetTransferOutThunk =
	({ value, key }: UpdateMeetGreetTransferOutPayload): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		// Deep copy of the schedule
		const copySchedule: IDay[] = JSON.parse(JSON.stringify(currentSchedule))
		const lastIndex = copySchedule.length - 1
		const transfersOut = copySchedule[lastIndex].transfer_out
		for (let i = 0; i < transfersOut.length; i++) {
			transfersOut[i][key] = value
		}

		dispatch(
			UPDATE_PROJECT_SCHEDULE(copySchedule, 'Update meet greet transfer out')
		)
	}

export const updateMeetGreetTransferInThunk =
	({ unit, key }: UpdateMeetGreetTransferInPayload): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		const copySchedule: IDay[] = JSON.parse(JSON.stringify(currentSchedule))

		const transfersIn = copySchedule[0].transfer_in
		for (let i = 0; i < transfersIn.length; i++) {
			transfersIn[i][key] = unit
		}

		dispatch(
			UPDATE_PROJECT_SCHEDULE(copySchedule, 'Update meet greet transfer in')
		)
	}

export const updateAssistanceTransferInThunk =
	({ value, key }: UpdateAssistanceTransferInPayload): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule
		const copySchedule: IDay[] = JSON.parse(JSON.stringify(currentSchedule))

		const transfersIn = copySchedule[0].transfer_in
		for (let i = 0; i < transfersIn.length; i++) {
			transfersIn[i][key] = value
		}

		dispatch(
			UPDATE_PROJECT_SCHEDULE(copySchedule, 'Update assistance transfer in')
		)
	}

export const updateAssistanceTransferOutThunk =
	({ value, key }: UpdateAssistanceTransferOutPayload): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule
		const copySchedule: IDay[] = JSON.parse(JSON.stringify(currentSchedule))
		const lastIndex = copySchedule.length - 1
		const transfersOut = copySchedule[lastIndex].transfer_out

		for (let i = 0; i < transfersOut.length; i++) {
			transfersOut[i][key] = value
		}

		dispatch(
			UPDATE_PROJECT_SCHEDULE(copySchedule, 'Update assistance transfer out')
		)
	}

export const updateAssistanceTransferActivityRestaurantThunk =
	({
		value,
		dayIndex,
		typeEvent,
		key,
		id
	}: UpdateAssistanceTransferActivityRestaurantPayload): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		const copySchedule: IDay[] = JSON.parse(JSON.stringify(currentSchedule))

		const typesMeals = ['lunch', 'dinner']
		const typesActivities = ['morningEvents', 'afternoonEvents']

		if (typesMeals.includes(typeEvent)) {
			const restaurants: IRestaurant[] =
				copySchedule[dayIndex][typeEvent].restaurants
			const restaurant = restaurants.find((el) => el._id === id) as IRestaurant
			if (restaurant) {
				const transfers: ITransfer[] = restaurant.transfer || []
				for (let i = 0; i < transfers.length; i++) {
					transfers[i][key] = value
				}
			}
		}

		if (typesActivities.includes(typeEvent)) {
			const activities: IEvent[] = copySchedule[dayIndex][typeEvent].events
			const activity = activities.find((el) => el._id === id) as IEvent
			if (activity) {
				const transfers: ITransfer[] = activity.transfer || []
				for (let i = 0; i < transfers.length; i++) {
					transfers[i][key] = value
				}
			}
		}

		dispatch(
			UPDATE_PROJECT_SCHEDULE(
				copySchedule,
				'Update assistance transfer for activity/restaurant'
			)
		)
	}

export const updateTransfersInThunk =
	({ value, typeUpdate, id }: UpdateTransfersInPayload): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		// Deep clone of the schedule
		const copySchedule: IDay[] = JSON.parse(JSON.stringify(currentSchedule))

		if (typeUpdate === 'priceTransfer') {
			const transfersIn = copySchedule[0].transfer_in.map((el: any) => {
				if (el._id === id) {
					el.transfer_in = value
				}
				return el
			})
			copySchedule[0].transfer_in = transfersIn
		}

		if (typeUpdate === 'transfer') {
			const findTransferIn = copySchedule[0].transfer_in.find(
				(el: any) => el._id === id
			)
			const findIndexTransferIn = copySchedule[0].transfer_in.findIndex(
				(el: any) => el._id === id
			)

			const transfersIn = copySchedule[0].transfer_in.map((el: any) => {
				if (el?._id === findTransferIn?._id) {
					return []
				}
				return el
			})

			const updateTransferIn = []
			for (let i = 0; i < value; i++) {
				if (findTransferIn) {
					updateTransferIn.push(findTransferIn)
				}
			}

			transfersIn[findIndexTransferIn] = updateTransferIn
			copySchedule[0].transfer_in = transfersIn.flat(2)
		}

		dispatch(UPDATE_PROJECT_SCHEDULE(copySchedule, 'Update transfers in'))
	}

export const updateTransfersOutThunk =
	({ value, typeUpdate, id }: UpdateTransfersOutPayload): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		// Deep copy of the schedule to avoid direct mutations
		const copySchedule: IDay[] = JSON.parse(JSON.stringify(currentSchedule))
		const lastIndex = copySchedule.length - 1

		if (typeUpdate === 'priceTransfer') {
			const transfersOut = copySchedule[lastIndex].transfer_out.map(
				(el: any) => {
					if (el._id === id) {
						el.transfer_out = value
					}
					return el
				}
			)
			copySchedule[lastIndex].transfer_out = transfersOut
		}

		if (typeUpdate === 'transfer') {
			const findTransferOut = copySchedule[lastIndex].transfer_out.find(
				(el: any) => el._id === id
			)
			const findIndexTransferOut = copySchedule[
				lastIndex
			].transfer_out.findIndex((el: any) => el._id === id)

			const transfersOut = copySchedule[lastIndex].transfer_out.map(
				(el: any) => {
					if (el?._id === findTransferOut?._id) {
						return []
					}
					return el
				}
			)

			const updateTransferOut = []
			for (let i = 0; i < value; i++) {
				if (findTransferOut) {
					updateTransferOut.push(findTransferOut)
				}
			}

			transfersOut[findIndexTransferOut] = updateTransferOut
			copySchedule[lastIndex].transfer_out = transfersOut.flat(2)
		}

		dispatch(UPDATE_PROJECT_SCHEDULE(copySchedule, 'Update transfers out'))
	}

export const editTransferEventOrRestaurantThunk =
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

export const updateTransferActivityThunk =
	({
		value,
		dayIndex,
		typeEvent,
		idActivity,
		typeUpdate,
		idTransfer,
		serviceKey
	}: UpdateTransferActivityPayload): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		// Deep copy the schedule so we don't mutate directly
		const copySchedule: IDay[] = JSON.parse(JSON.stringify(currentSchedule))

		// Find the activity array
		const activities: IEvent[] = copySchedule[dayIndex][typeEvent].events
		const activity = activities.find((el) => el._id === idActivity) as IEvent

		if (typeUpdate === 'transfer' && activity?.transfer) {
			// 1) Locate the specific transfer to replicate
			const findIndexTransfer = activity.transfer.findIndex(
				(t) => t._id === idTransfer && t.selectedService === serviceKey
			)

			if (findIndexTransfer !== -1) {
				// 2) Grab the found transfer
				const foundTransfer = activity.transfer[findIndexTransfer]

				// 3) Remove the single original from the array
				activity.transfer.splice(findIndexTransfer, 1)

				// 4) Create `value` copies
				const repeatedTransfers: ITransfer[] = Array.from(
					{ length: value },
					() => ({
						...foundTransfer
					})
				)

				// 5) Append them
				activity.transfer.push(...repeatedTransfers)
			}
		}

		// Dispatch the updated schedule
		dispatch(UPDATE_PROJECT_SCHEDULE(copySchedule, 'Update transfer activity'))
	}

export const removeTransferFromScheduleThunk = (
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
