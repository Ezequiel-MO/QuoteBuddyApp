import { Spinner } from '@components/atoms'
import { useLocation } from 'react-router-dom'
import { IPayment } from '@interfaces/payment'
import PaymentsMasterForm from './PaymentsMasterForm'
import {
	useOnErrorFormSubmit,
	useOnSuccessFormSubmit,
	useSubmitForm
} from 'src/hooks'
import { PaymentFormData } from './PaymentFormData'

const PaymentsSpecs = () => {
	const location = useLocation()
	const payment: IPayment = (location.state as { payment: IPayment })
		?.payment || {
		_id: 'sdfasdfasdf',
		amount: 1000,
		paymentDate: '30-07-2024',
		vendorInvoiceId: 'adsfas',
		status: 'Pending',
		projectId: 'BCNSAMPLE2023'
	}

	const update = payment && Object.keys(payment).length > 0
	const { onSuccess } = useOnSuccessFormSubmit('Payment', 'cash_flow', update)
	const { onError } = useOnErrorFormSubmit('Payment')

	const { isLoading, handleSubmit } = useSubmitForm<IPayment>({
		onSuccess,
		onError,
		item: payment,
		formDataMethods: PaymentFormData
	})

	return (
		<div className="bg-gray-900 text-gray-200 min-h-screen flex justify-center items-center">
			{isLoading ? (
				<Spinner />
			) : (
				<PaymentsMasterForm
					submitForm={(values, endpoint, update) =>
						handleSubmit(values, [], endpoint, update)
					}
				/>
			)}
		</div>
	)
}

export default PaymentsSpecs
