import { useDispatch, useSelector } from 'react-redux'
import {
	ADD_EVENT_TO_SCHEDULE,
	ADD_HOTEL_TO_PROJECT,
	CLEAR_PROJECT,
	EXPAND_TRANSFERS_TO_OPTIONS,
	REMOVE_EVENT_FROM_SCHEDULE,
	REMOVE_HOTEL_FROM_PROJECT,
	REMOVE_TRANSFER_FROM_SCHEDULE,
	selectCurrentProject,
	DRAG_AND_DROP_EVENT,
	DRAG_AND_DROP_RESTAURANT,
	DRAG_AND_DROP_HOTEL,
	SET_CURRENT_PROJECT,
	EDIT_MODAL_HOTEL,
	ADD_GIFT_TO_PROJECT,
	EDIT_GIFT,
	EDIT_MODAL_EVENT,
	EDIT_MODAL_RESTAURANT,
	EDIT_MODAL_MEETING,
	ADD_INTRO_RESTAURANT,
	ADD_INTRO_EVENT,
	ADD_INTRO_MEETING,
	ADD_TRANSFER_TO_SCHEDULE,
	ADD_TRANSFER_IN_OR_TRANSFER_OUT_TO_SCHEDULE,
	EDIT_TRANSFER_EVENT_OR_RESTAURANT,
	ADD_OR_EDIT_VENUE,
	ADD_ENTERTAINMENT_IN_RESTAURANT,
	DELETED_ENTERTAINMENT_IN_RESTAURANT,
	REMOVE_GIFT_FROM_PROJECT,
	EDIT_ENTERTAINMENT_IN_RESTAURANT
} from '../redux/features/CurrentProjectSlice'

import {
	IEvent,
	IGift,
	IHotel,
	IProject,
	IRestaurant,
	ITransfer,
	IEntertainment,
	IEntertainmentPrice
} from '../interfaces'

type TimeOfEvent = 'transfer_in' | 'transfer_out'

interface IAddEntertainment {
	typeMeal: string
	dayIndex: number
	idRestaurant: string
	entertainmentShow: IEntertainment
}

interface IDeletedEntertainment {
	typeMeal: string
	dayIndex: number
	idRestaurant: string
	idEntertainment: string
}

interface IEditEntertainment {
	typeMeal: string
	dayIndex: number
	idRestaurant: string
	idEntertainment: string
	editPrice: IEntertainmentPrice
}

export const useCurrentProject = () => {
	const dispatch = useDispatch()
	const currentProject = useSelector(selectCurrentProject)

	const setCurrentProject = (project: IProject) => {
		dispatch(SET_CURRENT_PROJECT(project))
	}
	const addHotelToProject = (hotel: IHotel) => {
		dispatch(ADD_HOTEL_TO_PROJECT(hotel))
	}
	const addEventToSchedule = (event: any) => {
		dispatch(ADD_EVENT_TO_SCHEDULE(event))
	}
	const removeHotelFromProject = (hotelId: string) => {
		dispatch(REMOVE_HOTEL_FROM_PROJECT(hotelId))
	}
	const removeTransferFromSchedule = (
		timeOfEvent: string,
		transferId: string
	) => {
		dispatch(REMOVE_TRANSFER_FROM_SCHEDULE({ timeOfEvent, transferId }))
	}
	const removeEventFromSchedule = ({
		dayOfEvent,
		timeOfEvent,
		eventId
	}: {
		dayOfEvent: string
		timeOfEvent: string
		eventId: string
	}) => {
		dispatch(REMOVE_EVENT_FROM_SCHEDULE({ dayOfEvent, timeOfEvent, eventId }))
	}
	const dragAndDropEvent = (event: IEvent) => {
		dispatch(DRAG_AND_DROP_EVENT(event))
	}
	const dragAndDropRestaurant = (restaurant: IRestaurant) => {
		dispatch(DRAG_AND_DROP_RESTAURANT(restaurant))
	}
	const dragAndDropHotel = (hotel: IHotel) => {
		dispatch(DRAG_AND_DROP_HOTEL(hotel))
	}
	const expandTransfersToOptions = () => {
		dispatch(EXPAND_TRANSFERS_TO_OPTIONS())
	}
	const editModalHotel = (hotelModal: any) => {
		dispatch(EDIT_MODAL_HOTEL(hotelModal))
	}
	const addGiftToProject = (gift: IGift) => {
		dispatch(ADD_GIFT_TO_PROJECT(gift))
	}
	const removeGiftFromProject = (giftId: string) => {
		dispatch(REMOVE_GIFT_FROM_PROJECT(giftId))
	}
	const editGift = (gift: IGift) => {
		dispatch(EDIT_GIFT(gift))
	}
	const editModalEvent = (eventModal: any) => {
		dispatch(EDIT_MODAL_EVENT(eventModal))
	}
	const editModalRestaurant = (eventModal: any) => {
		dispatch(EDIT_MODAL_RESTAURANT(eventModal))
	}
	const editModalMeeting = (meetingModal: any) => {
		dispatch(EDIT_MODAL_MEETING(meetingModal))
	}
	const addIntroRestaurant = (introRestaurant: string) => {
		dispatch(ADD_INTRO_RESTAURANT(introRestaurant))
	}
	const addIntroEvent = (introEvent: string) => {
		dispatch(ADD_INTRO_EVENT(introEvent))
	}
	const addIntroMeeting = (introMeeting: string) => {
		dispatch(ADD_INTRO_MEETING(introMeeting))
	}
	const addTransferToSchedule = (
		timeOfEvent: TimeOfEvent,
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
	const addOrEditVenue = (infoRestaurant: any) => {
		dispatch(ADD_OR_EDIT_VENUE(infoRestaurant))
	}
	const addEntertainmentInRestaurant = (
		addEntertainment: IAddEntertainment
	) => {
		dispatch(ADD_ENTERTAINMENT_IN_RESTAURANT(addEntertainment))
	}
	const deletedEntertainmetInRestaurant = (
		deletedEntertainmet: IDeletedEntertainment
	) => {
		dispatch(DELETED_ENTERTAINMENT_IN_RESTAURANT(deletedEntertainmet))
	}
	const editEntertaienmentInRestaurant = (
		editEntertaienment: IEditEntertainment
	) => {
		dispatch(EDIT_ENTERTAINMENT_IN_RESTAURANT(editEntertaienment))
	}
	const clearProject = () => {
		dispatch(CLEAR_PROJECT())
	}

	return {
		currentProject,
		setCurrentProject,
		addHotelToProject,
		addEventToSchedule,
		removeHotelFromProject,
		removeEventFromSchedule,
		removeTransferFromSchedule,
		expandTransfersToOptions,
		dragAndDropEvent,
		dragAndDropRestaurant,
		dragAndDropHotel,
		editModalHotel,
		addGiftToProject,
		removeGiftFromProject,
		editGift,
		editModalEvent,
		editModalRestaurant,
		editModalMeeting,
		addIntroRestaurant,
		addIntroEvent,
		addIntroMeeting,
		addTransferToSchedule,
		addTransferInOrTransferOutSchedule,
		editTransferEventOrRestaurant,
		addOrEditVenue,
		addEntertainmentInRestaurant,
		deletedEntertainmetInRestaurant,
		editEntertaienmentInRestaurant,
		clearProject
	}
}
