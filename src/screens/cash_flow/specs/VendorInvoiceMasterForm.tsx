import { VendorInvoiceFormFields } from './VendorInvoiceFormFields'
import { SubmitInput, ShowImagesButton } from '@components/atoms'
import { usePayment } from '../context/PaymentsProvider'
import React, { useEffect, useState, useRef } from 'react'
import { usePdfState } from "src/hooks"
import { AddPdfModal, ModalPdf } from "src/components/molecules"
import { IVendorInvoice } from "src/interfaces/vendorInvoice"

type SubmitFormType = (
	values: any,
	files: File[],
	endpoint: string,
	update: boolean
) => Promise<void>

interface Props {
	submitForm: SubmitFormType
	submitFromPDfUpdate: SubmitFormType
}

export const VendorInvoiceMasterForm = ({ submitForm, submitFromPDfUpdate }: Props) => {
	const { state, errors, setErrors, validate } = usePayment()

	const fileInput = useRef<HTMLInputElement>(null)
	const [openAddPdfModal, setOpenAddPdfModal] = useState(false)
	const [openUpdatePdfModal, setOpenUpdatePdfModal] = useState(false)
	const { selectedFilesPdf, setSelectedFilesPdf, handleFilePdfSelection } = usePdfState()

	useEffect(() => {
		setErrors({})
	}, [])


	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const endpoint = 'vendorInvoices'
		const isValid = await validate()
		if (isValid && state.vendorInvoice) {
			submitForm(
				state.vendorInvoice as IVendorInvoice,
				selectedFilesPdf.length > 0 ? selectedFilesPdf : [],
				endpoint,
				state.vendorInvoice.update || false
			)
		}
	}

	return (
		<>
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
				keyModel='pdfInvoice'
				initialValues={state.vendorInvoice}
				nameScreen='vendorInvoices'
				screen={state.vendorInvoice || {}}
				submitForm={submitFromPDfUpdate}
			/>
			<form onSubmit={handleSubmit} className="space-y-2">
				<VendorInvoiceFormFields />
				<div className="flex justify-center items-center">
					<SubmitInput update={false} title="Payment" />
					<ShowImagesButton
						name={true}
						setOpen={!state.vendorInvoice?.update ? setOpenAddPdfModal : setOpenUpdatePdfModal}
						nameValue={!state.vendorInvoice?.update ? "add pdf" : "show pdf"}
					>
						{
							!state.vendorInvoice?.update &&
							<span>
								{`${selectedFilesPdf?.length} files selected for upload`}
							</span>
						}
					</ShowImagesButton>
				</div>
			</form>
		</>
	)
}
