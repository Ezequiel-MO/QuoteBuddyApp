import {
	ADD_HOTEL_TO_PROJECT,
	REMOVE_HOTEL_FROM_PROJECT,
	ADD_HOTEL_OVERNIGHT_TO_SCHEDULE,
	REMOVE_HOTEL_OVERNIGHT_FROM_SCHEDULE,
	EDIT_MODAL_HOTEL,
	EDIT_MODAL_HOTEL_OVERNIGHT
} from '../CurrentProjectSlice'
import { IHotel } from '@interfaces/hotel'
import {
	IAddHotelOvernight,
	IDeletedHotelOvernight,
	IHotelModal
} from '../types'
import { useAppDispatch } from 'src/hooks/redux/redux'

export const useHotelActions = () => {
	const dispatch = useAppDispatch()

	const addHotelToProject = (hotel: IHotel) => {
		dispatch(ADD_HOTEL_TO_PROJECT(hotel))
	}

	const removeHotelFromProject = (hotelId: string) => {
		dispatch(REMOVE_HOTEL_FROM_PROJECT(hotelId))
	}

	const addHotelOvernightToSchedule = (addHotel: IAddHotelOvernight) => {
		dispatch(ADD_HOTEL_OVERNIGHT_TO_SCHEDULE(addHotel))
	}

	const removeHotelOvernightSchedule = (
		removeHotel: IDeletedHotelOvernight
	) => {
		dispatch(REMOVE_HOTEL_OVERNIGHT_FROM_SCHEDULE(removeHotel))
	}

	const editModalHotel = (hotelModal: IHotelModal) => {
		dispatch(EDIT_MODAL_HOTEL(hotelModal))
	}

	const editModalHotelOvernight = (hotelModal: IHotelModal) => {
		dispatch(EDIT_MODAL_HOTEL_OVERNIGHT(hotelModal))
	}

	return {
		addHotelToProject,
		removeHotelFromProject,
		addHotelOvernightToSchedule,
		removeHotelOvernightSchedule,
		editModalHotel,
		editModalHotelOvernight
	}
}
