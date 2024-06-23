import { Spinner } from '@components/atoms'
import PaymentsMasterForm from './PaymentsMasterForm'
import {
	useOnErrorFormSubmit,
	useOnSuccessFormSubmit,
	useSubmitForm
} from 'src/hooks'
import { VendorInvoiceFormData } from './PaymentFormData'
import { usePayment } from '../context/PaymentsProvider'
import { IVendorInvoice } from "src/interfaces/vendorInvoice"

const PaymentsSpecs = () => {
	const { state } = usePayment()
	const { onSuccess } = useOnSuccessFormSubmit(
		'Vendor Invoice',
		'cash_flow',
		state.payment?.update || false
	)
	const { onError } = useOnErrorFormSubmit('Vendor Invoice')

	const { isLoading, handleSubmit } = useSubmitForm<IVendorInvoice>({
		onSuccess,
		onError,
		item: state.payment || {},
		formDataMethods: VendorInvoiceFormData
	})

	return (
		<div className="bg-gray-900 text-gray-200 min-h-screen  justify-center items-center">
			{isLoading ? (
				<Spinner />
			) : (
				<PaymentsMasterForm submitForm={handleSubmit} />
			)}
		</div>
	)
}

export default PaymentsSpecs
