import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
	AddHotelOvernightPayload,
	DragAndDropHotelOvernightPayload,
	IInitialState,
	TimeOfEvent,
	TimeOfMeeting,
	TransfersAction
} from './types'
import { projectValidationSchema } from '@screens/projects/specs/ProjectValidation'
import * as Yup from 'yup'
import { IGift } from '@interfaces/gift'
import { IDay } from '@interfaces/project'
import { IHotel } from '@interfaces/hotel'

const initialState: IInitialState = {
	project: JSON.parse(localStorage.getItem('currentProject') || '{}'),
	modalIsOpen: false,
	errors: {}
}

export const currentProjectSlice = createSlice({
	name: 'currentProject',
	initialState,
	reducers: {
		SET_CURRENT_PROJECT: (state: IInitialState, action) => {
			state.project = action.payload
		},
		ADD_HOTEL_TO_PROJECT: (state, action) => {
			state.project.hotels = [...state.project.hotels, action.payload]
		},
		ADD_HOTEL_OVERNIGHT_TO_SCHEDULE: (
			state,
			action: PayloadAction<AddHotelOvernightPayload>
		) => {
			const { dayIndex, hotel } = action.payload
			state.project.schedule[dayIndex].overnight.hotels = [
				...state.project.schedule[dayIndex]?.overnight.hotels,
				hotel
			]
		},
		ADD_EVENT_TO_SCHEDULE: (state, action: PayloadAction<IDay[]>) => {
			state.project.schedule = action.payload
		},
		ADD_GIFT_TO_PROJECT: (state, action) => {
			const gift: IGift = action.payload
			if (!gift.qty) {
				gift.qty = 1
			}
			state.project.gifts = [...state.project.gifts, gift]
		},
		ADD_ITENERARY_TRANSFER_TO_SCHEDULE: (
			state,
			action: PayloadAction<IDay[]>
		) => {
			state.project.schedule = action.payload
		},
		ADD_EVENT_TO_ITENERARY: (state, action: PayloadAction<IDay[]>) => {
			state.project.schedule = action.payload
		},
		REMOVE_GIFT_FROM_PROJECT: (state, action) => {
			const { id } = action.payload
			state.project.gifts = state.project.gifts.filter((el) => el._id !== id)
		},
		REMOVE_HOTEL_FROM_PROJECT: (
			state,
			action: PayloadAction<{ hotelId: string; updatedSchedule: IDay[] }>
		) => {
			const { hotelId, updatedSchedule } = action.payload
			state.project.schedule = updatedSchedule
			state.project.hotels = state.project.hotels.filter(
				(hotel) => hotel._id !== hotelId
			)
		},
		REMOVE_HOTEL_OVERNIGHT_FROM_SCHEDULE: (state, action) => {
			const { dayIndex, hotelId } = action.payload
			console.log('dayIndex', dayIndex)
			console.log('hotelId', hotelId)
			const hotelsFilter = state.project.schedule[
				dayIndex
			].overnight.hotels.filter((el) => el._id !== hotelId)
			state.project.schedule[dayIndex].overnight.hotels = hotelsFilter
		},
		REMOVE_EVENT_FROM_SCHEDULE: (state, action: PayloadAction<IDay[]>) => {
			state.project.schedule = action.payload
		},
		REMOVE_EVENT_TO_ITENERARY: (state, action: PayloadAction<IDay[]>) => {
			state.project.schedule = action.payload
		},
		REMOVE_TRANSFER_FROM_SCHEDULE: (state, action: PayloadAction<IDay[]>) => {
			state.project.schedule = action.payload
		},
		REMOVE_ITENERARY_TRANSFER_FROM_SCHEDULE: (state, action) => {
			const { dayIndex, transferId } = action.payload
			const transfers = [
				...state.project.schedule[dayIndex].itinerary.itinerary
			]
			const transfersFilter = transfers.filter((el) => el._id !== transferId)
			state.project.schedule[dayIndex].itinerary.itinerary = transfersFilter
		},
		DRAG_AND_DROP_EVENT: (state, action) => {
			const { newSchedule } = action.payload
			if (newSchedule) {
				state.project.schedule = newSchedule
				return
			}
		},
		DRAG_AND_DROP_RESTAURANT: (state, action) => {
			const { newSchedule } = action.payload
			if (newSchedule) {
				state.project.schedule = newSchedule
				return
			}
		},
		DRAG_AND_DROP_HOTEL: (state, action) => {
			const { startHotelIndex, endHotelIndex } = action.payload
			const copyHotels = [...state.project.hotels]
			const [hotelDragStart] = copyHotels.splice(startHotelIndex, 1)
			copyHotels.splice(endHotelIndex, 0, hotelDragStart)
			state.project.hotels = copyHotels
		},
		DRAG_AND_DROP_HOTEL_OVERNIGHT: (
			state,
			action: PayloadAction<DragAndDropHotelOvernightPayload>
		) => {
			const { newSchedule } = action.payload
			if (newSchedule) {
				state.project.schedule = newSchedule
				return
			}
		},
		EDIT_MODAL_HOTEL: (state, action: PayloadAction<IHotel[]>) => {
			state.project.hotels = action.payload
		},
		EDIT_MODAL_HOTEL_OVERNIGHT: (state, action) => {
			const {
				pricesEdit,
				textContentEdit,
				imageContentUrlEdit,
				meetingImageContentUrl,
				meetingDetails,
				dayIndex,
				id
			} = action.payload
			const hotelIndex = state.project.schedule[
				dayIndex
			].overnight.hotels.findIndex((el) => el._id === id)
			const findHotel = state.project.schedule[dayIndex].overnight.hotels.find(
				(el) => el._id === id
			)
			if (findHotel === undefined) throw new Error('ERROR! Hotel not found')
			if (pricesEdit) {
				findHotel.price[0] = pricesEdit
			}
			if (textContentEdit) {
				findHotel.textContent = textContentEdit
			}
			if (imageContentUrlEdit) {
				findHotel.imageContentUrl = imageContentUrlEdit
			}
			//  "meetingImageContentUrl" AND "meetingDetails" EDITO EN "AddMeetingsImagesModal.jsx"
			if (meetingImageContentUrl) {
				findHotel.meetingImageContentUrl = meetingImageContentUrl
			}
			if (meetingDetails) {
				findHotel.meetingDetails = meetingDetails
			}
			state.project.schedule[dayIndex].overnight.hotels.splice(hotelIndex, 1)
			state.project.schedule[dayIndex].overnight.hotels.splice(
				hotelIndex,
				0,
				findHotel
			)
		},
		EDIT_GIFT: (state, action) => {
			const {
				qty = null,
				indexGift = null,
				price = null,
				textContent = null
			} = action.payload
			if (qty) {
				state.project.gifts[indexGift].qty = qty
			}
			if (price) {
				state.project.gifts[indexGift].price = price
			}
			if (textContent) {
				state.project.gifts[indexGift].textContent = textContent
			}
		},
		EDIT_MODAL_EVENT: (state, action: PayloadAction<IDay[]>) => {
			state.project.schedule = action.payload
		},
		EDIT_MODAL_RESTAURANT: (state, action: PayloadAction<IDay[]>) => {
			state.project.schedule = action.payload
		},
		EDIT_MODAL_MEETING: (state, action: PayloadAction<IDay[]>) => {
			state.project.schedule = action.payload
		},
		ADD_INTRO_RESTAURANT: (state, action: PayloadAction<IDay[]>) => {
			state.project.schedule = action.payload
		},
		ADD_INTRO_EVENT: (state, action: PayloadAction<IDay[]>) => {
			state.project.schedule = action.payload
		},
		ADD_INTRO_MEETING: (state, action) => {
			const { dayIndex, typeEvent, textContent } = action.payload
			const typeOfEventKey = typeEvent as
				| 'morningMeetings'
				| 'afternoonMeetings'
				| 'fullDayMeetings'
			const copyAllEvents = {
				meetings: [
					...state.project.schedule[dayIndex][typeOfEventKey].meetings
				],
				intro: textContent !== '<p><br></p>' ? textContent : ''
			}
			state.project.schedule[dayIndex][typeOfEventKey] = copyAllEvents
		},
		ADD_INTRO_HOTEL_OVERNIGHT: (state, action) => {
			const { dayIndex, typeEvent, textContent } = action.payload
			const typeOfEventKey = typeEvent as 'overnight'
			const copyAllEvents = {
				hotels: [...state.project.schedule[dayIndex][typeOfEventKey].hotels],
				intro: textContent !== '<p><br></p>' ? textContent : ''
			}
			state.project.schedule[dayIndex][typeOfEventKey] = copyAllEvents
		},
		ADD_INTRO_TRANSFER_TO_ITINERARY: (state, action) => {
			const { dayIndex, textContent } = action.payload
			const intro = textContent !== '<p><br></p>' ? textContent : ''
			state.project.schedule[dayIndex].itinerary.intro = intro
		},

		ADD_INTRO_EVENT_TO_ITENERARY: (state, action: PayloadAction<IDay[]>) => {
			state.project.schedule = action.payload
		},
		ADD_TRANSFER_TO_SCHEDULE: (state, action: TransfersAction) => {
			const { timeOfEvent, transfers } = action.payload
			if (timeOfEvent === 'transfer_in') {
				state.project.schedule[0].transfer_in = transfers
				return
			}
			if (timeOfEvent === 'transfer_out') {
				const lastIndex = state.project.schedule.length - 1
				state.project.schedule[lastIndex].transfer_out = transfers
				return
			}
		},
		ADD_TRANSFER_IN_OR_TRANSFER_OUT_TO_SCHEDULE: (state, action) => {
			const { dayOfEvent, timeOfEvent, event } = action.payload
			const dayOfEventKey = dayOfEvent as number
			const timeOfEventKey = timeOfEvent as TimeOfEvent
			state.project.schedule[dayOfEventKey][timeOfEventKey] = event
		},
		EDIT_TRANSFER_EVENT_OR_RESTAURANT: (
			state,
			action: PayloadAction<IDay[]>
		) => {
			state.project.schedule = action.payload
		},
		ADD_OR_EDIT_VENUE: (state, action: PayloadAction<IDay[]>) => {
			state.project.schedule = action.payload
		},
		ADD_ENTERTAINMENT_IN_RESTAURANT: (state, action: PayloadAction<IDay[]>) => {
			state.project.schedule = action.payload
		},
		DELETED_ENTERTAINMENT_IN_RESTAURANT: (
			state,
			action: PayloadAction<IDay[]>
		) => {
			state.project.schedule = action.payload
		},
		EDIT_ENTERTAINMENT_IN_RESTAURANT: (
			state,
			action: PayloadAction<IDay[]>
		) => {
			state.project.schedule = action.payload
		},
		REMOVE_MEETINGS_BY_HOTEL_FROM_PROJECT: (state, action) => {
			const timesMeeting: TimeOfMeeting[] = [
				'morningMeetings',
				'afternoonMeetings',
				'fullDayMeetings'
			]
			const hotelId = action.payload
			for (let i = 0; i < state.project.schedule.length; i++) {
				for (let j = 0; j < timesMeeting.length; j++) {
					state.project.schedule[i][timesMeeting[j]].meetings =
						state.project.schedule[i][timesMeeting[j]].meetings.filter(
							(el) => el.hotel[0] !== hotelId
						)
				}
			}
		},
		HANDLE_PROJECT_INPUT_CHANGE: (
			state,
			action: PayloadAction<{
				name: string
				value: string | boolean
				type?: string
			}>
		) => {
			const { name, value, type } = action.payload

			const newValue =
				type === 'checkbox' || type === 'radio' ? Boolean(value) : value

			state.project = {
				...state.project,
				[name]: newValue
			}
		},
		HANDLE_PROJECT_BLUR: (
			state,
			action: PayloadAction<{
				name: string
				value: string | boolean
				checked?: boolean
				type: string
			}>
		) => {
			const { name, value, checked, type } = action.payload

			try {
				// Validate the field using Yup schema
				projectValidationSchema.validateSyncAt(name, {
					[name]: type === 'checkbox' ? checked : value
				})
				// Clear the error if validation passes
				state.errors[name] = ''
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					// Set the error message if validation fails
					state.errors[name] = err.message
				}
			}
		},
		HANDLE_SCHEDULE_DAYS: (state, action) => {
			const scheduleDays = action.payload
			state.project.schedule = scheduleDays
		},
		ADD_BUDGET_PDF_PROJECT: (state, action) => {
			const pdfUrl = action.payload
			state.project.imageContentUrl = [...pdfUrl]
		},
		DELETED_BUDGET_PDF_PROJECT: (state, action) => {
			console.log(action.payload)
			const pdfUrl = action.payload
			const updateContentUrl = state.project.imageContentUrl.filter(
				(el) => el !== pdfUrl
			)
			state.project.imageContentUrl = updateContentUrl
		},
		CLEAR_PROJECT: (state) => {
			state.project = {
				code: '',
				accountManager: [],
				groupName: '',
				groupLocation: '',
				arrivalDay: '',
				departureDay: '',
				nrPax: 0,
				projectIntro: [],
				suplementaryText: false,
				hotels: [],
				status: 'Received',
				hideDates: false,
				estimate: 0,
				budget: 'budget',
				imageContentUrl: [],
				hasSideMenu: true,
				hasExternalCorporateImage: false,
				clientAccManager: [],
				clientCompany: [],
				schedule: [],
				gifts: [],
				multiDestination: false,
				languageVendorDescriptions: '',
				invoices: [],
				requiresCashFlowVerification: true,
				collectionsFromClient: []
			}
		},
		TOGGLE_MODAL: (state) => {
			state.modalIsOpen = !state.modalIsOpen
		}
	}
})

export const {
	SET_CURRENT_PROJECT,
	ADD_HOTEL_TO_PROJECT,
	ADD_HOTEL_OVERNIGHT_TO_SCHEDULE,
	ADD_EVENT_TO_SCHEDULE,
	ADD_ITENERARY_TRANSFER_TO_SCHEDULE,
	ADD_EVENT_TO_ITENERARY,
	ADD_GIFT_TO_PROJECT,
	ADD_INTRO_RESTAURANT,
	ADD_INTRO_EVENT,
	ADD_INTRO_MEETING,
	ADD_INTRO_HOTEL_OVERNIGHT,
	ADD_INTRO_TRANSFER_TO_ITINERARY,
	ADD_INTRO_EVENT_TO_ITENERARY,
	ADD_TRANSFER_TO_SCHEDULE,
	ADD_TRANSFER_IN_OR_TRANSFER_OUT_TO_SCHEDULE,
	REMOVE_GIFT_FROM_PROJECT,
	REMOVE_HOTEL_FROM_PROJECT,
	REMOVE_HOTEL_OVERNIGHT_FROM_SCHEDULE,
	REMOVE_EVENT_FROM_SCHEDULE,
	REMOVE_EVENT_TO_ITENERARY,
	REMOVE_TRANSFER_FROM_SCHEDULE,
	REMOVE_ITENERARY_TRANSFER_FROM_SCHEDULE,
	DRAG_AND_DROP_EVENT,
	DRAG_AND_DROP_RESTAURANT,
	DRAG_AND_DROP_HOTEL,
	DRAG_AND_DROP_HOTEL_OVERNIGHT,
	EDIT_MODAL_HOTEL,
	EDIT_MODAL_HOTEL_OVERNIGHT,
	EDIT_GIFT,
	EDIT_MODAL_EVENT,
	EDIT_MODAL_RESTAURANT,
	EDIT_MODAL_MEETING,
	EDIT_TRANSFER_EVENT_OR_RESTAURANT,
	ADD_OR_EDIT_VENUE,
	ADD_ENTERTAINMENT_IN_RESTAURANT,
	DELETED_ENTERTAINMENT_IN_RESTAURANT,
	EDIT_ENTERTAINMENT_IN_RESTAURANT,
	REMOVE_MEETINGS_BY_HOTEL_FROM_PROJECT,
	CLEAR_PROJECT,
	HANDLE_PROJECT_BLUR,
	HANDLE_PROJECT_INPUT_CHANGE,
	HANDLE_SCHEDULE_DAYS,
	ADD_BUDGET_PDF_PROJECT,
	DELETED_BUDGET_PDF_PROJECT,
	TOGGLE_MODAL
} = currentProjectSlice.actions

export default currentProjectSlice.reducer
