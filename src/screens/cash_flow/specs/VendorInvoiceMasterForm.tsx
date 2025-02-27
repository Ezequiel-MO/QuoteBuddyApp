import React from 'react'
import { VendorInvoiceFormFields } from './VendorInvoiceFormFields'
import { usePayment } from '../context/PaymentsProvider'
import { usePdfState } from 'src/hooks'
import { Button } from '@components/atoms'
import { useNavigate } from 'react-router-dom'
import { useImageModal } from '@hooks/images/useImageModal'
import { VendorInvoicePdfModal } from '../images/VendorInvoicePdfModal'
import { createVendorInvoice } from './createVendorInvoice'
import { resetVendorInvoiceFilters } from './resetVendorInvoiceFields'
import { updateVendorInvoice } from './updateVendorInvoice'

export const VendorInvoiceMasterForm = () => {
	const { state, validate, dispatch } = usePayment()
	const navigate = useNavigate()
	const { openModal, closeModal } = useImageModal({ dispatch })
	const { selectedFilesPdf, setSelectedFilesPdf } = usePdfState()

	const routePaymentSlip = (): string => {
		if (typeof state.currentVendorInvoice?.project === 'object') {
			return `project/${state.currentVendorInvoice?.project?._id}/payment_slip`
		} else {
			return `project/${state.currentVendorInvoice?.project}/payment_slip`
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isValid = await validate()

		if (isValid && state.currentVendorInvoice) {
			if (state.update) {
				await updateVendorInvoice(
					state.currentVendorInvoice,
					state.vendorInvoices || [],
					dispatch
				)
			} else {
				await createVendorInvoice(
					state.currentVendorInvoice,
					selectedFilesPdf,
					dispatch
				)
			}
		}
		resetVendorInvoiceFilters(dispatch, {
			vendorTypeFilter: '',
			vendorIdFilter: '',
			projectIdFilter: ''
		})
		navigate(`/app/${routePaymentSlip()}`)
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<VendorInvoiceFormFields />
				<div className="flex justify-center m-6">
					<Button type="submit" icon="iconoir:submit-document" widthIcon={30}>
						{state.update ? 'Edit & Exit' : 'Submit'}
					</Button>
					<Button
						type="button"
						handleClick={openModal}
						icon="mingcute:pdf-line"
						widthIcon={30}
					>
						UPLOAD PDF
					</Button>
					<VendorInvoicePdfModal
						isOpen={state.imagesModal}
						onClose={closeModal}
						title="ADD/EDIT PDF"
						selectedFilesPdf={selectedFilesPdf}
						setSelectedFilesPdf={setSelectedFilesPdf}
					/>
				</div>
			</form>
		</>
	)
}
