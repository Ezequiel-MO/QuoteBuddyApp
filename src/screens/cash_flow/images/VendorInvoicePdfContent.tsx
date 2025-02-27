import React, { useState, useEffect } from 'react'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { errorToastOptions, toastOptions } from 'src/helper/toast'
import { ThumbnailPDF } from 'src/components/molecules/ThumbnailPDF'
import { usePayment } from '../context/PaymentsProvider'

interface IVendorInvoicePdfContent {
	selectedFilesPdf: File[]
	setSelectedFilesPdf: React.Dispatch<React.SetStateAction<File[]>>
}

export const VendorInvoicePdfContent: React.FC<IVendorInvoicePdfContent> = ({
	selectedFilesPdf,
	setSelectedFilesPdf
}) => {
	const [loading, setLoading] = useState(false)
	const { state, dispatch, setForceRefresh } = usePayment()

	const handleImageUpload = async (file: File) => {
		setLoading(true)
		const formData = new FormData()
		formData.set('typeImage', 'pdfInvoice')
		formData.append('pdfInvoice', file)
		try {
			let newPdfUrls: string[] = []
			if (state.update && state.currentVendorInvoice?._id) {
				const response = await baseAPI.patch(
					`vendorInvoices/pdfInvoice/${state.currentVendorInvoice._id}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}
				)
				newPdfUrls = response.data.data.data.pdfInvoice
				setForceRefresh((prev) => prev + 1)
			} else {
				// In create mode, store PDF locally
				const blobUrl = URL.createObjectURL(file)
				newPdfUrls = !state.currentVendorInvoice?.pdfInvoice
					? [blobUrl]
					: [...state.currentVendorInvoice.pdfInvoice, blobUrl]
				setSelectedFilesPdf((prev) => [...prev, file])
			}
			dispatch({
				type: 'UPDATE_VENDORINVOICE_FIELD',
				payload: {
					name: 'pdfInvoice',
					value: newPdfUrls
				}
			})
			toast.success('PDF uploaded successfully', toastOptions)
		} catch (error: any) {
			console.error('Image upload failed:', error)
			toast.error('PDF upload failed', errorToastOptions)
		} finally {
			setLoading(false)
		}
	}

	const handlePdfDelete = async (urlPdf: string, index: number) => {
		if (!state.currentVendorInvoice?.pdfInvoice) {
			return
		}
		setLoading(true)
		const loadingToast = toast.loading('Delete PDF, please wait')
		const data = { deletedPDFs: [urlPdf] } // Changed to send deletedPDFs as an array
		try {
			if (state.update && state.currentVendorInvoice._id) {
				await baseAPI.delete(
					`vendorInvoices/pdfInvoice/${state.currentVendorInvoice._id}`,
					{ data }
				)
			}
			if (selectedFilesPdf.length > 0) {
				const copySelectedFilesPdf = [...selectedFilesPdf].filter(
					(_el, indexPdf) => indexPdf !== index
				)
				setSelectedFilesPdf(copySelectedFilesPdf)
			}
			const updatePdfUrls = [...state.currentVendorInvoice.pdfInvoice].filter(
				(el) => el !== urlPdf
			)
			toast.dismiss(loadingToast)
			dispatch({
				type: 'UPDATE_VENDORINVOICE_FIELD',
				payload: {
					name: 'pdfInvoice',
					value: updatePdfUrls
				}
			})
			toast.success('Deleted PDF successfully', toastOptions)
			setForceRefresh((prev) => prev + 1)
		} catch (error: any) {
			toast.dismiss(loadingToast)
			console.error('PDF deletion failed:', error)
			toast.error('PDF deletion failed.', errorToastOptions)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
				{(state.currentVendorInvoice?.pdfInvoice || []).map((pdfSrc, index) => (
					<ThumbnailPDF
						imageSrc={pdfSrc}
						onDelete={() => handlePdfDelete(pdfSrc, index)}
						onImageUpload={() => {}}
						key={index}
					/>
				))}
				{(state.currentVendorInvoice?.pdfInvoice || []).length < 1 && (
					<ThumbnailPDF onImageUpload={handleImageUpload} isLoading={loading} />
				)}
			</div>
		</>
	)
}
