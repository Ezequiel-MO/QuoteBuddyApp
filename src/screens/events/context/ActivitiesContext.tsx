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
import * as Yup from 'yup'
import * as typescript from './contextinterfaces'
import initialState from './initialState'
import { itemsPerPage } from 'src/constants/pagination'
import { useApiFetch } from 'src/hooks/fetchData'
import { IEvent } from '@interfaces/event'
import createActivityUrl from '../specs/createActivityUrl'
import { activityValidationSchema } from '../specs/ActivityValidation'
import { logger } from 'src/helper/debugging/logger'

const ActivityContext = createContext<
	| {
			state: typescript.ActivityState
			dispatch: Dispatch<typescript.ActivityAction>
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

const activityReducer = (
	state: typescript.ActivityState,
	action: typescript.ActivityAction
): typescript.ActivityState => {
	switch (action.type) {
		case 'SET_ACTIVITIES':
			if (!Array.isArray(action.payload)) {
				console.error('SET_ACTIVITIES payload is not an array:', action.payload)
				return state
			}
			return { ...state, activities: action.payload }
		case 'SET_ACTIVITY':
			return { ...state, currentActivity: action.payload }
		case 'ADD_ACTIVITY':
			return {
				...state,
				activities: [...state.activities, action.payload]
			}
		case 'UPDATE_ACTIVITY_FIELD':
			if (!state.currentActivity) return state
			return {
				...state,
				currentActivity: {
					...state.currentActivity,
					[action.payload.name]: action.payload.value
				}
			}
		case 'UPDATE_ACTIVITY_TEXTCONTENT': {
			if (!state.currentActivity) return state
			const updatedActivity = {
				...state.currentActivity,
				textContent: action.payload
			}
			return { ...state, currentActivity: updatedActivity }
		}
		case 'UPDATE_ACTIVITY_COORDINATE': {
			if (!state.currentActivity || !state.currentActivity.location)
				return state
			const updatedCoordinates = [...state.currentActivity.location.coordinates]
			if (action.payload.name === 'longitude') {
				updatedCoordinates[0] = action.payload.value
			} else if (action.payload.name === 'latitude') {
				updatedCoordinates[1] = action.payload.value
			}
			return {
				...state,
				currentActivity: {
					...state.currentActivity,
					location: {
						...state.currentActivity.location,
						coordinates: updatedCoordinates
					}
				}
			}
		}
		case 'TOGGLE_UPDATE': {
			return { ...state, update: action.payload }
		}
		case 'ADD_DESCRIPTION': {
			if (!state.currentActivity) return state
			const newDescription = { languageCode: '', value: '' }
			return {
				...state,
				currentActivity: {
					...state.currentActivity,
					descriptions: [
						...(state.currentActivity.descriptions || []),
						newDescription
					]
				}
			}
		}
		case 'UPDATE_DESCRIPTION': {
			if (!state.currentActivity || !state.currentActivity.descriptions)
				return state
			const updatedDescriptions = state.currentActivity.descriptions.map(
				(description, index) =>
					index === action.payload.index
						? { ...description, ...action.payload.description }
						: description
			)
			return {
				...state,
				currentActivity: {
					...state.currentActivity,
					descriptions: updatedDescriptions
				}
			}
		}
		case 'REMOVE_DESCRIPTION': {
			if (!state.currentActivity) return state
			const updatedDescriptions =
				state.currentActivity.descriptions?.filter(
					(_, index) => index !== action.payload.index
				) ?? []
			return {
				...state,
				currentActivity: {
					...state.currentActivity,
					descriptions: updatedDescriptions
				}
			}
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
			if (!state.currentActivity) return state

			const targetField = state.currentActivity[action.payload.name]
			if (!Array.isArray(targetField)) {
				console.error(`Field ${action.payload.name} is not an array`)
				return state
			}

			return {
				...state,
				currentActivity: {
					...state.currentActivity,
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

export const ActivityProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(activityReducer, initialState)
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [forceRefresh, setForceRefresh] = useState(0)

	const queryParams = {
		page: state.page,
		limit: itemsPerPage,
		city: state.currentActivity?.city,
		price: state.currentActivity?.price,
		searchTerm: state.searchTerm
	}

	const endpoint = createActivityUrl('events', queryParams)

	const {
		data: activities,
		dataLength: activitiesLength,
		isLoading
	} = useApiFetch<IEvent[]>(endpoint, forceRefresh, true)

	useEffect(() => {
		if (Array.isArray(activities)) {
			dispatch({ type: 'SET_ACTIVITIES', payload: activities })
			const totalPages = Math.ceil(activitiesLength / itemsPerPage)
			dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages })
		} else if (activities !== undefined) {
			logger.error('Fetched activities is not an array:', activities)
		}
	}, [activities, activitiesLength, dispatch])

	useEffect(() => {
		state.page = 1
	}, [state.searchTerm])

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		const payloadValue = type === 'checkbox' ? checked : value
		dispatch({
			type: 'UPDATE_ACTIVITY_FIELD',
			payload: { name: name as keyof IEvent, value: payloadValue }
		})
	}

	const handleBlur = async (
		e: FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		try {
			await activityValidationSchema.validateAt(name, {
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
		<ActivityContext.Provider
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
		</ActivityContext.Provider>
	)
}

export const useActivity = () => {
	const context = useContext(ActivityContext)
	if (context === undefined) {
		throw new Error('useActivity must be used within a ActivityProvider')
	}
	return context
}
