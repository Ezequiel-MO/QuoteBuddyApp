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
	IHotelModal,
	TimeOfMeeting
} from '../types'
import { useAppDispatch } from 'src/hooks/redux/redux'
import { AppThunk } from 'src/redux/store'
import { IDay } from '@interfaces/project'
import { IMeeting } from '@interfaces/meeting'

export const useHotelActions = () => {
	const dispatch = useAppDispatch()

	const addHotelToProject = (hotel: IHotel) => {
		dispatch(ADD_HOTEL_TO_PROJECT(hotel))
	}

	const removeHotelFromProject = (hotelId: string) => {
		dispatch(removeHotelFromProjectThunk(hotelId))
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
		dispatch(editModalHotelThunk(hotelModal))
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

const editModalHotelThunk =
	(hotelModal: IHotelModal): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const {
			pricesEdit,
			textContentEdit,
			imageContentUrlEdit,
			meetingImageContentUrl,
			meetingDetails,
			id
		} = hotelModal
		const hotels = state.currentProject.project.hotels
		const hotelIndex = hotels.findIndex((hotel) => hotel._id === id)

		if (hotelIndex === -1) {
			console.error('ERROR! Hotel not found')
			return
		}

		const updatedHotel = {
			...hotels[hotelIndex],
			price: pricesEdit ? [pricesEdit] : hotels[hotelIndex].price,
			textContent: textContentEdit
				? textContentEdit
				: hotels[hotelIndex].textContent,
			imageContentUrl: imageContentUrlEdit
				? imageContentUrlEdit
				: hotels[hotelIndex].imageContentUrl,
			meetingImageContentUrl: meetingImageContentUrl
				? meetingImageContentUrl
				: hotels[hotelIndex].meetingImageContentUrl,
			meetingDetails: meetingDetails
				? meetingDetails
				: hotels[hotelIndex].meetingDetails
		}

		const updatedHotels = [
			...hotels.slice(0, hotelIndex),
			updatedHotel,
			...hotels.slice(hotelIndex + 1)
		]

		dispatch(EDIT_MODAL_HOTEL(updatedHotels))
	}

const removeHotelFromProjectThunk =
	(hotelId: string): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule
		const timesMeeting: TimeOfMeeting[] = [
			'morningMeetings',
			'afternoonMeetings',
			'fullDayMeetings'
		]

		const updatedSchedule: IDay[] = currentSchedule.map((day) => {
			const updatedDay = { ...day }

			timesMeeting.forEach((meetingType) => {
				if (updatedDay[meetingType]) {
					updatedDay[meetingType] = {
						...updatedDay[meetingType],
						meetings: updatedDay[meetingType].meetings.filter(
							(meeting: IMeeting) => meeting.hotel[0] !== hotelId
						)
					}
				}
			})

			return updatedDay
		})

		dispatch(REMOVE_HOTEL_FROM_PROJECT({ hotelId, updatedSchedule }))
	}
