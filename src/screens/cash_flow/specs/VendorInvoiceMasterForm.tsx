import { VendorInvoiceFormFields } from './VendorInvoiceFormFields'
import { usePayment } from '../context/PaymentsProvider'
import React, { useEffect, useState } from 'react'
import { usePdfState } from 'src/hooks'
import { IVendorInvoice } from 'src/interfaces/vendorInvoice'
import { VendorInvoicePdfModal } from './pdf/VendorInvoicePdfModal'
import { Button } from '@components/atoms'

type SubmitFormType = (
	values: any,
	files: File[],
	endpoint: string,
	update: boolean
) => Promise<void>

interface Props {
	submitForm: SubmitFormType
	// submitFromPDfUpdate: SubmitFormType
}

export const VendorInvoiceMasterForm = ({ submitForm }: Props) => {
	const { state, errors, setErrors, validate } = usePayment()

	const [openAddPdfModal, setOpenAddPdfModal] = useState(false)
	const { selectedFilesPdf, setSelectedFilesPdf, handleFilePdfSelection } =
		usePdfState()

	useEffect(() => {
		setErrors({})
	}, [])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const endpoint = 'vendorInvoices'
		const isValid = await validate()
		if (isValid && state.vendorInvoice) {
			console.log('pdf invoice', state.vendorInvoice.pdfInvoice)
			submitForm(
				state.vendorInvoice as IVendorInvoice,
				selectedFilesPdf.length > 0 ? selectedFilesPdf : [],
				endpoint,
				state.update || false
			)
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="space-y-2">
				<VendorInvoiceFormFields />
				<div className="flex justify-center items-center">
					<Button type="submit" icon="iconoir:submit-document" widthIcon={30}>
						{state.update ? 'Edit & Exit' : 'Submit'}
					</Button>
					<>
						<VendorInvoicePdfModal
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
				</div>
			</form>
		</>
	)
}
