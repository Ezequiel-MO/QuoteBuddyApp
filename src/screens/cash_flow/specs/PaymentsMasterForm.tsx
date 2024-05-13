import React, { useEffect } from 'react'
import { IPayment } from '@interfaces/payment'
import PaymentsFormFields from './PaymentsFormFields'
import { SubmitInput } from '@components/atoms'
import { usePayment } from '../context/PaymentsProvider'
import { CreateBlankPayment } from '../context/CreateBlankPayment'

type SubmitFormType = (
	values: IPayment,
	endpoint: string,
	update: boolean
) => void

interface Props {
	submitForm: SubmitFormType
}

const PaymentsMasterForm = ({ submitForm }: Props) => {
	const { state, dispatch } = usePayment()

	useEffect(() => {
		if (!state.payment) {
			const newPayment: IPayment = CreateBlankPayment()
			dispatch({
				type: 'ADD_PAYMENT',
				payload: newPayment
			})
		}
	}, [state.payment])

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const endpoint = 'payments'

		if (state.payment && state.payment.amount !== undefined) {
			submitForm(
				state.payment as IPayment,
				endpoint,
				state.payment.update || false
			)
		} else {
			console.error('All required fields must be filled.')
		}
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-2">
			<PaymentsFormFields />
			<div className="flex justify-center items-center">
				<SubmitInput update={false} title="Payment" />
			</div>
		</form>
	)
}

export default PaymentsMasterForm
