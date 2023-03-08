import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import cutt_logo from '../../../assets/CUTT_LOGO.png'
import { Spinner } from '../../../components/atoms/spinner/Spinner'
import { errorToastOptions, toastOptions } from '../../../helper/toast'
import { useCurrentInvoice } from '../../../hooks'
import './invoice.css'
import { usePostInvoice } from './usePostInvoice'

export const InvoiceLogo = () => {
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
		<>
			{isLoading ? (
				<Spinner />
			) : (
				<div className="border-b-[13px] border-b-white-50 h-[112px] mx-1 flex justify-between">
					<img
						alt="Backoffice header"
						className="object-cover h-6 mt-10 ml-10"
						src={cutt_logo}
					/>
					<div className="flex items-center">
						{currentInvoice.postingStatus === 'posting' && (
							<>
								<div id="lines_breakdown_checkbox">
									<label htmlFor="BreakDown" className="text-black-50 mr-2">
										Include Breakdown
									</label>
									<input
										type="checkbox"
										id="Breakdown"
										className="mr-2"
										checked={currentInvoice.linesBreakdown}
										onChange={(e) => toggleLinesBreakdown(e.target.checked)}
									/>
								</div>
								<div id="vat_checkbox">
									<label htmlFor="VAT" className="text-black-50 mr-2">
										Include VAT
									</label>
									<input
										type="checkbox"
										id="VAT"
										className="mr-2"
										checked={currentInvoice.taxBreakdown}
										onChange={(e) => toggleTaxBreakdown(e.target.checked)}
									/>
								</div>
							</>
						)}

						{currentInvoice.postingStatus !== 'review' && (
							<button
								type="button"
								className="text-black-50 mr-2 my-5 p-2 border border-white-50 text-center rounded-lg active:scale-105 hover:bg-white-50 hover:text-white-100 hover:font-bold"
								onClick={handlePostInvoice}
							>
								{currentInvoice.postingStatus === 'posted'
									? 'Invoice Saved in DB'
									: 'Generate New Invoice'}
							</button>
						)}
					</div>
				</div>
			)}
		</>
	)
}
