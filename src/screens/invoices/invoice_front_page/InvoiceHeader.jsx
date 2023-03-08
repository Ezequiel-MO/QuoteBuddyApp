import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Spinner } from '../../../components/atoms/spinner/Spinner'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import { useCurrentInvoice } from '../../../hooks'
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

	const navigate = useNavigate()

	const { isLoading, handlePostInvoice } = usePostInvoice(
		{
			onSuccess: () => {
				toast.success('Invoice Saved', toastOptions)
				navigate('/app/invoice')
			},
			onError: (error) => {
				toast.error(
					`Error Creating Invoice, ${
						error.message || 'unable to create the invoice'
					}`,
					errorToastOptions
				)
			}
		},
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
