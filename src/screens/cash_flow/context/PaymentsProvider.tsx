import React, {
	ChangeEvent,
	Dispatch,
	ReactNode,
	createContext,
	useReducer,
	useState,
	useEffect
} from 'react'
import * as typescript from './contextInterfaces'
import { IVendorInvoice } from 'src/interfaces/vendorInvoice'
import { VALIDATIONS } from '../../../constants'
import * as yup from 'yup'
import { IPayment } from '@interfaces/payment'
import { itemsPerPage } from 'src/constants/pagination'
import { useApiFetch } from 'src/hooks/fetchData'
import { logger } from 'src/helper/debugging/logger'
import { useLocation } from 'react-router-dom'
import { initialState } from './initialState'
import { createVendorInvoiceUrl } from '../specs/createVendorInvoiceUrl'

const PaymentsContext = createContext<
	| {
			state: typescript.VendorInvoiceState
			dispatch: Dispatch<typescript.VendorInvoiceAction>
			handleChange: (
				e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
				dispatchType: 'UPDATE_VENDORINVOICE_FIELD' | 'UPDATE_PAYMENT_FIELD'
			) => void
			errors: { [key: string]: string | undefined }
			setErrors: React.Dispatch<React.SetStateAction<any>>
			handleBlur: (
				e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
			) => void
			validate: () => Promise<boolean>
			setForceRefresh: React.Dispatch<React.SetStateAction<number>>
			isLoading: boolean
	  }
	| undefined
>(undefined)

const paymentsReducer = (
	state: typescript.VendorInvoiceState,
	action: typescript.VendorInvoiceAction
): typescript.VendorInvoiceState => {
	switch (action.type) {
		case 'SET_VENDORINVOICES':
			if (!Array.isArray(action.payload)) {
				console.error(
					'SET_VENDORINVOICES payload is not an array:',
					action.payload
				)
				return state
			}
			return { ...state, vendorInvoices: action.payload }
		case 'SET_VENDORINVOICE':
			return { ...state, currentVendorInvoice: action.payload }
		case 'ADD_VENDORINVOICE':
			return {
				...state,
				vendorInvoices: [...state.vendorInvoices, action.payload],
				currentVendorInvoice: action.payload
			}
		case 'SET_TOTAL_PAGES':
			return { ...state, totalPages: action.payload }
		case 'SET_PAGE':
			return { ...state, page: action.payload }
		case 'SET_SEARCH_TERM':
			return { ...state, searchTerm: action.payload }
		case 'TOGGLE_UPDATE': {
			return { ...state, update: action.payload }
		}
		case 'UPDATE_VENDORINVOICE_FIELD':
			return {
				...state,
				currentVendorInvoice: {
					...state.currentVendorInvoice,
					[action.payload.name]: action.payload.value
				}
			}
		case 'ADD_PAYMENT': {
			return { ...state, payment: action.payload }
		}
		case 'UPDATE_PAYMENT_FIELD':
			return {
				...state,
				payment: {
					...state.payment,
					[action.payload.name]: action.payload.value
				}
			}
		case 'ADD_PAYMENT_TO_VENDORINVOICE': {
			const { payment } = action.payload
			const stateCopy: typescript.VendorInvoiceState = JSON.parse(
				JSON.stringify(state)
			)
			if (stateCopy.currentVendorInvoice) {
				const paymentsCopy = [
					...(stateCopy.currentVendorInvoice.relatedPayments as IPayment[]),
					payment
				]
				stateCopy.currentVendorInvoice.relatedPayments = paymentsCopy
			}
			return {
				...state,
				currentVendorInvoice: stateCopy.currentVendorInvoice
			}
		}
		case 'UPDATE_PAYMENT': {
			const { paymentUpdate } = action.payload
			return {
				...state,
				payment: paymentUpdate
			}
		}
		case 'UPDATE_PAYMENT_TO_VENDORINVOICE': {
			const { payment } = action.payload
			const stateCopy: typescript.VendorInvoiceState = JSON.parse(
				JSON.stringify(state)
			)
			if (
				stateCopy.currentVendorInvoice &&
				stateCopy.currentVendorInvoice.relatedPayments
			) {
				const paymentIndex =
					stateCopy.currentVendorInvoice.relatedPayments?.findIndex(
						(el) => el._id === payment._id
					)
				stateCopy.currentVendorInvoice.relatedPayments[paymentIndex] = payment
			}
			return {
				...state,
				currentVendorInvoice: stateCopy.currentVendorInvoice
			}
		}
		case 'DELETE_PAYMENT': {
			const { updatedPayments } = action.payload
			const stateCopy: typescript.VendorInvoiceState = JSON.parse(
				JSON.stringify(state)
			)
			if (
				stateCopy.currentVendorInvoice &&
				stateCopy.currentVendorInvoice.relatedPayments
			) {
				const vendorInvoice = stateCopy.currentVendorInvoice
				vendorInvoice.relatedPayments = updatedPayments
			}
			return {
				...state,
				currentVendorInvoice: stateCopy.currentVendorInvoice
			}
		}
		case 'SET_FILTER': {
			const { name, value } = action.payload
			return {
				...state,
				[name]: value
			}
		}
		default:
			return state
	}
}

export const PaymentsProvider: React.FC<{ children: ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(paymentsReducer, initialState)

	const location = useLocation()
	const isPathnameExpense =
		location.pathname === '/app/expense/vendorInvoice/specs'

	const queryParams = {
		page: state.page,
		limit: itemsPerPage,
		vendorType: state.vendorTypeFilter,
		vendor: state.vendorIdFilter,
		project: state.projectIdFilter,
		searchTerm: state.searchTerm
	}
	const endpoint = createVendorInvoiceUrl('vendorInvoices', queryParams)
	const [forceRefresh, setForceRefresh] = useState(0) // utilizo el setForceRefresh para cambiar el valor de forceRefresh , con esto hago que se utilice otra el hook personalizado "useApiFetch"
	const {
		data: vendorInvoices,
		dataLength: vendorInvoicesLength,
		isLoading
	} = useApiFetch<IVendorInvoice[]>(endpoint, forceRefresh)

	useEffect(() => {
		if (Array.isArray(vendorInvoices)) {
			dispatch({ type: 'SET_VENDORINVOICES', payload: vendorInvoices })
			const totalPages = Math.ceil(vendorInvoicesLength / itemsPerPage)
			dispatch({ type: 'SET_TOTAL_PAGES', payload: totalPages })
		} else if (vendorInvoices !== undefined) {
			logger.error('Fetched projects is not an array:', vendorInvoices)
		}
	}, [vendorInvoices, vendorInvoicesLength, dispatch])

	//useEffect para reiniciar el state.page
	useEffect(() => {
		dispatch({ type: 'SET_PAGE', payload: 1 })
	}, [state.searchTerm])

	const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(
		{}
	)
	const validationSchema: yup.ObjectSchema<any> = !isPathnameExpense
		? VALIDATIONS.vendorInvoice
		: VALIDATIONS.generalExpenseVendorInvoice

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		dispatchType: 'UPDATE_VENDORINVOICE_FIELD' | 'UPDATE_PAYMENT_FIELD'
	) => {
		const target = e.target as HTMLInputElement | HTMLSelectElement
		const name = target.name as keyof IVendorInvoice
		let value: string | number | boolean = target.value
		dispatch({
			type: dispatchType as any,
			payload: {
				name,
				value
			}
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
			await validationSchema.validate(state.currentVendorInvoice, {
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
		<PaymentsContext.Provider
			value={{
				state,
				dispatch,
				handleChange,
				errors,
				setErrors,
				handleBlur,
				validate,
				setForceRefresh,
				isLoading
			}}
		>
			{children}
		</PaymentsContext.Provider>
	)
}

export const usePayment = () => {
	const context = React.useContext(PaymentsContext)
	if (context === undefined) {
		throw new Error('usePayment must be used within a PaymentsProvider')
	}
	return context
}
