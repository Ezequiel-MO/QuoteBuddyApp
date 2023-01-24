import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import cutt_logo from '../../assets/CUTT_LOGO.png'
import baseAPI from '../../axios/axiosConfig'
import { computeInvoiceBreakdownTotal } from '../../helper/helperFunctions'
import { errorToastOptions, toastOptions } from '../../helper/toast'
import { useCurrentInvoice } from '../../hooks'
import './invoice.css'

const InvoiceLogo = () => {
	const {
		changePostingStatus,
		toggleTaxBreakdown,
		toggleLinesBreakdown,
		currentInvoice
	} = useCurrentInvoice()

	const navigate = useNavigate()

	const handlePostInvoice = async () => {
		if (currentInvoice.postingStatus === 'posted') {
			toast.error('This invoice has already been saved', errorToastOptions)
			return
		}
		if (
			Number(currentInvoice.lineAmount) !==
			computeInvoiceBreakdownTotal(currentInvoice.breakdownLines)
		) {
			toast.error(
				'The invoice total does not match the breakdown total',
				errorToastOptions
			)
			return
		}
		let confirmed = confirm(
			'ATTENTION: Please check all details are correct before saving. This invoice cannot be edited after it is saved to the Data Base'
		)
		if (confirmed) {
			try {
				await baseAPI.post('v1/invoices', currentInvoice)
				changePostingStatus('posted')
				toast.success('Invoice Saved', toastOptions)
				navigate('/app/invoice')
			} catch (error) {
				toast.error(
					`Error Creating/Updating Invoice, ${
						error || 'unable to create/update the invoice'
					}`,
					errorToastOptions
				)
			}
		}
	}

	return (
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
	)
}

export default InvoiceLogo
