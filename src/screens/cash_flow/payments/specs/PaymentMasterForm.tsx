import React, { useEffect, useState, useRef } from 'react'
import { SubmitInput, ShowImagesButton } from '@components/atoms'
import { usePdfState } from 'src/hooks'
import { AddPdfModal, ModalPdf } from 'src/components/molecules'
import { usePayment } from '../../context/PaymentsProvider'
import { PaymentFormFields } from './PaymentFormFields'
import { Spinner } from '@components/atoms'
import { usePaymentSubmitForm } from './helperPayment'
import { useAuth } from 'src/context/auth/AuthProvider'
import { IPayment } from '@interfaces/payment'

export const PaymentMasterForm = () => {
	const { state } = usePayment()

	const { auth } = useAuth()

	const fileInput = useRef<HTMLInputElement>(null)
	const { selectedFilesPdf, setSelectedFilesPdf, handleFilePdfSelection } =
		usePdfState()
	const [openAddPdfModal, setOpenAddPdfModal] = useState(false)
	const [openUpdatePdfModal, setOpenUpdatePdfModal] = useState(false)

	const { submitFrom, isLoading } = usePaymentSubmitForm(
		state.payment as IPayment
	)

	const vendorInvoice = state.vendorInvoice ?? {}
	const vendor: any = state.vendorInvoice?.vendor ?? {}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const paymentData = {
			...state.payment,
			vendorInvoiceId: state.vendorInvoice?._id
		}
		submitFrom(
			paymentData,
			selectedFilesPdf.length > 0 ? selectedFilesPdf : [],
			'payments',
			state.payment?.update || false
		)
	}

	if (!state.vendorInvoice) {
		return null
	}

	if (isLoading) {
		return <Spinner />
	}

	return (
		<div>
			<AddPdfModal
				fileInput={fileInput}
				handleFileSelection={handleFilePdfSelection}
				multipleCondition={false}
				open={openAddPdfModal}
				setOpen={setOpenAddPdfModal}
				selectedFiles={selectedFilesPdf}
				setSelectedFiles={setSelectedFilesPdf}
			/>
			<ModalPdf
				multipleCondition={false}
				open={openUpdatePdfModal}
				setOpen={setOpenUpdatePdfModal}
				keyModel="proofOfPaymentPDF"
				initialValues={state.payment}
				nameScreen="payments"
				screen={state.payment || {}}
				submitForm={submitFrom}
			/>
			<h1 className="underline text-xl">
				{`Number invoice: ${vendorInvoice?.invoiceNumber}
                     - ${vendorInvoice?.vendorType}
                     - ${vendor.name || vendor.company?.email}
                    `}
			</h1>
			<form className="space-y-2" onSubmit={handleSubmit}>
				<PaymentFormFields />
				<div className="flex justify-center items-center">
					<SubmitInput update={false} title="Payment" />
					{auth.role === 'admin' && (
						<ShowImagesButton
							name={true}
							setOpen={
								!state.payment?.update
									? setOpenAddPdfModal
									: setOpenUpdatePdfModal
							}
							nameValue={!state.payment?.update ? 'add pdf' : 'show pdf'}
						>
							{!state.payment?.update && (
								<span>
									{`${selectedFilesPdf?.length} files selected for upload`}
								</span>
							)}
						</ShowImagesButton>
					)}
				</div>
			</form>
		</div>
	)
}
