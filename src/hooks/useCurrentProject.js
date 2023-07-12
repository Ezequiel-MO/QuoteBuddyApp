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
	selectMeetGreetOrDispatch,
	selectAssistance,
	ADD_MEETGREET_OR_DISPATCH,
	ADD_ASSISTANCE,
	REMOVE_MEETGREET_OR_DISPATCH,
	REMOVE_ASSISTANCE,
	EDIT_MODAL_HOTEL,
	ADD_GIFT_TO_PROJECT,
	EDIT_GIFT,
	EDIT_MODAL_EVENT,
	EDIT_MODAL_RESTAURANT,
	ADD_INTRO_RESTAURANT,
	ADD_INTRO_EVENT,
	ADD_INTRO_MEETING,
	ADD_TRANSFER_IN_OR_TRANSFER_OUT_TO_SCHEDULE,
	REMOVE_GIFT_FROM_PROJECT
} from '../redux/features/CurrentProjectSlice'

export const useCurrentProject = () => {
	const dispatch = useDispatch()
	const currentProject = useSelector(selectCurrentProject)
	const meetGreetOrDispatch = useSelector(selectMeetGreetOrDispatch)
	const assistance = useSelector(selectAssistance)

	const setCurrentProject = (project) => {
		dispatch(SET_CURRENT_PROJECT(project))
	}
	const addHotelToProject = (hotel) => {
		dispatch(ADD_HOTEL_TO_PROJECT(hotel))
	}
	const addEventToSchedule = (event) => {
		dispatch(ADD_EVENT_TO_SCHEDULE(event))
	}
	const removeHotelFromProject = (hotelId) => {
		dispatch(REMOVE_HOTEL_FROM_PROJECT(hotelId))
	}
	const removeTransferFromSchedule = (typeOfTransfer) => {
		dispatch(REMOVE_TRANSFER_FROM_SCHEDULE(typeOfTransfer))
	}
	const removeEventFromSchedule = (event) => {
		dispatch(REMOVE_EVENT_FROM_SCHEDULE(event))
	}
	const dragAndDropEvent = (event) => {
		dispatch(DRAG_AND_DROP_EVENT(event))
	}
	const dragAndDropRestaurant = (restaurant) => {
		dispatch(DRAG_AND_DROP_RESTAURANT(restaurant))
	}
	const dragAndDropHotel = (hotel) => {
		dispatch(DRAG_AND_DROP_HOTEL(hotel))
	}
	const expandTransfersToOptions = () => {
		dispatch(EXPAND_TRANSFERS_TO_OPTIONS())
	}
	const addMeetGreetOrDispatch = (freeLancer) => {
		dispatch(ADD_MEETGREET_OR_DISPATCH(freeLancer))
	}
	const addAssistance = (freeLancer) => {
		dispatch(ADD_ASSISTANCE(freeLancer))
	}
	const removeMeetGreetOrDispatch = (id) => {
		dispatch(REMOVE_MEETGREET_OR_DISPATCH(id))
	}
	const removeAssistance = (id) => {
		dispatch(REMOVE_ASSISTANCE(id))
	}
	const editModalHotel = (hotelModal) => {
		dispatch(EDIT_MODAL_HOTEL(hotelModal))
	}
	const addGiftToProject = (gift) => {
		dispatch(ADD_GIFT_TO_PROJECT(gift))
	}
	const removeGiftFromProject = (giftId) => {
		dispatch(REMOVE_GIFT_FROM_PROJECT(giftId))
	}
	const editGift = (gift) => {
		dispatch(EDIT_GIFT(gift))
	}
	const editModalEvent = (eventModal) => {
		dispatch(EDIT_MODAL_EVENT(eventModal))
	}
	const editModalRestaurant = (eventModal) => {
		dispatch(EDIT_MODAL_RESTAURANT(eventModal))
	}
	const addIntroRestaurant = (introRestaurant) => {
		dispatch(ADD_INTRO_RESTAURANT(introRestaurant))
	}
	const addIntroEvent = (introEvent) => {
		dispatch(ADD_INTRO_EVENT(introEvent))
	}
	const addIntroMeeting = (introMeeting) =>{
		dispatch(ADD_INTRO_MEETING(introMeeting))
	}
 	const addTransferInOrTransferOutSchedule = (transfer) => {
		dispatch(ADD_TRANSFER_IN_OR_TRANSFER_OUT_TO_SCHEDULE(transfer))
	}
	const clearProject = () => {
		dispatch(CLEAR_PROJECT())
	}

	return {
		currentProject,
		meetGreetOrDispatch,
		assistance,
		addAssistance,
		addMeetGreetOrDispatch,
		removeMeetGreetOrDispatch,
		removeAssistance,
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
		addIntroRestaurant,
		addIntroEvent,
		addIntroMeeting,
		addTransferInOrTransferOutSchedule,
		clearProject
	}
}
