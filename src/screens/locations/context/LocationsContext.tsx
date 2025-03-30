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
import { locationValidationSchema } from '../specs/LocationValidation'
import { itemsPerPage } from 'src/constants/pagination'
import { useApiFetch } from 'src/hooks/fetchData'
import createLocationUrl from '../specs/createLocationUrl'
import { ILocation } from '@interfaces/location'

const LocationContext = createContext<
	| {
			state: typescript.LocationState
			dispatch: Dispatch<typescript.LocationAction>
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

const locationReducer = (
	state: typescript.LocationState,
	action: typescript.LocationAction
): typescript.LocationState => {
	switch (action.type) {
		case 'SET_LOCATIONS':
			if (!Array.isArray(action.payload)) {
				console.error('SET_LOCATIONS payload is not an array:', action.payload)
				return state
			}
			return { ...state, locations: action.payload }
		case 'SET_LOCATION':
			return { ...state, currentLocation: action.payload }
		case 'ADD_LOCATION':
			if (!Array.isArray(state.locations)) {
				console.error('Locations is not an array:', state.locations)
				return state
			}
			return {
				...state,
				locations: [action.payload, ...state.locations]
			}
		case 'UPDATE_LOCATION_FIELD':
			if (!state.currentLocation) return state
			return {
				...state,
				currentLocation: {
					...state.currentLocation,
					[action.payload.name]: action.payload.value
				}
			}
		case 'UPDATE_LOCATION_TEXTCONTENT': {
			if (!state.currentLocation) return state
			const updatedLocation = {
				...state.currentLocation,
				textContent: action.payload
			}
			return { ...state, currentLocation: updatedLocation }
		}
		case 'UPDATE_LOCATION_COORDINATE': {
			if (!state.currentLocation || !state.currentLocation.location)
				return state
			const updatedCoordinates = [...state.currentLocation.location.coordinates]
			if (action.payload.name === 'longitude') {
				updatedCoordinates[0] = action.payload.value
			} else if (action.payload.name === 'latitude') {
				updatedCoordinates[1] = action.payload.value
			}
			return {
				...state,
				currentLocation: {
					...state.currentLocation,
					location: {
						...state.currentLocation.location,
						coordinates: updatedCoordinates
					}
				}
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
			if (!state.currentLocation) return state

			const targetField = state.currentLocation[action.payload.name]
			if (!Array.isArray(targetField)) {
				console.error(`Field ${action.payload.name} is not an array`)
				return state
			}

			return {
				...state,
				currentLocation: {
					...state.currentLocation,
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

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(locationReducer, initialState)
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [forceRefresh, setForceRefresh] = useState(0)

	const queryParams = {
		page: state.page,
		limit: itemsPerPage,
		country: state.currentLocation?.country,
		searchTerm: state.searchTerm
	}

	const [filterIsDeleted, setFilterIsDeleted] = useState(false)

	const endpoint = createLocationUrl(!filterIsDeleted ? 'locations' : 'locations/isDeleted/true' , queryParams)

	const {
		data: locations,
		dataLength: locationsLength,
		isLoading
	} = useApiFetch<ILocation[]>(endpoint, forceRefresh, true , state.searchTerm ? 500 : 0 )

	useEffect(() => {
		if (Array.isArray(locations)) {
			dispatch({ type: 'SET_LOCATIONS', payload: locations })
			const totalPages = Math.ceil(locationsLength / itemsPerPage)
			dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages })
		} else if (locations !== undefined) {
			console.error('Fetched locations is not an array:', locations)
		}
	}, [locations, locationsLength, dispatch])

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
			type: 'UPDATE_LOCATION_FIELD',
			payload: { name: name as keyof ILocation, value: payloadValue }
		})
	}

	const handleBlur = async (
		e: FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		try {
			await locationValidationSchema.validateAt(name, {
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
		<LocationContext.Provider
			value={{
				state,
				dispatch,
				handleChange,
				handleBlur,
				errors,
				setForceRefresh,
				isLoading,
				setFilterIsDeleted,
				filterIsDeleted
			}}
		>
			{children}
		</LocationContext.Provider>
	)
}

export const useLocation = () => {
	const context = useContext(LocationContext)
	if (context === undefined) {
		throw new Error('useLocation must be used within a LocationProvider')
	}
	return context
}
