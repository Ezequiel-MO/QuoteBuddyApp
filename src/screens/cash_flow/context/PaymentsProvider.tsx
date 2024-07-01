import React, {
	ChangeEvent,
	Dispatch,
	ReactNode,
	createContext,
	useReducer,
	useState
} from 'react'
import * as typescript from './contextInterfaces'
import { IVendorInvoice } from "src/interfaces/vendorInvoice"
import { VALIDATIONS } from '../../../constants'
import * as yup from 'yup'

const initialState: typescript.VendorInvoiceState = {
	vendorInvoice: null
}

const PaymentsContext = createContext<
	| {
		state: typescript.VendorInvoiceState
		dispatch: Dispatch<typescript.VendorInvoiceAction>
		handleChange: (
			e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
		) => void
		errors: { [key: string]: string | undefined }
		setErrors: React.Dispatch<React.SetStateAction<any>>
		handleBlur: (
			e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
		) => void
		validate: () => Promise<boolean>
	}
	| undefined
>(undefined)

const paymentsReducer = (
	state: typescript.VendorInvoiceState,
	action: typescript.VendorInvoiceAction
): typescript.VendorInvoiceState => {
	switch (action.type) {
		case 'ADD_PAYMENT':
			return { ...state, vendorInvoice: action.payload }
		case 'UPDATE_PAYMENT_FIELD':
			return {
				...state,
				vendorInvoice: {
					...state.vendorInvoice,
					[action.payload.name]: action.payload.value
				}
			}
		case "UPDATE_VENDORINVOICE": {
			const { vendorInvoiceUpdate } = action.payload
			console.log(vendorInvoiceUpdate)
			return {
				...state,
				vendorInvoice: vendorInvoiceUpdate
			}
		}
		case 'DELETE_PAYMENT':
			return { ...state, vendorInvoice: null }
		default:
			return state
	}
}

export const PaymentsProvider: React.FC<{ children: ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(paymentsReducer, initialState)

	const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({})
	const validationSchema: yup.ObjectSchema<any> = VALIDATIONS.vendorInvoice

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const target = e.target as HTMLInputElement | HTMLSelectElement
		const name = target.name as keyof IVendorInvoice
		let value: string | number | boolean = target.value
		dispatch({
			type: 'UPDATE_PAYMENT_FIELD',
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

	const handleBlur = async (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
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
			await validationSchema.validate(state.vendorInvoice, { abortEarly: false })
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
		<PaymentsContext.Provider value={{ state, dispatch, handleChange, errors, setErrors, handleBlur, validate }}>
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
