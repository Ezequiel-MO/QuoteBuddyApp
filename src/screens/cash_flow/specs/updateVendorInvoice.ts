// src/helper/forms/updateVendorInvoice.ts
import { toast } from 'react-toastify'
import baseAPI from 'src/axios/axiosConfig'
import { toastOptions, errorToastOptions } from 'src/helper/toast'
import { logger } from 'src/helper/debugging/logger'
import { IVendorInvoice } from '@interfaces/vendorInvoice'

export const updateVendorInvoice = async (
	vendorInvoiceData: Partial<IVendorInvoice>,
	vendorInvoices: IVendorInvoice[],
	dispatch: React.Dispatch<any>
) => {
	try {
		if (!vendorInvoiceData._id) {
			throw new Error('Cannot update vendor invoice without ID')
		}

		const invoiceId = vendorInvoiceData._id

		// Create a copy without _id and pdfInvoice fields
		const updateData: Record<string, any> = { ...vendorInvoiceData }
		delete updateData._id
		delete updateData.pdfInvoice

		// Convert object references to IDs
		if (typeof updateData.project === 'object' && updateData.project?._id) {
			updateData.project = updateData.project._id
		}

		if (typeof updateData.vendor === 'object' && updateData.vendor?._id) {
			updateData.vendor = updateData.vendor._id
		}

		// Update vendor invoice
		const response = await baseAPI.patch(
			`vendorInvoices/${invoiceId}`,
			updateData
		)

		const updatedVendorInvoice = response.data.data.data

		// Update state
		dispatch({
			type: 'SET_VENDORINVOICE',
			payload: updatedVendorInvoice
		})

		const updatedInvoices = vendorInvoices.map((invoice) =>
			invoice._id === updatedVendorInvoice._id ? updatedVendorInvoice : invoice
		)

		dispatch({
			type: 'SET_VENDORINVOICES',
			payload: updatedInvoices
		})

		toast.success('Vendor invoice updated successfully', toastOptions)
		await baseAPI.post(`admin/clearCache`)

		return updatedVendorInvoice
	} catch (error: any) {
		const errorMessage =
			error.response?.data?.message || error.message || 'Unknown error'
		toast.error(
			`Failed to update vendor invoice: ${errorMessage}`,
			errorToastOptions
		)
		logger.logErrorToDatabase(
			errorMessage,
			`Failed to update vendor invoice ${vendorInvoiceData._id} in updateVendorInvoice.ts`,
			'info'
		)
		throw error
	}
}
