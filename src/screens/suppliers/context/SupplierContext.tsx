import {
	ChangeEvent,
	FocusEvent,
	createContext,
	useContext,
	useEffect,
	useReducer,
	useState
} from 'react'
import * as typescript from './contextinterfaces'
import initialState from './initialState'
import { itemsPerPage } from 'src/constants/pagination'
import createSupplierUrl from '../specs/createSupplierUrl'
import { useApiFetch } from 'src/hooks/fetchData'
import { ISupplier } from '@interfaces/supplier'
import { logger } from 'src/helper/debugging/logger'
import { supplierValidationSchema } from '../specs/SupplierValidation'
import * as Yup from 'yup'

const SupplierContext = createContext<
	| {
			state: typescript.SupplierState
			dispatch: React.Dispatch<typescript.SupplierAction>
			handleChange: (
				e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
			) => void
			handleBlur: (
				e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
			) => void
			errors: Record<string, string>
			setForceRefresh: React.Dispatch<React.SetStateAction<number>>
			isLoading: boolean
	  }
	| undefined
>(undefined)

const supplierReducer = (
	state: typescript.SupplierState,
	action: typescript.SupplierAction
): typescript.SupplierState => {
	switch (action.type) {
		case 'SET_SUPPLIERS':
			if (!Array.isArray(action.payload)) {
				console.error('SET_SUPPLIERS payload is not an array:', action.payload)
				return state
			}
			return { ...state, suppliers: action.payload }
		case 'SET_SUPPLIER':
			return { ...state, currentSupplier: action.payload }
		case 'SET_TOTAL_PAGES':
			return { ...state, totalPages: action.payload }
		case 'UPDATE_SUPPLIER_FIELD':
			if (!state.currentSupplier) return state
			return {
				...state,
				currentSupplier: {
					...state.currentSupplier,
					[action.payload.name]: action.payload.value
				}
			}
		case 'SET_SEARCH_TERM':
			return { ...state, searchTerm: action.payload }
		case 'TOGGLE_UPDATE':
			return { ...state, update: action.payload }
		default:
			return state
	}
}

export const SupplierProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(supplierReducer, initialState)
	const [errors, setErrors] = useState<Record<string, string>>({})
	const [forceRefresh, setForceRefresh] = useState(0)

	const queryParams = {
		page: state.page,
		limit: itemsPerPage,
		city: state.currentSupplier?.city,
		searchTerm: state.searchTerm
	}

	const endpoint = createSupplierUrl('suppliers', queryParams)

	const {
		data: suppliers,
		dataLength: suppliersLength,
		isLoading
	} = useApiFetch<ISupplier[]>(endpoint, forceRefresh, true)

	useEffect(() => {
		if (Array.isArray(suppliers)) {
			dispatch({ type: 'SET_SUPPLIERS', payload: suppliers })
			const totalPages = Math.ceil(suppliersLength / itemsPerPage)
			dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages })
		} else if (suppliers !== undefined) {
			logger.error('Fetched suppliers is not an array:', suppliers)
		}
	}, [suppliers, suppliersLength, dispatch])

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
			type: 'UPDATE_SUPPLIER_FIELD',
			payload: { name: name as keyof ISupplier, value: payloadValue }
		})
	}

	const handleBlur = async (
		e: FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		try {
			await supplierValidationSchema.validateAt(name, {
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
		<SupplierContext.Provider
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
		</SupplierContext.Provider>
	)
}

export const useSupplier = () => {
	const context = useContext(SupplierContext)
	if (context === undefined) {
		throw new Error('useSupplier must be used within a SupplierProvider')
	}
	return context
}
