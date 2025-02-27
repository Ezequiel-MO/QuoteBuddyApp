import baseAPI from '@axios/axiosConfig'
import { uploadPDF } from '@components/molecules/pdf/uploadPDF'
import { logger } from '@helper/debugging/logger'
import { errorToastOptions, toastOptions } from '@helper/toast'
import { IVendorInvoice } from '@interfaces/vendorInvoice'
import { toast } from 'react-toastify'

// Helper to convert File objects to temporary URLs for uploadPDF
const filesToUrls = (files: File[]): string[] => {
	return files.map((file) => URL.createObjectURL(file))
}

export const createVendorInvoice = async (
	vendorInvoiceData: Partial<IVendorInvoice>,
	pdfFiles: File[],
	dispatch: React.Dispatch<any>
) => {
	try {
		//Exclude pdfInvoice from data sent to server
		const { pdfInvoice: _, ...data } = vendorInvoiceData
		//Convert object references to IDs
		const processedData: any = {
			...data,
			project:
				typeof data.project === 'object' ? data.project._id : data.project,
			vendor: typeof data.vendor === 'object' ? data.vendor._id : data.vendor,
			status: data.status || 'Pending'
		}
		//Create the vendor invoice
		const response = await baseAPI.post('vendorInvoices', processedData, {
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const newVendorInvoice = response.data.data.data as IVendorInvoice

		//Upload pdf files if available

		if (pdfFiles.length > 0) {
			const pdfUrls = filesToUrls(pdfFiles)
			await uploadPDF(
				'vendorInvoices/pdfInvoice',
				newVendorInvoice._id,
				pdfUrls,
				'pdfInvoice',
				'vendorInvoices'
			)
		}

		//Update state
		dispatch({
			type: 'SET_VENDORINVOICE',
			payload: newVendorInvoice
		})
		dispatch({
			type: 'ADD_VENDORINVOICE',
			payload: newVendorInvoice
		})
		toast.success('Vendor invoice created successfully', toastOptions)
		await baseAPI.post(`admin/clearCache`)
		return newVendorInvoice
	} catch (error: any) {
		logger.logErrorToDatabase(
			error.response.data.message,
			`Failed to create vendor invoice in createVendorInvoice.ts`,
			'info'
		)
		toast.error('Failed to create vendor invoice', errorToastOptions)
		throw error
	}
}
