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
import { countryValidationSchema } from '../specs/CountryValidation'
import createCountryUrl from '../specs/createCountryUrl'
import { ICountry } from '@interfaces/country'

const CountryContext = createContext<
	| {
			state: typescript.CountryState
			dispatch: Dispatch<typescript.CountryAction>
			handleChange: (
				e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
			) => void
			handleBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void
			errors: Record<string, string>
	  }
	| undefined
>(undefined)

const countryReducer = (
	state: typescript.CountryState,
	action: typescript.CountryAction
): typescript.CountryState => {
	switch (action.type) {
		case 'SET_COUNTRIES':
			if (!Array.isArray(action.payload)) {
				console.error('SET_COUNTRIES payload is not an array:', action.payload)
				return state
			}
			return { ...state, countries: action.payload }
		case 'SET_COUNTRY':
			return { ...state, currentCountry: action.payload }
		case 'ADD_COUNTRY':
			if (!Array.isArray(state.countries)) {
				console.error('Countries is not an array:', state.countries)
				return state
			}
			return {
				...state,
				countries: [action.payload, ...state.countries]
			}
		case 'UPDATE_COUNTRY_FIELD':
			if (!state.currentCountry) return state
			return {
				...state,
				currentCountry: {
					...state.currentCountry,
					[action.payload.name]: action.payload.value
				}
			}
		case 'TOGGLE_UPDATE': {
			return { ...state, update: action.payload }
		}
		case 'SET_TOTAL_PAGES':
			return { ...state, totalPages: action.payload }
		case 'SET_PAGE':
			return { ...state, page: action.payload }
		case 'SET_SEARCH_TERM':
			return { ...state, searchTerm: action.payload }
		default:
			return state
	}
}

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(countryReducer, initialState)
	const [errors, setErrors] = useState<Record<string, string>>({})

	const queryParams = {
		page: state.page,
		limit: itemsPerPage,
		searchTerm: state.searchTerm
	}

	const endpoint = createCountryUrl('countries', queryParams)

	const { data: countries, dataLength: countriesLength } = useApiFetch<
		ICountry[]
	>(endpoint, 0, true)

	useEffect(() => {
		if (countries) {
			dispatch({ type: 'SET_COUNTRIES', payload: countries })
			const totalPages = Math.ceil(countriesLength / itemsPerPage)
			dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages })
		}
	}, [countries, countriesLength, dispatch])

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		const payloadValue = type === 'checkbox' ? checked : value
		dispatch({
			type: 'UPDATE_COUNTRY_FIELD',
			payload: { name: name as keyof ICountry, value: payloadValue }
		})
	}

	const handleBlur = async (
		e: FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		try {
			await countryValidationSchema.validateAt(name, {
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
		<CountryContext.Provider
			value={{
				state,
				dispatch,
				handleChange,
				handleBlur,
				errors
			}}
		>
			{children}
		</CountryContext.Provider>
	)
}

export const useCountry = () => {
	const context = useContext(CountryContext)
	if (context === undefined) {
		throw new Error('useCountry must be used within an CountryProvider')
	}
	return context
}
