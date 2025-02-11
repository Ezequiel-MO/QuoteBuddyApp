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
		values: any,
		files: File[],
		endpoint: string,
		update: boolean
	) => {
		setIsLoading(true)
		let dataToPost
		try {
			if (files.length === 0 && values.imageContentUrl.length === 0) {
				await errorSweetalert(
					'Error',
					"Must upload a PDF of the invoice to the 'Vendor Invoice'"
				)
				return
			}
			if (endpoint === 'vendorInvoices/pdf' && update) {
				const dataFormUpdate = VendorInvoiceFormData.update(values)
				await baseAPI.patch(
					`/vendorInvoices/${vendorInvoice._id}`,
					dataFormUpdate
				)
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
