import { AppThunk } from 'src/redux/store'
import {
	IAddHotelOvernight,
	IHotelModal,
	TimeOfMeeting,
	UpdateHotelPricePayload,
	UpdateOvernightHotelPricePayload
} from '../../types'
import { IDay } from '@interfaces/project'
import {
	ADD_HOTEL_OVERNIGHT_TO_SCHEDULE,
	EDIT_MODAL_HOTEL,
	EDIT_MODAL_HOTEL_OVERNIGHT,
	REMOVE_HOTEL_FROM_PROJECT,
	SET_BUDGET_SELECTED_HOTEL,
	SET_BUDGET_SELECTED_HOTEL_COST,
	UPDATE_PROJECT_SCHEDULE
} from '../../CurrentProjectSlice'
import { IHotel } from '@interfaces/hotel'
import { IMeeting } from '@interfaces/meeting'
import { calculateHotelCost } from '../../helpers/budgetCost'

export const addHotelOvernightToScheduleThunk =
	(addHotel: IAddHotelOvernight): AppThunk =>
	(dispatch, getState) => {
		const { dayIndex, hotel } = addHotel
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		if (currentSchedule[dayIndex]) {
			dispatch(ADD_HOTEL_OVERNIGHT_TO_SCHEDULE({ dayIndex, hotel }))
		} else {
			console.error('ERROR! Day not found')
		}
	}

export const editModalHotelThunk =
	(hotelModal: IHotelModal): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const {
			pricesEdit,
			textContentEdit,
			imageContentUrlEdit,
			meetingImageContentUrl,
			meetingDetails,
			id,
			imageUrlCaptionsEdit,
			meetingImageUrlCaptionsEdit
		} = hotelModal
		const hotels = state.currentProject.project.hotels
		const hotelIndex = hotels.findIndex((hotel: IHotel) => hotel._id === id)

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
				: hotels[hotelIndex].meetingDetails,
			imageUrlCaptions : imageUrlCaptionsEdit ? imageUrlCaptionsEdit : hotels[hotelIndex].imageUrlCaptions,
			meetingImageUrlCaptions: meetingImageUrlCaptionsEdit? meetingImageUrlCaptionsEdit : hotels[hotelIndex].meetingImageUrlCaptions
		}

		const updatedHotels = [
			...hotels.slice(0, hotelIndex),
			updatedHotel,
			...hotels.slice(hotelIndex + 1)
		]

		dispatch(EDIT_MODAL_HOTEL(updatedHotels))
	}

export const editOvernightHotelModalThunk =
	(hotelModal: IHotelModal): AppThunk =>
	(dispatch, getState) => {
		const {
			pricesEdit,
			textContentEdit,
			imageContentUrlEdit,
			meetingImageContentUrl,
			meetingDetails,
			dayIndex,
			id,
			imageUrlCaptionsEdit
		} = hotelModal

		const state = getState()

		if (dayIndex === undefined || id === undefined) {
			console.error('ERROR! dayIndex or id is undefined')
			return
		}

		const schedule: IDay[] = state.currentProject.project.schedule
		const overnightHotels: IHotel[] = schedule[dayIndex].overnight.hotels
		const hotelIndex: number = overnightHotels.findIndex((el) => el._id === id)

		if (hotelIndex === -1) {
			console.error('ERROR!, Hotel not found')
			return
		}

		const findHotel: IHotel = overnightHotels[hotelIndex]

		const updatedHotel = {
			...findHotel,
			price: pricesEdit ? [pricesEdit] : findHotel.price,
			texContent: textContentEdit ? textContentEdit : findHotel.textContent,
			imageContentUrl: imageContentUrlEdit
				? imageContentUrlEdit
				: findHotel.imageContentUrl,
			meetingImageContentUrl: meetingImageContentUrl
				? meetingImageContentUrl
				: findHotel.meetingImageContentUrl,
			meetingDetails: meetingDetails ? meetingDetails : findHotel.meetingDetails,
			imageUrlCaptions : imageUrlCaptionsEdit ? imageUrlCaptionsEdit : findHotel.imageUrlCaptions
		}

		const updatedOvernightHotels: IHotel[] = overnightHotels.map((hotel) =>
			hotel._id === id ? updatedHotel : hotel
		)

		dispatch(EDIT_MODAL_HOTEL_OVERNIGHT({ dayIndex, updatedOvernightHotels }))
	}

export const removeHotelFromProjectThunk =
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

export const updateHotelPriceThunk =
	(payload: UpdateHotelPricePayload): AppThunk =>
	(dispatch, getState) => {
		const { value, idHotel, keyHotelPrice } = payload
		const state = getState()
		const currentHotels = state.currentProject.project.hotels

		// Deep copy hotels
		const updatedHotels: IHotel[] = JSON.parse(JSON.stringify(currentHotels))

		// Find the hotel to update
		const hotelToUpdate = updatedHotels.find(
			(hotel: IHotel) => hotel._id === idHotel
		)

		if (
			hotelToUpdate &&
			hotelToUpdate.price &&
			hotelToUpdate.price.length > 0
		) {
			hotelToUpdate.price[0][keyHotelPrice] = value
		} else {
			console.warn(`Hotel with id ${idHotel} not found or price not available.`)
			return
		}

		// Dispatch the action to update project.hotels
		dispatch(EDIT_MODAL_HOTEL(updatedHotels))

		// If budget.selectedHotel is the same hotel, update its cost
		const selectedHotel = state.currentProject.budget.selectedHotel
		if (selectedHotel && selectedHotel._id === idHotel) {
			const nights = state.currentProject.project.schedule.length - 1
			const cost: number = calculateHotelCost(hotelToUpdate, nights)
			dispatch(SET_BUDGET_SELECTED_HOTEL_COST(cost))
			dispatch(SET_BUDGET_SELECTED_HOTEL(hotelToUpdate))
		}
	}

export const updateOvernightHotelPriceThunk =
	({ dayIndex, value, id, key }: UpdateOvernightHotelPricePayload): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const currentSchedule: IDay[] = state.currentProject.project.schedule

		// Deep copy of the schedule
		const copySchedule: IDay[] = JSON.parse(JSON.stringify(currentSchedule))

		// Find the index of the hotel to update
		const findIndexHotel = copySchedule[dayIndex].overnight.hotels.findIndex(
			(el: IHotel) => el._id === id
		)

		if (findIndexHotel === -1) {
			// Hotel not found; optionally handle this case as needed
			console.warn(`Hotel with id ${id} not found on dayIndex ${dayIndex}`)
			return
		}

		const overnightHotel =
			copySchedule[dayIndex].overnight.hotels[findIndexHotel]

		// Ensure that price array and the first element exist
		if (
			Array.isArray(overnightHotel.price) &&
			overnightHotel?.price.length > 0
		) {
			// Update the specified key in the first price object
			overnightHotel.price[0][key] = Number(value)
		} else {
			// Optionally handle cases where price array is missing or empty
			console.warn(
				`Price array is missing or empty for hotel id ${id} on dayIndex ${dayIndex}`
			)
		}

		// Dispatch the updated schedule
		dispatch(
			UPDATE_PROJECT_SCHEDULE(copySchedule, 'Update overnight hotel price')
		)
	}
