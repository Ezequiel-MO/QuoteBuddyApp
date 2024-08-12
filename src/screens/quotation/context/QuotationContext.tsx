import {
	ChangeEvent,
	createContext,
	Dispatch,
	FocusEvent,
	useContext,
	useReducer,
	useState
} from 'react'
import * as typescript from './contextinterfaces'
import * as Yup from 'yup'
import initialState from './initialState'
import quotationReducer from './quotationReducer'
import { IProject } from '@interfaces/project'
import { quotationValidationSchema } from '../specs/HotelValidation'

const QuotationContext = createContext<
	| {
			state: typescript.QuotationState
			dispatch: Dispatch<typescript.QuotationAction>
			handleChange: (
				e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
			) => void
			handleBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void
			errors: Record<string, string>
	  }
	| undefined
>(undefined)

export const QuotationProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(quotationReducer, initialState)
	const [errors, setErrors] = useState<Record<string, string>>({})

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		const payloadValue = type === 'checkbox' ? checked : value
		dispatch({
			type: 'UPDATE_QUOTATION_FIELD',
			payload: { name: name as keyof IProject, value: payloadValue }
		})
	}

	const handleBlur = async (
		e: FocusEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, type, value, checked } = e.target as
			| HTMLInputElement
			| (HTMLSelectElement & { checked: boolean })
		try {
			await quotationValidationSchema.validateAt(name, {
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
		<QuotationContext.Provider
			value={{
				state,
				dispatch,
				handleChange,
				handleBlur,
				errors
			}}
		>
			{children}
		</QuotationContext.Provider>
	)
}

export const useQuotation = () => {
	const context = useContext(QuotationContext)
	if (context === undefined) {
		throw new Error('useQuotation must be used within a QuotationProvider')
	}
	return context
}
