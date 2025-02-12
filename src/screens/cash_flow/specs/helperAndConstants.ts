export const optionsVendorType = [
	{
		name: 'Restaurant',
		value: 'Restaurant'
	},
	{
		name: 'Activity',
		value: 'Event'
	},
	{
		name: 'Hotel',
		value: 'Hotel'
	},
	{
		name: 'Entertainment',
		value: 'Entertainment'
	},
	{
		name: 'Gift',
		value: 'Gift'
	},
	{
		name: 'Transfer',
		value: 'Transfer'
	},
	{
		name: 'Freelancer',
		value: 'Freelancer'
	},
	{
		name: 'Other Operational Invoices',
		value: 'OtherOperational'
	},
	{
		name: 'Audiovisuals',
		value: 'Audiovisual'
	},

	{
		name: 'GeneralExpense',
		value: 'GeneralExpense'
	}
]

export const includesVendor = [
	'Hotels',
	'Restaurants',
	'Entertainments',
	'Gifts',
	'Events',
	'OtherOperationals',
	'Audiovisuals',
	'GeneralExpenses'
]

export const optionsStatus = [
	{
		name: 'Pending',
		value: 'Pending'
	},
	{
		name: 'Paid',
		value: 'Paid'
	},
	{
		name: 'Partially Paid',
		value: 'Partially Paid'
	}
]

import { useState } from 'react'
import { VendorInvoiceFormData } from './VendorInvoiceFormData'
import baseAPI from '../../../axios/axiosConfig'
import { IVendorInvoice } from 'src/interfaces/vendorInvoice'
import { errorSweetalert } from 'src/components/atoms/sweetalert/ErrorSweetalert'

interface Props {
	onSuccess: (update: boolean) => void
	onError: (error: any) => void
	vendorInvoice: IVendorInvoice
}

interface ReturnProps {
	handleSubmit: (
		values: any,
		files: File[],
		endpoint: string,
		update: boolean
	) => Promise<void>
	isLoading: boolean
}

export const useVendorInvoiceSubmitForm = ({
	onSuccess,
	onError,
	vendorInvoice
}: Props): ReturnProps => {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handleSubmit = async (
		values: IVendorInvoice | any,
		files: File[],
		endpoint: string,
		update: boolean
	) => {
		setIsLoading(true)
		let dataToPost
		try {
			// The PDF source of truth is state.vendorInvoice.pdfInvoice.
			// We combine the number of PDFs already saved with any new files.
			const existingPdfs = vendorInvoice?.pdfInvoice || []
			const totalPdfsCount = existingPdfs.length + files.length

			if (totalPdfsCount === 0) {
				await errorSweetalert(
					'Error',
					"Must upload at least one PDF for the 'Vendor Invoice'"
				)
				return
			}

			if (update) {
				const dataFormUpdate = VendorInvoiceFormData.update(
					values,
					files,
					existingPdfs
				)
				if (!dataFormUpdate) {
					return // Stop here if .update() returned early
				}
				await baseAPI.patch(
					`/vendorInvoices/${vendorInvoice._id}`,
					dataFormUpdate
				)
				// Then, update the actual PDF data. This attaches any newly uploaded files (if any).
				dataToPost = VendorInvoiceFormData.updatePdfData(values, files)

				await baseAPI.patch(
					`/vendorInvoices/pdfInvoice/${vendorInvoice._id}`,
					dataToPost
				)
			}
			onSuccess(update)
		} catch (error) {
			console.log(error)
			onError(error)
		} finally {
			setIsLoading(false)
		}
	}
	return { handleSubmit, isLoading }
}
