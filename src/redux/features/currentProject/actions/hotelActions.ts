import { useDispatch } from 'react-redux'
import {
	ADD_HOTEL_TO_PROJECT,
	REMOVE_HOTEL_FROM_PROJECT,
	ADD_HOTEL_OVERNIGHT_TO_SCHEDULE,
	REMOVE_HOTEL_OVERNIGHT_FROM_SCHEDULE,
	EDIT_MODAL_HOTEL,
	EDIT_MODAL_HOTEL_OVERNIGHT,
	EDIT_HOTEL_PRICE
} from '../CurrentProjectSlice'
import { IHotel } from '@interfaces/hotel'
import {
	EditHotelPriceParams,
	IAddHotelOvernight,
	IDeletedHotelOvernight,
	IHotelModal
} from '../types'

export const useHotelActions = () => {
	const dispatch = useDispatch()

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

	const editHotelPrice = ({
		hotelId,
		DUInr,
		DUIprice,
		DoubleRoomNr,
		DoubleRoomPrice,
		breakfast,
		DailyTax
	}: EditHotelPriceParams) => {
		dispatch(
			EDIT_HOTEL_PRICE({
				hotelId,
				DUInr,
				DUIprice,
				DoubleRoomNr,
				DoubleRoomPrice,
				breakfast,
				DailyTax
			})
		)
	}

	return {
		addHotelToProject,
		removeHotelFromProject,
		addHotelOvernightToSchedule,
		removeHotelOvernightSchedule,
		editModalHotel,
		editModalHotelOvernight,
		editHotelPrice
	}
}
