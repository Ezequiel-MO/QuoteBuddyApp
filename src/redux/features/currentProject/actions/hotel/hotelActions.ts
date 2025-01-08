import {
	ADD_HOTEL_TO_PROJECT,
	REMOVE_HOTEL_OVERNIGHT_FROM_SCHEDULE
} from '../../CurrentProjectSlice'

import { IHotel } from '@interfaces/hotel'
import {
	IAddHotelOvernight,
	IDeletedHotelOvernight,
	IHotelModal,
	UpdateHotelPricePayload,
	UpdateOvernightHotelPricePayload
} from '../../types'
import { useAppDispatch } from 'src/hooks/redux/redux'
import * as thunks from './thunks'

export const useHotelActions = () => {
	const dispatch = useAppDispatch()

	const addHotelToProject = (hotel: IHotel) => {
		dispatch(ADD_HOTEL_TO_PROJECT(hotel))
	}

	const removeHotelFromProject = (hotelId: string) => {
		dispatch(thunks.removeHotelFromProjectThunk(hotelId))
	}

	const addHotelOvernightToSchedule = (addHotel: IAddHotelOvernight) => {
		dispatch(thunks.addHotelOvernightToScheduleThunk(addHotel))
	}

	const removeHotelOvernightSchedule = (
		removeHotel: IDeletedHotelOvernight
	) => {
		dispatch(REMOVE_HOTEL_OVERNIGHT_FROM_SCHEDULE(removeHotel))
	}

	const updateHotelPrice = (payload: UpdateHotelPricePayload) => {
		dispatch(thunks.updateHotelPriceThunk(payload))
	}

	const editModalHotel = (hotelModal: IHotelModal) => {
		dispatch(thunks.editModalHotelThunk(hotelModal))
	}

	const editModalHotelOvernight = (hotelModal: IHotelModal) => {
		dispatch(thunks.editOvernightHotelModalThunk(hotelModal))
	}

	const updateOvernightHotelPrice = (
		payload: UpdateOvernightHotelPricePayload
	) => {
		dispatch(thunks.updateOvernightHotelPriceThunk(payload))
	}

	return {
		addHotelToProject,
		removeHotelFromProject,
		addHotelOvernightToSchedule,
		removeHotelOvernightSchedule,
		updateHotelPrice,
		editModalHotel,
		editModalHotelOvernight,
		updateOvernightHotelPrice
	}
}
