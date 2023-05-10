import { Spinner } from '../../../components/atoms/spinner/Spinner'

import {
	useCurrentInvoice,
	useOnErrorFormSubmit,
	useOnSuccessFormSubmit
} from '../../../hooks'
import './invoice.css'
import {
	InvoicePostingButton,
	LinesBreakdownCheckBox,
	RenderLogo,
	usePostInvoice,
	VATCheckbox
} from './'

export const InvoiceHeader = () => {
	const { toggleTaxBreakdown, toggleLinesBreakdown, currentInvoice } =
		useCurrentInvoice()

	const { onError } = useOnErrorFormSubmit('Invoice')
	const { onSuccess } = useOnSuccessFormSubmit('Invoice', 'invoice', false)

	const { isLoading, handlePostInvoice } = usePostInvoice(
		onSuccess,
		onError,
		currentInvoice
	)

	return (
		<div className="border-b-[13px] border-b-white-50 h-[112px] mx-1 flex justify-between">
			{isLoading ? (
				<Spinner />
			) : (
				<>
					<RenderLogo />
					<div className="flex items-center">
						<LinesBreakdownCheckBox
							currentInvoice={currentInvoice}
							toggleLinesBreakdown={toggleLinesBreakdown}
						/>
						<VATCheckbox
							currentInvoice={currentInvoice}
							toggleTaxBreakdown={toggleTaxBreakdown}
						/>
						<InvoicePostingButton
							currentInvoice={currentInvoice}
							handlePostInvoice={handlePostInvoice}
						/>
					</div>
				</>
			)}
		</div>
	)
}
