import {
	ChangeEvent,
	Dispatch,
	FocusEvent,
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState
} from 'react'

import * as typescript from './contextinterfaces'
import initialState from './initialState'
import { IProject } from '@interfaces/project'
import * as Yup from 'yup'
import { projectValidationSchema } from '../specs/ProjectValidation'
import { itemsPerPage } from 'src/constants/pagination'
import createProjectUrl from '../specs/createProjectUrl'
import { useApiFetch } from 'src/hooks/fetchData'
import { logger } from 'src/helper/debugging/logger'

const ProjectContext = createContext<
	| {
			state: typescript.ProjectState
			dispatch: Dispatch<typescript.ProjectAction>
			handleChange: (
				e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
			) => void
			handleBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void
			errors: Record<string, string>
			setForceRefresh: React.Dispatch<React.SetStateAction<number>>
			isLoading: boolean
	  }
	| undefined
>(undefined)

const projectReducer = (
	state: typescript.ProjectState,
	action: typescript.ProjectAction
): typescript.ProjectState => {
	switch (action.type) {
		case 'SET_PROJECTS':
			if (!Array.isArray(action.payload)) {
				console.error('SET_PROJECTS payload is not an array:', action.payload)
				return state
			}
			return { ...state, projects: action.payload }
		case 'SET_PROJECT':
			logger.info('Setting project:', action.payload)
			return { ...state, currentProject: action.payload }
		case 'UPDATE_PROJECT_FIELD':
			if (!state.currentProject) return state
			return {
				...state,
				currentProject: {
					...state.currentProject,
					[action.payload.name]: action.payload.value
				}
			}
		case 'CLEAR_SCHEDULE':
			return {
				...state,
				currentProject: {
					...state.currentProject,
					schedule: []
				}
			}
		case 'SET_SELECTED_TAB':
			return { ...state, selectedTab: action.payload }
		case 'SET_IMAGES_MODAL_OPEN': {
			return { ...state, imagesModal: action.payload }
		}
		case 'SET_TOTAL_PAGES':
			return { ...state, totalPages: action.payload }
		case 'SET_PAGE':
			return { ...state, page: action.payload }
		case 'SET_SEARCH_TERM':
			return { ...state, searchTerm: action.payload }
		case 'SET_GROUP_LOCATION':
			return { ...state, groupLocation: action.payload }
		case 'APPEND_TO_ARRAY_FIELD':
			if (!state.currentProject) return state

			const targetField = state.currentProject[action.payload.name]
			if (!Array.isArray(targetField)) {
				console.error(`Field ${action.payload.name} is not an array`)
				return state
			}

			return {
				...state,
				currentProject: {
					...state.currentProject,
					[action.payload.name]: [
						...(targetField || []),
						...action.payload.value
					]
				}
			}
		case 'TOGGLE_BUDGET_VISUALIZER':
			return { ...state, isBudgetVisualizerOpen: !state.isBudgetVisualizerOpen }
		case 'TOGGLE_UPDATE': {
			return { ...state, update: action.payload }
		}
		default:
			return state
	}
}

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(projectReducer, initialState)
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [forceRefresh, setForceRefresh] = useState(0)

	const queryParams = {
		page: state.page,
		limit: itemsPerPage,
		groupLocation: state.groupLocation,
		searchTerm: state.searchTerm
	}

	const endpoint = createProjectUrl('projects', queryParams)
	const isToken = localStorage.getItem('token') ? true : false

	const {
		data: projects,
		dataLength: projectsLength,
		isLoading
	} = useApiFetch<IProject[]>(endpoint, forceRefresh, isToken)

	useEffect(() => {
		if (Array.isArray(projects)) {
			dispatch({ type: 'SET_PROJECTS', payload: projects })
			const totalPages = Math.ceil(projectsLength / itemsPerPage)
			dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages })
		} else if (projects !== undefined) {
			logger.error('Fetched projects is not an array:', projects)
		}
	}, [projects, projectsLength, dispatch])

	useEffect(() => {
		dispatch({ type: 'SET_PAGE', payload: 1 })
		setForceRefresh((prev) => prev + 1)
	}, [state.searchTerm])

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		const payloadValue = type === 'checkbox' ? checked : value
		dispatch({
			type: 'UPDATE_PROJECT_FIELD',
			payload: { name: name as keyof IProject, value: payloadValue }
		})
	}

	const handleBlur = async (
		e: FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		try {
			await projectValidationSchema.validateAt(name, {
				[name]: type === 'checkbox' ? checked : value
			})
			setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }))
		} catch (err) {
			if (err instanceof Yup.ValidationError) {
				setErrors((prevErrors) => ({
					...prevErrors,
					[name]: err.message
				}))
			}
		}
	}

	return (
		<ProjectContext.Provider
			value={{
				state,
				dispatch,
				handleChange,
				handleBlur,
				errors,
				setForceRefresh,
				isLoading
			}}
		>
			{children}
		</ProjectContext.Provider>
	)
}

export const useProject = () => {
	const context = useContext(ProjectContext)
	if (context === undefined) {
		throw new Error('useProject must be used within a ProjectProvider')
	}
	return context
}
