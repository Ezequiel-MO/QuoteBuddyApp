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
	SET_CURRENT_PROJECT,
	selectMeetGreetOrDispatch,
	selectAssistance,
	ADD_MEETGREET_OR_DISPATCH,
	ADD_ASSISTANCE
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
	const expandTransfersToOptions = () => {
		dispatch(EXPAND_TRANSFERS_TO_OPTIONS())
	}
	const addMeetGreetOrDispatch = (freeLancer) => {
		dispatch(ADD_MEETGREET_OR_DISPATCH(freeLancer))
	}
	const addAssistance = (freeLancer) =>{
		dispatch(ADD_ASSISTANCE(freeLancer))
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
		setCurrentProject,
		addHotelToProject,
		addEventToSchedule,
		removeHotelFromProject,
		removeEventFromSchedule,
		removeTransferFromSchedule,
		expandTransfersToOptions,
		dragAndDropEvent,
		clearProject
	}
}
