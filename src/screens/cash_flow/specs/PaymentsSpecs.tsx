import { Spinner } from '@components/atoms'
import { IPayment } from '@interfaces/payment'
import PaymentsMasterForm from './PaymentsMasterForm'
import {
	useOnErrorFormSubmit,
	useOnSuccessFormSubmit,
	useSubmitForm
} from 'src/hooks'
import { PaymentFormData } from './PaymentFormData'
import { usePayment } from '../context/PaymentsProvider'

const PaymentsSpecs = () => {
	const { state } = usePayment()
	const { onSuccess } = useOnSuccessFormSubmit(
		'Payment',
		'cash_flow',
		state.payment?.update || false
	)
	const { onError } = useOnErrorFormSubmit('Payment')

	const { isLoading, handleSubmit } = useSubmitForm<IPayment>({
		onSuccess,
		onError,
		item: state.payment || {},
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
