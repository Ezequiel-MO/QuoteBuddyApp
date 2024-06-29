import PaymentsFormFields from './PaymentsFormFields'
import { SubmitInput } from '@components/atoms'
import { usePayment } from '../context/PaymentsProvider'
import { CreateBlankPayment } from '../context/CreateBlankPayment'
import React, { useEffect } from 'react'
import { IVendorInvoice } from "src/interfaces/vendorInvoice"

type SubmitFormType = (
	values: IVendorInvoice,
	files: [],
	endpoint: string,
	update: boolean
) => Promise<void>

interface Props {
	submitForm: SubmitFormType
}

const PaymentsMasterForm = ({ submitForm }: Props) => {
	const { state, errors, setErrors, validate } = usePayment()

	useEffect(() => {
		setErrors({})
	}, [])


	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const endpoint = 'vendorInvoices'
		const isValid = await validate()
		console.log({ isValid, errors })
		if (isValid && state.vendorInvoice) {
			submitForm(
				state.vendorInvoice as IVendorInvoice,
				[],
				endpoint,
				state.vendorInvoice.update || false
			)
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
