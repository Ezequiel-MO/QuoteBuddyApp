import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
	AddHotelOvernightPayload,
	DragAndDropHotelOvernightPayload,
	IInitialState
} from './types'
import { projectValidationSchema } from '@screens/projects/specs/ProjectValidation'
import * as Yup from 'yup'
import { IGift } from '@interfaces/gift'
import { IDay } from '@interfaces/project'
import { IHotel } from '@interfaces/hotel'
import { defaultProject } from './defaultProjectState'
import { defaultBudget } from '../budget/defaultBudgetState'
import { IBudget } from '@interfaces/budget'

const initialState: IInitialState = {
	project: defaultProject,
	budget: defaultBudget,
	modalIsOpen: false,
	errors: {}
}

export const currentProjectSlice = createSlice({
	name: 'currentProject',
	initialState,
	reducers: {
		UPDATE_PROJECT_SCHEDULE: {
			reducer: (state, action: PayloadAction<IDay[]>) => {
				state.project.schedule = action.payload
			},
			prepare: (schedule: IDay[], reason: string) => {
				return { payload: schedule, meta: { reason } }
			}
		},
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
		ADD_GIFT_TO_PROJECT: (state, action) => {
			const gift: IGift = action.payload
			if (!gift.qty) {
				gift.qty = 1
			}
			state.project.gifts = [...state.project.gifts, gift]
		},
		EDIT_MODAL_HOTEL: (state, action: PayloadAction<IHotel[]>) => {
			state.project.hotels = action.payload
		},
		EDIT_MODAL_HOTEL_OVERNIGHT: (
			state,
			action: PayloadAction<{
				dayIndex: number
				updatedOvernightHotels: IHotel[]
			}>
		) => {
			const { dayIndex, updatedOvernightHotels } = action.payload
			state.project.schedule[dayIndex].overnight.hotels = updatedOvernightHotels
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
		UPDATE_GIFT: (state, action: PayloadAction<{ gifts: IGift[] }>) => {
			state.project.gifts = action.payload.gifts
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
			const hotelsFilter = state.project.schedule[
				dayIndex
			].overnight.hotels.filter((el) => el._id !== hotelId)
			state.project.schedule[dayIndex].overnight.hotels = hotelsFilter
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
			state.project = defaultProject
		},
		TOGGLE_MODAL: (state) => {
			state.modalIsOpen = !state.modalIsOpen
		},
		CLEAR_BUDGET: (state) => {
			state.budget = defaultBudget
		},
		SET_BUDGET: {
			reducer: (state, action: PayloadAction<IBudget>) => {
				state.budget = action.payload
			},
			prepare: (budget: IBudget, reason: string) => {
				return { payload: budget, meta: { reason } }
			}
		},
		SET_BUDGET_SELECTED_HOTEL_COST: (state, action: PayloadAction<number>) => {
			state.budget.selectedHotelCost = action.payload
		},
		SET_BUDGET_TRANSFERS_IN_COST: (state, action: PayloadAction<number>) => {
			state.budget.transfersInCost = action.payload
		},
		UPDATE_GIFT_COST: (state, action: PayloadAction<number>) => {
			state.budget.giftCost = action.payload
		},
		UPDATE_MEETINGS_TOTAT_COST:(state , action:PayloadAction<number>)=>{
			state.budget.meetingsCost = action.payload
		}
	}
})

export const {
	UPDATE_PROJECT_SCHEDULE,
	SET_CURRENT_PROJECT,
	ADD_HOTEL_TO_PROJECT,
	ADD_HOTEL_OVERNIGHT_TO_SCHEDULE,
	ADD_GIFT_TO_PROJECT,
	REMOVE_GIFT_FROM_PROJECT,
	REMOVE_HOTEL_FROM_PROJECT,
	REMOVE_HOTEL_OVERNIGHT_FROM_SCHEDULE,
	REMOVE_ITENERARY_TRANSFER_FROM_SCHEDULE,
	DRAG_AND_DROP_EVENT,
	DRAG_AND_DROP_RESTAURANT,
	DRAG_AND_DROP_HOTEL,
	DRAG_AND_DROP_HOTEL_OVERNIGHT,
	EDIT_MODAL_HOTEL,
	EDIT_MODAL_HOTEL_OVERNIGHT,
	EDIT_GIFT,
	UPDATE_GIFT,
	CLEAR_PROJECT,
	HANDLE_PROJECT_BLUR,
	HANDLE_PROJECT_INPUT_CHANGE,
	HANDLE_SCHEDULE_DAYS,
	ADD_BUDGET_PDF_PROJECT,
	DELETED_BUDGET_PDF_PROJECT,
	TOGGLE_MODAL,
	SET_BUDGET,
	SET_BUDGET_SELECTED_HOTEL_COST,
	UPDATE_GIFT_COST,
	UPDATE_MEETINGS_TOTAT_COST,
	CLEAR_BUDGET
} = currentProjectSlice.actions

export default currentProjectSlice.reducer
