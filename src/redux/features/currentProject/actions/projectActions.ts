import { IProject } from '@interfaces/index'
import { useDispatch } from 'react-redux'
import {
	CLEAR_PROJECT,
	HANDLE_PROJECT_BLUR,
	HANDLE_PROJECT_INPUT_CHANGE,
	SET_CURRENT_PROJECT
} from '../CurrentProjectSlice'
import { ChangeEvent, FocusEvent } from 'react'

export const useProjectActions = () => {
	const dispatch = useDispatch()

	const setCurrentProject = (project: IProject) => {
		dispatch(SET_CURRENT_PROJECT(project))
	}

	const clearProject = () => {
		dispatch(CLEAR_PROJECT())
	}

	const handleProjectInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		dispatch(HANDLE_PROJECT_INPUT_CHANGE(e))
	}

	const handleProjectBlur = (
		e: FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		dispatch(HANDLE_PROJECT_BLUR(e))
	}

	return {
		setCurrentProject,
		clearProject,
		handleProjectInputChange,
		handleProjectBlur
	}
}
