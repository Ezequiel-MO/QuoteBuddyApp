import React from 'react'
import { IPayment } from '@interfaces/payment'
import PaymentsFormFields from './PaymentsFormFields'
import { SubmitInput } from '@components/atoms'

type SubmitFormType = (
	values: IPayment,
	endpoint: string,
	update: boolean
) => void

interface Props {
	submitForm: SubmitFormType
}

const PaymentsMasterForm = ({ submitForm }: Props) => {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const values: IPayment = {
			_id: 'sdfasdfasdf',
			amount: 21000,
			paymentDate: '30-07-2024',
			vendorInvoiceId: '660bcd57f24c611e6fc58334',
			method: 'Cash',
			status: 'Pending',
			projectId: '64e48e2cd00ea2d8a5cf274e'
		}
		const endpoint = 'payments'
		const update = false

		submitForm(values, endpoint, update)
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
