import { AppThunk } from 'src/redux/store'
import {
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
	EXPAND_TRANSFERS_TO_OPTIONS,
	REMOVE_ITENERARY_TRANSFER_FROM_SCHEDULE,
	REMOVE_TRANSFER_FROM_SCHEDULE
} from '../CurrentProjectSlice'
import { ITransfer } from '@interfaces/transfer'
import { useAppDispatch } from 'src/hooks/redux/redux'
import { IDay } from '@interfaces/project'

export const useTransferActions = () => {
	const dispatch = useAppDispatch()

	const addItineraryTransfer = (addTransfer: IAddItenerayTransfer) => {
		dispatch(addItineraryTransferToScheduleThunk(addTransfer))
	}

	const removeTransferFromSchedule = (
		timeOfEvent: TransferTimeOfEvent,
		transferId: string
	) => {
		dispatch(removeTransferFromScheduleThunk(timeOfEvent, transferId))
	}

	const expandTransfersToOptions = () => {
		dispatch(EXPAND_TRANSFERS_TO_OPTIONS())
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

	const editTransferEventOrRestaurant = (eventEdit: any) => {
		dispatch(EDIT_TRANSFER_EVENT_OR_RESTAURANT(eventEdit))
	}

	const removeIteneraryTransfer = (transfer: IRemoveIteneraryTransfer) => {
		dispatch(REMOVE_ITENERARY_TRANSFER_FROM_SCHEDULE(transfer))
	}

	return {
		addItineraryTransfer,
		removeTransferFromSchedule,
		expandTransfersToOptions,
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
