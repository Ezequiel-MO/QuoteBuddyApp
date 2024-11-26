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

export const useTransferActions = () => {
	const dispatch = useAppDispatch()

	const addItenerayTransfer = (addTransfer: IAddItenerayTransfer) => {
		dispatch(ADD_ITENERARY_TRANSFER_TO_SCHEDULE(addTransfer))
	}

	const removeTransferFromSchedule = (
		timeOfEvent: string,
		transferId: string
	) => {
		dispatch(REMOVE_TRANSFER_FROM_SCHEDULE({ timeOfEvent, transferId }))
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
		addItenerayTransfer,
		removeTransferFromSchedule,
		expandTransfersToOptions,
		addIntroTransferItinerary,
		addTransferToSchedule,
		addTransferInOrTransferOutSchedule,
		editTransferEventOrRestaurant,
		removeIteneraryTransfer
	}
}
