import { IPayment } from '@interfaces/payment'

export interface PaymentState {
	payment: Partial<IPayment> | null
}

export type PaymentAction =
	| { type: 'ADD_PAYMENT'; payload: IPayment }
	| {
			type: 'UPDATE_PAYMENT_FIELD'
			payload: { name: keyof IPayment; value: any }
	  }
	| { type: 'DELETE_PAYMENT'; payload: string }
