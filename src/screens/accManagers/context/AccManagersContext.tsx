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
import * as Yup from 'yup'
import { useApiFetch } from 'src/hooks/fetchData'
import { itemsPerPage } from 'src/constants/pagination'
import initialState from './initialState'
import createAccManagerUrl from '../specs/createAccManagerUrl'
import { IAccManager } from '@interfaces/accManager'
import { accManagerValidationSchema } from '../specs/AccManagerValidation'
import { logger } from 'src/helper/debugging/logger'

const AccManagerContext = createContext<
	| {
		state: typescript.AccManagerState
		dispatch: Dispatch<typescript.AccManagerAction>
		handleChange: (
			e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
		) => void
		handleBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void
		errors: Record<string, string>
		setForceRefresh: React.Dispatch<React.SetStateAction<number>>
		isLoading: boolean
		setFilterIsDeleted: Dispatch<React.SetStateAction<boolean>>
		filterIsDeleted: boolean
	}
	| undefined
>(undefined)

const accManagerReducer = (
	state: typescript.AccManagerState,
	action: typescript.AccManagerAction
): typescript.AccManagerState => {
	switch (action.type) {
		case 'SET_ACCMANAGERS':
			return {
				...state,
				accManagers: Array.isArray(action.payload) ? action.payload : []
			}
		case 'SET_ACCMANAGER':
			return { ...state, currentAccManager: action.payload }
		case 'ADD_ACCMANAGER':
			return {
				...state,
				accManagers: [...state.accManagers, action.payload]
			}
		case 'UPDATE_ACCMANAGER_FIELD':
			if (!state.currentAccManager) return state
			return {
				...state,
				currentAccManager: {
					...state.currentAccManager,
					[action.payload.name]: action.payload.value
				}
			}
		case 'TOGGLE_UPDATE': {
			return { ...state, update: action.payload }
		}
		case 'SET_IMAGES_MODAL_OPEN': {
			return { ...state, imagesModal: action.payload }
		}
		case 'SET_TOTAL_PAGES':
			return { ...state, totalPages: action.payload }
		case 'SET_PAGE':
			return { ...state, page: action.payload }
		case 'SET_SEARCH_TERM':
			return { ...state, searchTerm: action.payload }
		case 'APPEND_TO_ARRAY_FIELD':
			if (!state.currentAccManager) return state

			const targetField = state.currentAccManager[action.payload.name]
			if (!Array.isArray(targetField)) {
				console.error(`Field ${action.payload.name} is not an array`)
				return state
			}
			return {
				...state,
				currentAccManager: {
					...state.currentAccManager,
					[action.payload.name]: [
						...(targetField || []),
						...action.payload.value
					]
				}
			}

		default:
			return state
	}
}

export const AccManagerProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(accManagerReducer, initialState)
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [forceRefresh, setForceRefresh] = useState(0)

	const queryParams = {
		page: state.page,
		limit: itemsPerPage,
		searchTerm: state.searchTerm
	}

	const [filterIsDeleted, setFilterIsDeleted] = useState(false)

	const endpoint = createAccManagerUrl(!filterIsDeleted ? 'accManagers' : 'accManagers/isDeleted/true', queryParams)

	const {
		data: accManagers,
		dataLength: accManagersLength,
		isLoading
	} = useApiFetch<IAccManager[]>(endpoint, forceRefresh, true, state.searchTerm ? 500 : 0)

	useEffect(() => {
		if (Array.isArray(accManagers)) {
			dispatch({ type: 'SET_ACCMANAGERS', payload: accManagers })
			const totalPages = Math.ceil(accManagersLength / itemsPerPage)
			dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages })
		} else if (accManagers !== undefined) {
			logger.error('Fetched accManagers is not an array:', accManagers)
		}
	}, [accManagers, accManagersLength, dispatch])

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		const payloadValue = type === 'checkbox' ? checked : value
		dispatch({
			type: 'UPDATE_ACCMANAGER_FIELD',
			payload: { name: name as keyof IAccManager, value: payloadValue }
		})
	}

	const handleBlur = async (
		e: FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		try {
			await accManagerValidationSchema.validateAt(name, {
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
		<AccManagerContext.Provider
			value={{
				state,
				dispatch,
				handleChange,
				handleBlur,
				errors,
				isLoading,
				setForceRefresh,
				setFilterIsDeleted,
				filterIsDeleted
			}}
		>
			{children}
		</AccManagerContext.Provider>
	)
}

export const useAccManager = () => {
	const context = useContext(AccManagerContext)
	if (context === undefined) {
		throw new Error('useAccManager must be used within an AccManagerProvider')
	}
	return context
}
