import {
	EditTransferEventOrRestaurantPayload,
	IAddItenerayTransfer,
	IRemoveIteneraryTransfer,
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
import { REMOVE_ITENERARY_TRANSFER_FROM_SCHEDULE } from '../../CurrentProjectSlice'
import { ITransfer } from '@interfaces/transfer'
import { useAppDispatch } from 'src/hooks/redux/redux'
import * as thunks from './thunks'

export const useTransferActions = () => {
	const dispatch = useAppDispatch()

	const addItineraryTransfer = (addTransfer: IAddItenerayTransfer) => {
		dispatch(thunks.addItineraryTransferToScheduleThunk(addTransfer))
	}
	const addTransferToSchedule = (
		timeOfEvent: TransferTimeOfEvent,
		transfers: ITransfer[]
	) => {
		dispatch(thunks.addTransferToScheduleThunk({ timeOfEvent, transfers }))
	}

	const updateMeetGreetTransferIn = (
		payload: UpdateMeetGreetTransferInPayload
	) => {
		dispatch(thunks.updateMeetGreetTransferInThunk(payload))
	}

	const updateMeetGreetTransferOut = (
		payload: UpdateMeetGreetTransferOutPayload
	) => {
		dispatch(thunks.updateMeetGreetTransferOutThunk(payload))
	}

	const updateAssistanceTransferIn = (
		payload: UpdateAssistanceTransferInPayload
	) => {
		dispatch(thunks.updateAssistanceTransferInThunk(payload))
	}

	const updateAssistanceTransferOut = (
		payload: UpdateAssistanceTransferOutPayload
	) => {
		dispatch(thunks.updateAssistanceTransferOutThunk(payload))
	}

	const updateTransfersIn = (payload: UpdateTransfersInPayload) => {
		dispatch(thunks.updateTransfersInThunk(payload))
	}

	const updateAssistanceTransferActivityRestaurant = (
		payload: UpdateAssistanceTransferActivityRestaurantPayload
	) => {
		dispatch(thunks.updateAssistanceTransferActivityRestaurantThunk(payload))
	}

	const updateTransfersOut = (payload: UpdateTransfersOutPayload) => {
		dispatch(thunks.updateTransfersOutThunk(payload))
	}

	const editTransferEventOrRestaurant = (
		eventEdit: EditTransferEventOrRestaurantPayload
	) => {
		dispatch(thunks.editTransferEventOrRestaurantThunk(eventEdit))
	}

	const updateTransferActivity = (payload: UpdateTransferActivityPayload) => {
		dispatch(thunks.updateTransferActivityThunk(payload))
	}

	const removeIteneraryTransfer = (transfer: IRemoveIteneraryTransfer) => {
		dispatch(REMOVE_ITENERARY_TRANSFER_FROM_SCHEDULE(transfer))
	}

	const removeTransferFromSchedule = (
		timeOfEvent: TransferTimeOfEvent,
		transferId: string
	) => {
		dispatch(thunks.removeTransferFromScheduleThunk(timeOfEvent, transferId))
	}

	return {
		addItineraryTransfer,
		updateMeetGreetTransferIn,
		updateMeetGreetTransferOut,
		updateAssistanceTransferIn,
		updateAssistanceTransferOut,
		updateTransfersIn,
		updateTransfersOut,
		updateAssistanceTransferActivityRestaurant,
		removeTransferFromSchedule,
		addTransferToSchedule,
		editTransferEventOrRestaurant,
		updateTransferActivity,
		removeIteneraryTransfer
	}
}
