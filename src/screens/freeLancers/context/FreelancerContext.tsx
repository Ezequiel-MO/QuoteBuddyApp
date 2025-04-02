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
import createFreelancerUrl from '../specs/createFreelancerUrl'
import { IFreelancer } from '@interfaces/freelancer'
import { freelancerValidationSchema } from '../specs/FreelancerValidation'
import { logger } from 'src/helper/debugging/logger'

const FreelancerContext = createContext<
	| {
		state: typescript.FreelancerState
		dispatch: Dispatch<typescript.FreelancerAction>
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

const freelancerReducer = (
	state: typescript.FreelancerState,
	action: typescript.FreelancerAction
): typescript.FreelancerState => {
	switch (action.type) {
		case 'SET_FREELANCERS':
			if (!Array.isArray(action.payload)) {
				console.error(
					'SET_FREELANCERS payload is not an array:',
					action.payload
				)
				return state
			}
			return { ...state, freelancers: action.payload }
		case 'SET_FREELANCER':
			return { ...state, currentFreelancer: action.payload }
		case 'ADD_FREELANCER':
			if (!Array.isArray(state.freelancers)) {
				console.error('Freelancers is not an array:', state.freelancers)
				return state
			}
			return {
				...state,
				freelancers: [...state.freelancers, action.payload]
			}
		case 'UPDATE_FREELANCER_FIELD':
			if (!state.currentFreelancer) return state
			return {
				...state,
				currentFreelancer: {
					...state.currentFreelancer,
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

export const FreelancerProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(freelancerReducer, initialState)
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [forceRefresh, setForceRefresh] = useState(0)

	const queryParams = {
		page: state.page,
		limit: itemsPerPage,
		city: state.currentFreelancer?.city,
		searchTerm: state.searchTerm
	}

	const [filterIsDeleted, setFilterIsDeleted] = useState(false)

	const endpoint = createFreelancerUrl(
		!filterIsDeleted ? 'freelancers' : 'freelancers/isDeleted/true',
		queryParams
	)

	const {
		data: freelancers,
		dataLength: freelancersLength,
		isLoading
	} = useApiFetch<IFreelancer[]>(
		endpoint,
		forceRefresh,
		true,
		state.searchTerm ? 500 : 0
	)

	useEffect(() => {
		if (Array.isArray(freelancers)) {
			dispatch({ type: 'SET_FREELANCERS', payload: freelancers })
			const totalPages = Math.ceil(freelancersLength / itemsPerPage)
			dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages })
		} else if (freelancers !== undefined) {
			logger.error('Fetched freelancers is not an array:', freelancers)
		}
	}, [freelancers, freelancersLength, dispatch])

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
			type: 'UPDATE_FREELANCER_FIELD',
			payload: { name: name as keyof IFreelancer, value: payloadValue }
		})
	}

	const handleBlur = async (
		e: FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		if (name === 'type' && value === '') {
			setErrors((prevErrors) => ({
				...prevErrors,
				[name]: 'Type of freelancer is required'
			}))
			return
		}
		try {
			await freelancerValidationSchema.validateAt(name, {
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
		<FreelancerContext.Provider
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
		</FreelancerContext.Provider>
	)
}

export const useFreelancer = () => {
	const context = useContext(FreelancerContext)
	if (context === undefined) {
		throw new Error('useFreelancer must be used within a FreelancerProvider')
	}
	return context
}
