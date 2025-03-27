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
import { IRestaurant } from '@interfaces/restaurant'
import { restaurantValidationSchema } from '../specs/RestaurantValidation'
import { itemsPerPage } from 'src/constants/pagination'
import createRestaurantUrl from '../specs/createRestaurantUrl'
import { useApiFetch } from 'src/hooks/fetchData'
import { logger } from 'src/helper/debugging/logger'

const RestaurantContext = createContext<
	| {
			state: typescript.RestaurantState
			dispatch: Dispatch<typescript.RestaurantAction>
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

const restaurantReducer = (
	state: typescript.RestaurantState,
	action: typescript.RestaurantAction
): typescript.RestaurantState => {
	switch (action.type) {
		case 'SET_RESTAURANTS':
			if (!Array.isArray(action.payload)) {
				console.error(
					'SET_RESTAURANTS payload is not an array:',
					action.payload
				)
				return state
			}
			return { ...state, restaurants: action.payload }
		case 'SET_RESTAURANT':
			return { ...state, currentRestaurant: action.payload }
		case 'ADD_RESTAURANT':
			if (!Array.isArray(state.restaurants)) {
				console.error('Restaurant is not an array:', state.restaurants)
				return state
			}
			return {
				...state,
				restaurants: [...state.restaurants, action.payload]
			}
		case 'UPDATE_RESTAURANT_FIELD':
			if (!state.currentRestaurant) return state
			return {
				...state,
				currentRestaurant: {
					...state.currentRestaurant,
					[action.payload.name]: action.payload.value
				}
			}
		case 'UPDATE_RESTAURANT_TEXTCONTENT': {
			if (!state.currentRestaurant) return state
			const updatedRestaurant = {
				...state.currentRestaurant,
				textContent: action.payload
			}
			return { ...state, currentRestaurant: updatedRestaurant }
		}
		case 'UPDATE_RESTAURANT_COORDINATE': {
			if (!state.currentRestaurant || !state.currentRestaurant.location)
				return state
			const updatedCoordinates = [
				...state.currentRestaurant.location.coordinates
			]
			if (action.payload.name === 'longitude') {
				updatedCoordinates[0] = action.payload.value
			} else if (action.payload.name === 'latitude') {
				updatedCoordinates[1] = action.payload.value
			}
			return {
				...state,
				currentRestaurant: {
					...state.currentRestaurant,
					location: {
						...state.currentRestaurant.location,
						coordinates: updatedCoordinates
					}
				}
			}
		}
		case 'TOGGLE_UPDATE': {
			return { ...state, update: action.payload }
		}
		case 'ADD_DESCRIPTION': {
			if (!state.currentRestaurant) return state
			const newDescription = { languageCode: '', value: '' }
			return {
				...state,
				currentRestaurant: {
					...state.currentRestaurant,
					descriptions: [
						...(state.currentRestaurant.descriptions || []),
						newDescription
					]
				}
			}
		}
		case 'UPDATE_DESCRIPTION': {
			if (!state.currentRestaurant || !state.currentRestaurant.descriptions)
				return state
			const updatedDescriptions = state.currentRestaurant.descriptions.map(
				(description, index) =>
					index === action.payload.index
						? { ...description, ...action.payload.description }
						: description
			)
			return {
				...state,
				currentRestaurant: {
					...state.currentRestaurant,
					descriptions: updatedDescriptions
				}
			}
		}
		case 'REMOVE_DESCRIPTION': {
			if (!state.currentRestaurant) return state
			const updatedDescriptions =
				state.currentRestaurant.descriptions?.filter(
					(_, index) => index !== action.payload.index
				) ?? []
			return {
				...state,
				currentRestaurant: {
					...state.currentRestaurant,
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
			if (!state.currentRestaurant) return state

			const targetField = state.currentRestaurant[action.payload.name]
			if (!Array.isArray(targetField)) {
				console.error(`Field ${action.payload.name} is not an array`)
				return state
			}

			return {
				...state,
				currentRestaurant: {
					...state.currentRestaurant,
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

export const RestaurantProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(restaurantReducer, initialState)
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [forceRefresh, setForceRefresh] = useState(0)

	const queryParams = {
		page: state.page,
		limit: itemsPerPage,
		city: state.currentRestaurant?.city,
		isVenue: state.currentRestaurant?.isVenue === true ? 'true' : undefined,
		price: state.currentRestaurant?.price,
		maxCapacity: state.currentRestaurant?.maxCapacity,
		searchTerm: state.searchTerm
	}

	const [filterIsDeleted, setFilterIsDeleted] = useState(false)

	const endpoint = createRestaurantUrl(!filterIsDeleted ? 'restaurants' : 'restaurants/isDeleted/true' , queryParams)

	const {
		data: restaurants,
		dataLength: restaurantsLength,
		isLoading
	} = useApiFetch<IRestaurant[]>(endpoint, forceRefresh, true)

	useEffect(() => {
		if (Array.isArray(restaurants)) {
			dispatch({ type: 'SET_RESTAURANTS', payload: restaurants })
			const totalPages = Math.ceil(restaurantsLength / itemsPerPage)
			dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages })
		} else if (restaurants !== undefined) {
			logger.error('Fetched restaurants is not an array:', restaurants)
		}
	}, [restaurants, restaurantsLength, dispatch])

	useEffect(() => {
		state.page = 1
	}, [state.searchTerm])

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		const payloadValue =
			type === 'checkbox'
				? checked
				: type === 'number'
				? parseInt(value, 10) || 0
				: value

		dispatch({
			type: 'UPDATE_RESTAURANT_FIELD',
			payload: { name: name as keyof IRestaurant, value: payloadValue }
		})
	}

	const handleBlur = async (
		e: FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		try {
			await restaurantValidationSchema.validateAt(name, {
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
		<RestaurantContext.Provider
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
		</RestaurantContext.Provider>
	)
}

export const useRestaurant = () => {
	const context = useContext(RestaurantContext)
	if (context === undefined) {
		throw new Error('useRestaurant must be used within a RestaurantProvider')
	}
	return context
}
