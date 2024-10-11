import { IProject } from '@interfaces/index'
import { useDispatch } from 'react-redux'
import {
	CLEAR_PROJECT,
	HANDLE_PROJECT_BLUR,
	HANDLE_PROJECT_INPUT_CHANGE,
	HANDLE_SCHEDULE_DAYS,
	ADD_BUDGET_PDF_PROJECT,
	DELETED_BUDGET_PDF_PROJECT,
	SET_CURRENT_PROJECT
} from '../CurrentProjectSlice'
import { ChangeEvent, FocusEvent } from 'react'

export const useProjectActions = () => {
	const dispatch = useDispatch()

	// Set the current project action
	const setCurrentProject = (project: IProject) => {
		dispatch(SET_CURRENT_PROJECT(project))
	}

	// Clear project action
	const clearProject = () => {
		dispatch(CLEAR_PROJECT())
	}

	// Handle project input change action
	const handleProjectInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value } = e.target

		const payloadValue =
			type === 'checkbox' || type === 'radio'
				? (e.target as HTMLInputElement).checked
				: value || ''

		// Dispatch the action with the relevant data
		dispatch(
			HANDLE_PROJECT_INPUT_CHANGE({
				name,
				value: payloadValue as string | boolean,
				type
			})
		)
	}

	// Handle project blur action
	const handleProjectBlur = (
		e: FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value } = e.target as
			| HTMLInputElement
			| HTMLSelectElement

		// Handle checkbox-specific logic
		const checked =
			type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined

		dispatch(
			HANDLE_PROJECT_BLUR({
				name,
				value,
				checked,
				type
			})
		)
	}

	// create and update schedule days
	const handleScheduleDays = (schedule: any) => {
		dispatch(HANDLE_SCHEDULE_DAYS(schedule))
	}

	const deletedBudgetPDF = (urlPdf: string) => {
		dispatch(DELETED_BUDGET_PDF_PROJECT(urlPdf))
	}

	const addBudgetPDF = (urlPdf:string[]) => {
		dispatch(ADD_BUDGET_PDF_PROJECT(urlPdf))
	}

	return {
		setCurrentProject,
		clearProject,
		handleProjectInputChange,
		handleProjectBlur,
		handleScheduleDays,
		deletedBudgetPDF,
		addBudgetPDF
	}
}
