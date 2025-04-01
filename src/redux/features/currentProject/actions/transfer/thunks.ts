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
	UpdateTransferNotePayload,
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

// src/redux/features/currentProject/actions/transfer/thunks.ts
export const updateTransferBudgetNoteThunk =
	(payload: UpdateTransferNotePayload): AppThunk =>
	(dispatch, getState) => {
		const { timeOfEvent, transferId, budgetNotes, transferType, date } = payload
		let noteKey: string = ''

		// Set the appropriate note key based on transfer type
		if (transferType === 'main') {
			noteKey = 'budgetNotes'
		} else if (transferType === 'meet_greet') {
			noteKey = 'meetGreetBudgetNotes'
		} else if (transferType === 'assistance') {
			noteKey = 'assistanceBudgetNotes'
		} else if (transferType === 'dispatch') {
			noteKey = 'dispatchBudgetNotes'
		}

		// Validate parameters
		if (!timeOfEvent || !transferId || !transferType) {
			console.error('Invalid parameters for updateTransferBudgetNoteThunk')
			return
		}

		// Get current state
		const state = getState()
		const currentSchedule = state.currentProject.project.schedule

		// Create a deep copy of the schedule
		const updatedSchedule = JSON.parse(JSON.stringify(currentSchedule))

		if (timeOfEvent === 'transfer_in') {
			// Update the first day's transfer_in array
			updatedSchedule[0].transfer_in = updatedSchedule[0].transfer_in.map(
				(transfer: ITransfer) => {
					if (transfer._id === transferId) {
						return {
							...transfer,
							[noteKey]: budgetNotes
						}
					}
					return transfer
				}
			)
		} else if (timeOfEvent === 'transfer_out') {
			// Update the last day's transfer_out array
			const lastIndex = updatedSchedule.length - 1
			updatedSchedule[lastIndex].transfer_out = updatedSchedule[
				lastIndex
			].transfer_out.map((transfer: ITransfer) => {
				if (transfer._id === transferId) {
					return {
						...transfer,
						[noteKey]: budgetNotes
					}
				}
				return transfer
			})
		} else if (
			// Handle event/restaurant transfer types
			timeOfEvent.startsWith('transfer_morningEvents') ||
			timeOfEvent.startsWith('transfer_afternoonEvents') ||
			timeOfEvent.startsWith('transfer_lunch') ||
			timeOfEvent.startsWith('transfer_dinner')
		) {
			// Extract event type (e.g., 'morningEvents' from 'transfer_morningEvents')
			const eventType = timeOfEvent.split('_')[1]

			// Determine the day index from the date string
			let dayIndex: number | undefined

			if (date) {
				const daySchedule = date.split(' ')
				switch (daySchedule[0]) {
					case 'Arrival':
						dayIndex = 0
						break
					case 'Day':
						dayIndex = parseInt(daySchedule[1]) - 1
						break
					case 'Departure':
						dayIndex = updatedSchedule.length - 1
						break
					default:
						// Try to find day by date
						const dayByDate: number = updatedSchedule.findIndex(
							(day: IDay) => day.date === date
						)
						dayIndex = dayByDate !== -1 ? dayByDate : undefined
						break
				}
			}

			// If we couldn't determine day index from date, try from the schedule
			if (dayIndex === undefined) {
				console.warn(
					`Could not determine day index from date: ${date}, searching in schedule.`
				)
				// Search all days for the transfer
				for (let i = 0; i < updatedSchedule.length; i++) {
					const day = updatedSchedule[i]
					// Check if the transfer exists in this day's events
					if (
						eventType === 'morningEvents' ||
						eventType === 'afternoonEvents'
					) {
						const events = day[eventType]?.events || []
						for (const event of events) {
							if (
								event.transfer &&
								event.transfer.some((t: ITransfer) => t._id === transferId)
							) {
								dayIndex = i
								break
							}
						}
					} else if (eventType === 'lunch' || eventType === 'dinner') {
						const restaurants = day[eventType]?.restaurants || []
						for (const restaurant of restaurants) {
							if (
								restaurant.transfer &&
								restaurant.transfer.some((t: ITransfer) => t._id === transferId)
							) {
								dayIndex = i
								break
							}
						}
					}

					if (dayIndex !== undefined) break
				}
			}

			// If we still don't have a day index, we can't proceed
			if (dayIndex === undefined) {
				console.error(
					`Could not determine day index for transfer: ${transferId} in ${timeOfEvent}`
				)
				return
			}

			// Ensure valid day index
			if (dayIndex < 0 || dayIndex >= updatedSchedule.length) {
				console.error(
					`Invalid day index: ${dayIndex} for timeOfEvent: ${timeOfEvent}`
				)
				return
			}

			// Handle different event types
			if (eventType === 'morningEvents' || eventType === 'afternoonEvents') {
				// Find the event with this transfer
				const events = updatedSchedule[dayIndex][eventType]?.events || []
				let updated = false

				for (const event of events) {
					if (event.transfer) {
						// Update the transfer in the event
						event.transfer = event.transfer.map((transfer: ITransfer) => {
							if (transfer._id === transferId) {
								updated = true
								return {
									...transfer,
									[noteKey]: budgetNotes
								}
							}
							return transfer
						})
					}
				}

				if (!updated) {
					console.warn(
						`Could not find transfer ${transferId} in any ${eventType}`
					)
				}
			} else if (eventType === 'lunch' || eventType === 'dinner') {
				// Find the restaurant with this transfer
				const restaurants =
					updatedSchedule[dayIndex][eventType]?.restaurants || []
				let updated = false

				for (const restaurant of restaurants) {
					if (restaurant.transfer) {
						// Update the transfer in the restaurant
						restaurant.transfer = restaurant.transfer.map(
							(transfer: ITransfer) => {
								if (transfer._id === transferId) {
									updated = true
									return {
										...transfer,
										[noteKey]: budgetNotes
									}
								}
								return transfer
							}
						)
					}
				}

				if (!updated) {
					console.warn(
						`Could not find transfer ${transferId} in any ${eventType} restaurant`
					)
				}
			}
		}

		// Dispatch the updated schedule
		dispatch(
			UPDATE_PROJECT_SCHEDULE(
				updatedSchedule,
				`Update Transfer ${transferType} Budget Note for ${timeOfEvent}`
			)
		)
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
