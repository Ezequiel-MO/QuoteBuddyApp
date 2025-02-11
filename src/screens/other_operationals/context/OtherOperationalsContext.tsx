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
import { otherOperationalValidationSchema } from '../specs/OtherOperationalValidation'
import { itemsPerPage } from 'src/constants/pagination'
import { useApiFetch } from 'src/hooks/fetchData'
import { logger } from 'src/helper/debugging/logger'
import createOtherOperationalUrl from '../specs/createOtherOperationalUrl'
import { IOtherOperational } from '@interfaces/otherOperational'

const OtherOperationalContext = createContext<
	| {
			state: typescript.OtherOperationalState
			dispatch: Dispatch<typescript.OtherOperationalAction>
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

const otherOperationalReducer = (
	state: typescript.OtherOperationalState,
	action: typescript.OtherOperationalAction
): typescript.OtherOperationalState => {
	switch (action.type) {
		case 'SET_OTHEROPERATIONALS':
			if (!Array.isArray(action.payload)) {
				console.error(
					'SET_OTHER_OPERATIONALS payload is not an array:',
					action.payload
				)
				return state
			}
			return { ...state, otherOperationals: action.payload }
		case 'SET_OTHEROPERATIONAL':
			return { ...state, currentOtherOperational: action.payload }
		case 'ADD_OTHEROPERATIONAL':
			if (!Array.isArray(state.otherOperationals)) {
				console.error(
					'Other Operational Invoices is not an array:',
					state.otherOperationals
				)
				return state
			}
			return {
				...state,
				otherOperationals: [action.payload, ...state.otherOperationals]
			}
		case 'UPDATE_OTHEROPERATIONAL_FIELD':
			if (!state.currentOtherOperational) return state
			return {
				...state,
				currentOtherOperational: {
					...state.currentOtherOperational,
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

export const OtherOperationalsProvider: React.FC<{
	children: React.ReactNode
}> = ({ children }) => {
	const [state, dispatch] = useReducer(otherOperationalReducer, initialState)
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [forceRefresh, setForceRefresh] = useState(0)

	const queryParams = {
		page: state.page,
		limit: itemsPerPage,
		city: state.currentOtherOperational?.city,
		searchTerm: state.searchTerm
	}

	const endpoint = createOtherOperationalUrl('OtherOperationals', queryParams)

	const {
		data: otherOperationals,
		dataLength: otherOperationalsLength,
		isLoading
	} = useApiFetch<IOtherOperational[]>(endpoint, forceRefresh, true)

	useEffect(() => {
		state.page = 1
	}, [state.searchTerm])

	useEffect(() => {
		if (Array.isArray(otherOperationals)) {
			dispatch({ type: 'SET_OTHEROPERATIONALS', payload: otherOperationals })
			const totalPages = Math.ceil(otherOperationalsLength / itemsPerPage)
			dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages })
		} else if (otherOperationals !== undefined) {
			logger.error(
				'Fetched other operational invoices is not an array:',
				otherOperationals
			)
		}
	}, [otherOperationals, otherOperationalsLength, dispatch])

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		const payloadValue = type === 'checkbox' ? checked : value
		dispatch({
			type: 'UPDATE_OTHEROPERATIONAL_FIELD',
			payload: { name: name as keyof IOtherOperational, value: payloadValue }
		})
	}

	const handleBlur = async (
		e: FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		try {
			await otherOperationalValidationSchema.validateAt(name, {
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
		<OtherOperationalContext.Provider
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
		</OtherOperationalContext.Provider>
	)
}

export const useOtherOperational = () => {
	const context = useContext(OtherOperationalContext)
	if (context === undefined) {
		throw new Error(
			'useOtherOperational must be used within a OtherOperationalProvider'
		)
	}
	return context
}
