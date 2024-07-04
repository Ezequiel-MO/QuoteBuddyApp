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
import { IEntertainment } from '@interfaces/entertainment'
import createEntertainmentUrl from '../specs/createEntertainmentUrl'
import { entertainmentValidationSchema } from '../specs/EntertainmentValidation'

const EntertainmentContext = createContext<
	| {
			state: typescript.EntertainmentState
			dispatch: Dispatch<typescript.EntertainmentAction>
			handleChange: (
				e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
			) => void
			handleBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void
			errors: Record<string, string>
	  }
	| undefined
>(undefined)

const entertainmentReducer = (
	state: typescript.EntertainmentState,
	action: typescript.EntertainmentAction
): typescript.EntertainmentState => {
	switch (action.type) {
		case 'SET_ENTERTAINMENTS':
			return { ...state, entertainments: action.payload }
		case 'SET_ENTERTAINMENT':
			return { ...state, currentEntertainment: action.payload }
		case 'ADD_ENTERTAINMENT':
			return {
				...state,
				entertainments: [...state.entertainments, action.payload]
			}
		case 'UPDATE_ENTERTAINMENT_FIELD':
			if (!state.currentEntertainment) return state
			return {
				...state,
				currentEntertainment: {
					...state.currentEntertainment,
					[action.payload.name]: action.payload.value
				}
			}
		case 'UPDATE_ENTERTAINMENT_TEXTCONTENT': {
			if (!state.currentEntertainment) return state
			const updatedEntertainment = {
				...state.currentEntertainment,
				textContent: action.payload
			}
			return { ...state, currentEntertainment: updatedEntertainment }
		}
		case 'TOGGLE_UPDATE': {
			return { ...state, update: action.payload }
		}
		case 'ADD_DESCRIPTION': {
			if (!state.currentEntertainment) return state
			const newDescription = { languageCode: '', value: '' }
			return {
				...state,
				currentEntertainment: {
					...state.currentEntertainment,
					descriptions: [
						...(state.currentEntertainment.descriptions || []),
						newDescription
					]
				}
			}
		}
		case 'UPDATE_DESCRIPTION': {
			if (
				!state.currentEntertainment ||
				!state.currentEntertainment.descriptions
			)
				return state
			const updatedDescriptions = state.currentEntertainment.descriptions.map(
				(description, index) =>
					index === action.payload.index
						? { ...description, ...action.payload.description }
						: description
			)
			return {
				...state,
				currentEntertainment: {
					...state.currentEntertainment,
					descriptions: updatedDescriptions
				}
			}
		}
		case 'REMOVE_DESCRIPTION': {
			if (!state.currentEntertainment) return state
			const updatedDescriptions =
				state.currentEntertainment.descriptions?.filter(
					(_, index) => index !== action.payload.index
				) ?? []
			return {
				...state,
				currentEntertainment: {
					...state.currentEntertainment,
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
			if (!state.currentEntertainment) return state

			const targetField = state.currentEntertainment[action.payload.name]
			if (!Array.isArray(targetField)) {
				console.error(`Field ${action.payload.name} is not an array`)
				return state
			}

			return {
				...state,
				currentEntertainment: {
					...state.currentEntertainment,
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

export const EntertainmentProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(entertainmentReducer, initialState)
	const [errors, setErrors] = useState<Record<string, string>>({})

	const queryParams = {
		page: state.page,
		limit: itemsPerPage,
		name: state.currentEntertainment?.name,
		city: state.currentEntertainment?.city,
		searchTerm: state.searchTerm
	}

	const endpoint = createEntertainmentUrl('entertainments', queryParams)

	const { data: entertainments, dataLength: entertainmentsLength } =
		useApiFetch<IEntertainment[]>(endpoint, 0, true)

	useEffect(() => {
		if (entertainments) {
			dispatch({ type: 'SET_ENTERTAINMENTS', payload: entertainments })
			const totalPages = Math.ceil(entertainmentsLength / itemsPerPage)
			dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages })
		}
	}, [entertainments, entertainmentsLength, dispatch])

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		const payloadValue = type === 'checkbox' ? checked : value
		dispatch({
			type: 'UPDATE_ENTERTAINMENT_FIELD',
			payload: { name: name as keyof IEntertainment, value: payloadValue }
		})
	}

	const handleBlur = async (
		e: FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		try {
			await entertainmentValidationSchema.validateAt(name, {
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
		<EntertainmentContext.Provider
			value={{
				state,
				dispatch,
				handleChange,
				handleBlur,
				errors
			}}
		>
			{children}
		</EntertainmentContext.Provider>
	)
}

export const useEntertainment = () => {
	const context = useContext(EntertainmentContext)
	if (context === undefined) {
		throw new Error(
			'useEntertainment must be used within an EntertainmentProvider'
		)
	}
	return context
}
