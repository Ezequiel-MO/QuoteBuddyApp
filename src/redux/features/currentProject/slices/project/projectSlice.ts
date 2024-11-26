import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as Yup from 'yup'
import { projectValidationSchema } from '@screens/projects/specs/ProjectValidation'
import { IInitialState } from '../../types'
import { IProject } from '@interfaces/project'
import { loadProjectFromLocalStorage } from './localStorageUtils'

const initialState: IInitialState = {
	project: loadProjectFromLocalStorage(),
	modalIsOpen: false,
	errors: {}
}

const projectSlice = createSlice({
	name: 'project',
	initialState,
	reducers: {
		SET_CURRENT_PROJECT(state, action: PayloadAction<IProject>) {
			state.project = action.payload
		},
		HANDLE_PROJECT_INPUT_CHANGE(
			state,
			action: PayloadAction<{
				name: string
				value: string | boolean
				type?: string
			}>
		) {
			const { name, value, type } = action.payload

			const newValue =
				type === 'checkbox' || type === 'radio' ? Boolean(value) : value

			state.project = {
				...state.project,
				[name]: newValue
			}
		},
		HANDLE_PROJECT_BLUR(
			state,
			action: PayloadAction<{
				name: string
				value: string | boolean
				checked?: boolean
				type: string
			}>
		) {
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
		HANDLE_SCHEDULE_DAYS(state, action: PayloadAction<any>) {
			state.project.schedule = action.payload
		},
		ADD_BUDGET_PDF_PROJECT(state, action: PayloadAction<string[]>) {
			const pdfUrl = action.payload
			state.project.imageContentUrl = [
				...state.project.imageContentUrl,
				...pdfUrl
			]
		},
		DELETED_BUDGET_PDF_PROJECT(state, action: PayloadAction<string>) {
			const pdfUrl = action.payload
			state.project.imageContentUrl = state.project.imageContentUrl.filter(
				(el) => el !== pdfUrl
			)
		},
		CLEAR_PROJECT(state) {
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
				requiresCashFlowVerification: true,
				invoices: [],
				collectionsFromClient: []
			}
		},
		TOGGLE_MODAL(state) {
			state.modalIsOpen = !state.modalIsOpen
		}
	}
})

export const {
	SET_CURRENT_PROJECT,
	HANDLE_PROJECT_INPUT_CHANGE,
	HANDLE_PROJECT_BLUR,
	HANDLE_SCHEDULE_DAYS,
	ADD_BUDGET_PDF_PROJECT,
	DELETED_BUDGET_PDF_PROJECT,
	CLEAR_PROJECT,
	TOGGLE_MODAL
} = projectSlice.actions

export default projectSlice.reducer
