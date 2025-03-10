import React, { useState } from 'react'
import { usePdfState } from 'src/hooks'
import { usePayment } from '../../context/PaymentsProvider'
import { PaymentFormFields } from './PaymentFormFields'
import { Spinner } from '@components/atoms'
import { usePaymentSubmitForm } from './helperPayment'
import { useAuth } from 'src/context/auth/AuthProvider'
import { IPayment } from '@interfaces/payment'
import { Button } from '@components/atoms'
import { PaymentPdfModal } from './pdf/PaymentPdfModal'

export const PaymentMasterForm = () => {
	const { state, validate } = usePayment()

	const { auth } = useAuth()

	const { selectedFilesPdf, setSelectedFilesPdf } = usePdfState()

	const [openAddPdfModal, setOpenAddPdfModal] = useState(false)

	const { submitFrom, isLoading } = usePaymentSubmitForm(
		state.payment as IPayment
	)

	const vendorInvoice = state.currentVendorInvoice ?? {}
	const vendor: any = state.currentVendorInvoice?.vendor ?? {}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isValid = await validate()
		if (!isValid) return
		const paymentData = {
			...state.payment,
			vendorInvoiceId: state.currentVendorInvoice?._id
		}
		submitFrom(
			paymentData,
			selectedFilesPdf.length > 0 ? selectedFilesPdf : [],
			'payments',
			state.update || false
		)
	}

	if (!state.currentVendorInvoice) {
		return null
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div>
			<h1 className="underline text-xl">
				{`Number invoice: ${vendorInvoice?.invoiceNumber}
                     - ${vendorInvoice?.vendorType}
                     - ${vendor?.name || vendor?.company || vendor?.email}
                    `}
			</h1>
			<form className="space-y-2" onSubmit={handleSubmit}>
				<PaymentFormFields />
				<div className="flex justify-center items-center">
					<Button type="submit" icon="iconoir:submit-document" widthIcon={30}>
						{state.update ? 'Edit & Exit' : 'Submit'}
					</Button>
					{auth.role === 'admin' && (
						<>
							<PaymentPdfModal
								isOpen={openAddPdfModal}
								onClose={() => setOpenAddPdfModal(false)}
								title="ADD/EDIT PDF"
								selectedFilesPdf={selectedFilesPdf}
								setSelectedFilesPdf={setSelectedFilesPdf}
							/>
							<Button
								type="button"
								handleClick={() => setOpenAddPdfModal(true)}
								icon="mingcute:pdf-line"
								widthIcon={30}
							>
								UPLOAD PDF
							</Button>
						</>
					)}
				</div>
			</form>
		</div>
	)
}
