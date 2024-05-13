import React, {
	ChangeEvent,
	Dispatch,
	ReactNode,
	createContext,
	useReducer
} from 'react'
import * as typescript from './contextInterfaces'
import { IPayment } from '@interfaces/payment'

const initialState: typescript.PaymentState = {
	payment: null
}

const PaymentsContext = createContext<
	| {
			state: typescript.PaymentState
			dispatch: Dispatch<typescript.PaymentAction>
			handleChange: (
				e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
			) => void
	  }
	| undefined
>(undefined)

const paymentsReducer = (
	state: typescript.PaymentState,
	action: typescript.PaymentAction
): typescript.PaymentState => {
	switch (action.type) {
		case 'ADD_PAYMENT':
			return { ...state, payment: action.payload }
		case 'UPDATE_PAYMENT_FIELD':
			return {
				...state,
				payment: {
					...state.payment,
					[action.payload.name]: action.payload.value
				}
			}
		case 'DELETE_PAYMENT':
			return { ...state, payment: null }
		default:
			return state
	}
}

export const PaymentsProvider: React.FC<{ children: ReactNode }> = ({
	children
}) => {
	const [state, dispatch] = useReducer(paymentsReducer, initialState)

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const target = e.target as HTMLInputElement | HTMLSelectElement
		const name = target.name as keyof IPayment
		let value: string | number | boolean = target.value
		dispatch({
			type: 'UPDATE_PAYMENT_FIELD',
			payload: {
				name,
				value
			}
		})
	}

	return (
		<PaymentsContext.Provider value={{ state, dispatch, handleChange }}>
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
