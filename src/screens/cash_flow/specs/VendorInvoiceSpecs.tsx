import { Spinner } from '@components/atoms'
import { VendorInvoiceMasterForm } from './VendorInvoiceMasterForm'
import {
	useOnErrorFormSubmit,
	// useOnSuccessFormSubmit,
	useSubmitForm
} from 'src/hooks'
import { useOnSuccessFormSubmit } from './successFormSubmitVendorInvoice'
import { VendorInvoiceFormData } from './VendorInvoiceFormData'
import { usePayment } from '../context/PaymentsProvider'
import { IVendorInvoice } from 'src/interfaces/vendorInvoice'
import { useVendorInvoiceSubmitForm } from './helperAndConstants'

export const VendorInvoiceSpecs = () => {
	const { state, dispatch, setForceRefresh } = usePayment()

	const routePaymentSplit = (): string => {
		if (typeof state.currentVendorInvoice?.project === 'object') {
			return `project/${state.currentVendorInvoice?.project?._id}/payment_slip`
		} else {
			return `project/${state.currentVendorInvoice?.project}/payment_slip`
		}
	}

	const { onSuccess } = useOnSuccessFormSubmit(
		'Vendor Invoice',
		routePaymentSplit(),
		state.update || false,
		dispatch,
		setForceRefresh
	)
	const { onError } = useOnErrorFormSubmit('Vendor Invoice')

	const { isLoading, handleSubmit } = useSubmitForm<IVendorInvoice>({
		onSuccess,
		onError,
		item: state.currentVendorInvoice || {},
		formDataMethods: VendorInvoiceFormData
	})
	const { handleSubmit: handleSubmitPdf, isLoading: isLoadingPdf } =
		useVendorInvoiceSubmitForm({
			onSuccess,
			onError,
			vendorInvoice: state.currentVendorInvoice as IVendorInvoice
		})

	return (
		<div className="bg-gray-900 text-gray-200 min-h-screen  justify-center items-center">
			{isLoading ? (
				<Spinner />
			) : (
				<VendorInvoiceMasterForm submitForm={handleSubmit} />
			)}
		</div>
	)
}
