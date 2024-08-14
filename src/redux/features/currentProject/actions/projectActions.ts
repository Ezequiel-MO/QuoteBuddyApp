import { IProject } from '@interfaces/index'
import { useDispatch } from 'react-redux'
import { CLEAR_PROJECT, SET_CURRENT_PROJECT } from '../CurrentProjectSlice'

export const useProjectActions = () => {
	const dispatch = useDispatch()

	const setCurrentProject = (project: IProject) => {
		dispatch(SET_CURRENT_PROJECT(project))
	}

	const clearProject = () => {
		dispatch(CLEAR_PROJECT())
	}

	return {
		setCurrentProject,
		clearProject
	}
}
