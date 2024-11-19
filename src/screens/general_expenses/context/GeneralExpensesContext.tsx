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
import initialState from './initialState'
import { itemsPerPage } from 'src/constants/pagination'
import createGeneralExpenseUrl from '../specs/createGeneralExpenseUrl'
import { useApiFetch } from 'src/hooks/fetchData'
import { IGeneralExpense } from '@interfaces/generalExpense'
import { logger } from 'src/helper/debugging/logger'
import { generalExpenseValidationSchema } from '../specs/GeneralExpenseValidation'

const GeneralExpenseContext = createContext<
	| {
			state: typescript.GeneralExpensesState
			dispatch: Dispatch<typescript.GeneralExpensesAction>
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

const generalExpensesReducer = (
	state: typescript.GeneralExpensesState,
	action: typescript.GeneralExpensesAction
): typescript.GeneralExpensesState => {
	switch (action.type) {
		case 'SET_EXPENSES':
			if (!Array.isArray(action.payload)) {
				console.error(
					'SET_GENERAL_EXPENSES payload is not an array:',
					action.payload
				)
				return state
			}
			return { ...state, expenses: action.payload }
		case 'SET_EXPENSE':
			return { ...state, currentExpense: action.payload }
		case 'ADD_EXPENSE':
			if (!Array.isArray(state.expenses)) {
				console.error('General Expenses is not an array:', state.expenses)
				return state
			}
			return {
				...state,
				expenses: [action.payload, ...state.expenses]
			}
		case 'UPDATE_EXPENSE_FIELD':
			if (!state.currentExpense) return state
			return {
				...state,
				currentExpense: {
					...state.currentExpense,
					[action.payload.name]: action.payload.value
				}
			}
		case 'TOGGLE_UPDATE':
			return { ...state, update: action.payload }
		case 'SET_PAGE':
			return { ...state, page: action.payload }
		case 'SET_SEARCH_TERM':
			return { ...state, searchTerm: action.payload }
		case 'SET_TOTAL_PAGES':
			return { ...state, totalPages: action.payload }

		default:
			return state
	}
}

export const GeneralExpenseProvider: React.FC<{
	children: React.ReactNode
}> = ({ children }) => {
	const [state, dispatch] = useReducer(generalExpensesReducer, initialState)
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [forceRefresh, setForceRefresh] = useState(0)

	const queryParams = {
		page: state.page,
		limit: itemsPerPage,
		searchTerm: state.searchTerm
	}

	const endpoint = createGeneralExpenseUrl('expenses', queryParams)

	const {
		data: generalExpenses,
		dataLength: generalExpenseslength,
		isLoading
	} = useApiFetch<IGeneralExpense[]>(endpoint, forceRefresh, true)

	useEffect(() => {
		if (Array.isArray(generalExpenses)) {
			dispatch({ type: 'SET_EXPENSES', payload: generalExpenses })
			const totalPages = Math.ceil(generalExpenseslength / itemsPerPage)
			dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages })
		} else if (generalExpenses !== undefined) {
			logger.error('Fetched freelancers is not an array:', generalExpenses)
		}
	}, [generalExpenses, generalExpenseslength, dispatch])

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
			type: 'UPDATE_EXPENSE_FIELD',
			payload: { name: name as keyof IGeneralExpense, value: payloadValue }
		})
	}

	const handleBlur = async (
		e: FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		try {
			await generalExpenseValidationSchema.validateAt(name, {
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
		<GeneralExpenseContext.Provider
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
		</GeneralExpenseContext.Provider>
	)
}

export const useGeneralExpense = () => {
	const context = useContext(GeneralExpenseContext)
	if (context === undefined) {
		throw new Error(
			'useGeneralExpenseContext must be used within a GeneralExpenseProvider'
		)
	}
	return context
}
