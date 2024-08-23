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
import { IProject } from '@interfaces/index'
import * as Yup from 'yup'
import { projectValidationSchema } from '../main/specs/ProjectValidation'
import { itemsPerPage } from 'src/constants/pagination'
import createProjectUrl from '../main/specs/createProjectUrl'
import { useApiFetch } from 'src/hooks/fetchData'

const ProjectContext = createContext<
	| {
			state: typescript.ProjectState
			dispatch: Dispatch<typescript.ProjectAction>
			handleChange: (
				e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
			) => void
			handleBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void
			errors: Record<string, string>
	  }
	| undefined
>(undefined)

const projectReducer = (
	state: typescript.ProjectState,
	action: typescript.ProjectAction
): typescript.ProjectState => {
	switch (action.type) {
		case 'SET_PROJECTS':
			return { ...state, projects: action.payload }
		case 'SET_PROJECT':
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
		case 'SET_SELECTED_TAB':
			return { ...state, selectedTab: action.payload }
		case 'SET_TOTAL_PAGES':
			return { ...state, totalPages: action.payload }
		case 'SET_PAGE':
			return { ...state, page: action.payload }
		case 'SET_SEARCH_TERM':
			return { ...state, searchTerm: action.payload }
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

	const queryParams = {
		page: state.page,
		limit: itemsPerPage,
		groupLocation: state.currentProject?.groupLocation,
		searchTerm: state.searchTerm
	}

	const endpoint = createProjectUrl('projects', queryParams)

	const { data: projects, dataLength: projectsLength } = useApiFetch<
		IProject[]
	>(endpoint, 0, true)

	useEffect(() => {
		if (projects) {
			dispatch({ type: 'SET_PROJECTS', payload: projects })
			const totalPages = Math.ceil(projectsLength / itemsPerPage)
			dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages })
		}
	}, [projects, projectsLength, dispatch])

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
				errors
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
