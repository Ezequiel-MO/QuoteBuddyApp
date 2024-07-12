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
import createCompanyUrl from '../specs/createCompanyUrl'
import { IClientCompany } from '@interfaces/clientCompany'
import { companyValidationSchema } from '../specs/CompanyValidation'

const CompanyContext = createContext<
	| {
			state: typescript.CompanyState
			dispatch: Dispatch<typescript.CompanyAction>
			handleChange: (
				e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
			) => void
			handleBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void
			errors: Record<string, string>
	  }
	| undefined
>(undefined)

const companyReducer = (
	state: typescript.CompanyState,
	action: typescript.CompanyAction
): typescript.CompanyState => {
	switch (action.type) {
		case 'SET_COMPANIES':
			if (!Array.isArray(action.payload)) {
				console.error('SET_COMPANIES payload is not an array:', action.payload)
				return state
			}
			return { ...state, companies: action.payload }
		case 'SET_COMPANY':
			return { ...state, currentCompany: action.payload }
		case 'ADD_COMPANY':
			if (!Array.isArray(state.companies)) {
				console.error('Companies is not an array:', state.companies)
				return state
			}
			return {
				...state,
				companies: [action.payload, ...state.companies]
			}
		case 'UPDATE_COMPANY_FIELD':
			if (!state.currentCompany) return state
			return {
				...state,
				currentCompany: {
					...state.currentCompany,
					[action.payload.name]: action.payload.value
				}
			}
		case 'REMOVE_EMPLOYEE':
			if (!state.currentCompany?.employees) return state
			return {
				...state,
				currentCompany: {
					...state.currentCompany,
					employees: state.currentCompany.employees.filter(
						(employee) => employee._id !== action.payload
					)
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

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(companyReducer, initialState)
	const [errors, setErrors] = useState<Record<string, string>>({})

	const queryParams = {
		page: state.page,
		limit: itemsPerPage,
		country: state.currentCompany?.country,
		searchTerm: state.searchTerm
	}

	const endpoint = createCompanyUrl('client_companies', queryParams)

	const { data: companies, dataLength: companiesLength } = useApiFetch<
		IClientCompany[]
	>(endpoint, 0, true)

	useEffect(() => {
		if (companies) {
			dispatch({ type: 'SET_COMPANIES', payload: companies })
			const totalPages = Math.ceil(companiesLength / itemsPerPage)
			dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages })
		}
	}, [companies, companiesLength, dispatch])

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		const payloadValue = type === 'checkbox' ? checked : value
		dispatch({
			type: 'UPDATE_COMPANY_FIELD',
			payload: { name: name as keyof IClientCompany, value: payloadValue }
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
				[name]: 'Type of company is required'
			}))
			return
		}
		try {
			await companyValidationSchema.validateAt(name, {
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
		<CompanyContext.Provider
			value={{
				state,
				dispatch,
				handleChange,
				handleBlur,
				errors
			}}
		>
			{children}
		</CompanyContext.Provider>
	)
}

export const useCompany = () => {
	const context = useContext(CompanyContext)
	if (context === undefined) {
		throw new Error('useCompany must be used within a CompanyProvider')
	}
	return context
}
