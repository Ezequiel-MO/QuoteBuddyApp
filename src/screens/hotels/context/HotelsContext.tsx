import React, {
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
import { IHotel } from '@interfaces/hotel'
import { hotelValidationSchema } from '../specs/HotelValidation'
import { useApiFetch } from 'src/hooks/fetchData'
import { itemsPerPage } from 'src/constants/pagination'
import createHotelUrl from '../createHotelUrl'
import initialState from './initialState'
import { logger } from 'src/helper/debugging/logger'
import { VALIDATIONS } from '../../../constants'
import * as yup from 'yup'

const HotelContext = createContext<
	| {
			state: typescript.HotelState
			dispatch: Dispatch<typescript.HotelAction>
			handleChange: (
				e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
			) => void
			handleBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void
			errors: Record<string, string | undefined>
			setErrors: React.Dispatch<React.SetStateAction<Record<string, string | undefined>>>
			validate: () => Promise<boolean>
			setForceRefresh: React.Dispatch<React.SetStateAction<number>>
			isLoading: boolean
			setFilterIsDeleted: Dispatch<React.SetStateAction<boolean>>
			filterIsDeleted: boolean
	  }
	| undefined
>(undefined)

const hotelReducer = (
	state: typescript.HotelState,
	action: typescript.HotelAction
): typescript.HotelState => {
	switch (action.type) {
		case 'SET_HOTELS':
			if (!Array.isArray(action.payload)) {
				console.error('SET_HOTELS payload is not an array:', action.payload)
				return state
			}
			return { ...state, hotels: action.payload }
		case 'SET_HOTEL':
			return { ...state, currentHotel: action.payload }
		case 'ADD_HOTEL':
			if (!Array.isArray(state.hotels)) {
				console.error('Hotels is not an array:', state.hotels)
				return state
			}
			return {
				...state,
				hotels: [action.payload, ...state.hotels]
			}
		case 'UPDATE_HOTEL_FIELD':
			if (!state.currentHotel) return state
			return {
				...state,
				currentHotel: {
					...state.currentHotel,
					[action.payload.name]: action.payload.value
				}
			}
		case 'UPDATE_HOTEL_TEXTCONTENT': {
			if (!state.currentHotel) return state
			const updatedHotel = {
				...state.currentHotel,
				textContent: action.payload
			}
			return { ...state, currentHotel: updatedHotel }
		}
		case 'UPDATE_HOTEL_COORDINATE':
			if (!state.currentHotel || !state.currentHotel.location) return state
			const updatedCoordinates = [...state.currentHotel.location.coordinates]
			if (action.payload.name === 'longitude') {
				updatedCoordinates[0] = action.payload.value
			} else if (action.payload.name === 'latitude') {
				updatedCoordinates[1] = action.payload.value
			}
			return {
				...state,
				currentHotel: {
					...state.currentHotel,
					location: {
						...state.currentHotel.location,
						coordinates: updatedCoordinates
					}
				}
			}
		case 'TOGGLE_UPDATE': {
			return { ...state, update: action.payload }
		}
		case 'ADD_DESCRIPTION': {
			if (!state.currentHotel) return state
			const newDescription = { languageCode: '', value: '' }
			return {
				...state,
				currentHotel: {
					...state.currentHotel,
					descriptions: [
						...(state.currentHotel.descriptions || []),
						newDescription
					]
				}
			}
		}
		case 'UPDATE_DESCRIPTION': {
			if (!state.currentHotel || !state.currentHotel.descriptions) return state
			const updatedDescriptions = state.currentHotel.descriptions.map(
				(description, index) =>
					index === action.payload.index
						? { ...description, ...action.payload.description }
						: description
			)
			return {
				...state,
				currentHotel: {
					...state.currentHotel,
					descriptions: updatedDescriptions
				}
			}
		}
		case 'REMOVE_DESCRIPTION': {
			if (!state.currentHotel) return state
			const updatedDescriptions =
				state.currentHotel.descriptions?.filter(
					(_, index) => index !== action.payload.index
				) ?? []
			return {
				...state,
				currentHotel: {
					...state.currentHotel,
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
			if (!state.currentHotel) return state
			const targetField = state.currentHotel[action.payload.name]
			if (!Array.isArray(targetField)) {
				console.error(`Field ${action.payload.name} is not an array`)
				return state
			}

			return {
				...state,
				currentHotel: {
					...state.currentHotel,
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

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(hotelReducer, initialState)

	const [errors, setErrors] = useState<Record<string, string | undefined>>({})
	const validationSchema: yup.ObjectSchema<any> = VALIDATIONS.hotel

	const [forceRefresh, setForceRefresh] = useState(0)

	const queryParams = {
		page: state.page,
		limit: itemsPerPage,
		city: state.currentHotel?.city,
		numberStars: Number(state.currentHotel?.numberStars),
		numberRooms: Number(state.currentHotel?.numberRooms),
		searchTerm: state.searchTerm
	}

	const [filterIsDeleted, setFilterIsDeleted] = useState(false)

	const endpoint = createHotelUrl(
		!filterIsDeleted ? 'hotels' : 'hotels/isDeleted/true',
		queryParams
	)

	const {
		data: hotels,
		dataLength: hotelsLength,
		isLoading
	} = useApiFetch<IHotel[]>(endpoint, forceRefresh, true)

	useEffect(() => {
		if (Array.isArray(hotels)) {
			dispatch({ type: 'SET_HOTELS', payload: hotels })
			const totalPages = Math.ceil(hotelsLength / itemsPerPage)
			dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages })
		} else if (hotels !== undefined) {
			logger.error('Fetched freelancers is not an array:', hotels)
		}
	}, [hotels, hotelsLength, dispatch])

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
			type: 'UPDATE_HOTEL_FIELD',
			payload: { name: name as keyof IHotel, value: payloadValue }
		})
		if (errors[name]) {
			setErrors((prevErrors) => ({
				...prevErrors,
				[name]: undefined
			}))
		}
	}

	const handleBlur = async (
		e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		if (value !== '') {
			setErrors((prevErrors) => ({
				...prevErrors,
				[name]: undefined
			}))
		} else {
			try {
				await validationSchema.validateAt(name, value)
				setErrors((prevErrors) => ({
					...prevErrors,
					[name]: undefined
				}))
			} catch (err) {
				const ValidationError = err as yup.ValidationError
				setErrors((prevErrors) => ({
					...prevErrors,
					[name]: ValidationError.message
				}))
			}
		}
	}

	const validate = async () => {
		try {
			await validationSchema.validate(state.currentHotel, {
				abortEarly: false
			})
			return true
		} catch (err) {
			if (err instanceof yup.ValidationError) {
				const newErrors: { [key: string]: string } = {}
				err.inner.forEach((el) => {
					if (el.path) newErrors[el.path] = el.message
				})
				setErrors(newErrors)
			}
			return false
		}
	}

	return (
		<HotelContext.Provider
			value={{
				state,
				dispatch,
				handleChange,
				handleBlur,
				setErrors,
				errors,
				validate,
				setForceRefresh,
				isLoading,
				setFilterIsDeleted,
				filterIsDeleted
			}}
		>
			{children}
		</HotelContext.Provider>
	)
}

export const useHotel = () => {
	const context = useContext(HotelContext)
	if (context === undefined) {
		throw new Error('useHotel must be used within a HotelProvider')
	}
	return context
}
