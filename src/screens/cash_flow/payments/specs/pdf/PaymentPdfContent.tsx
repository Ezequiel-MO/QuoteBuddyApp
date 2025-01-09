import React, { useState } from 'react'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { errorToastOptions, toastOptions } from 'src/helper/toast'
import { ThumbnailPDF } from 'src/components/molecules/ThumbnailPDF'
import { usePayment } from '../../../context/PaymentsProvider'
import { useLocation } from 'react-router-dom'

interface IPaymentPdfContentProps {
	selectedFilesPdf: File[]
	setSelectedFilesPdf: React.Dispatch<React.SetStateAction<File[]>>
}

export const PaymentPdfContent: React.FC<IPaymentPdfContentProps> = ({
	selectedFilesPdf,
	setSelectedFilesPdf
}) => {
	const location = useLocation()

	const [loading, setLoading] = useState(false)

	const { state, dispatch, setForceRefresh } = usePayment()

	const handlePdfUpload = async (file: File) => {
		setLoading(true)
		const formData = new FormData()
		formData.set('typeImage', 'pdfInvoice')
		formData.append('pdfInvoice', file)
		try {
			let newPdfUrls: string[] = []
			const blobUrl = URL.createObjectURL(file)
			newPdfUrls = !state.payment?.proofOfPaymentPDF
				? [blobUrl]
				: [...state.payment.proofOfPaymentPDF, blobUrl]
			setSelectedFilesPdf((prev) => [...prev, file])
			dispatch({
				type: 'UPDATE_PAYMENT_FIELD',
				payload: {
					name: 'proofOfPaymentPDF',
					value: newPdfUrls
				}
			})
		} catch (error: any) {
			console.error('Image upload failed:', error)
			alert('Pdf upload failed. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	const handlePdfDelete = async (urlPdf: string, index: number) => {
		console.log(location.pathname.includes('specs'))
		if (!state.payment?.proofOfPaymentPDF) {
			return
		}
		const loadingToast = toast.loading('Delete PDF, please wait')
		const data = { pdfUrl: urlPdf, keyDoc: 'proofOfPaymentPDF' }
		try {
			if (state.update && state.payment?._id) {
				await baseAPI.delete(`payments/pdfPayment/${state.payment?._id}`, {
					data
				})
			}
			if (selectedFilesPdf.length > 0) {
				// en caso que es un create(post) o si se agrega otro File
				const copySelectedFilesPdf = [...selectedFilesPdf].filter(
					(_el, indexPdf) => indexPdf !== index
				)
				setSelectedFilesPdf(copySelectedFilesPdf)
			}
			const updatePdfUrls = [...state.payment.proofOfPaymentPDF].filter(
				(el) => el !== urlPdf
			)
			toast.dismiss(loadingToast)
			dispatch({
				type: 'UPDATE_PAYMENT_FIELD',
				payload: {
					name: 'proofOfPaymentPDF',
					value: updatePdfUrls
				}
			})
			await baseAPI.post(`admin/clearCache`)
			toast.success('Deleted PDF successfully', toastOptions)
			if (location.pathname.includes('specs')) {
				setForceRefresh((prev) => prev + 1)
			}
		} catch (error: any) {
			toast.dismiss(loadingToast)
			console.error('pdf deletion failed:', error)
			toast.error('pdf deletion failed.', errorToastOptions)
		}
	}

	return (
		<>
			<div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
				{(state.payment?.proofOfPaymentPDF || []).map((pdfSrc, index) => (
					<ThumbnailPDF
						imageSrc={pdfSrc}
						onDelete={() => handlePdfDelete(pdfSrc, index)}
						onImageUpload={() => {}}
						key={index}
					/>
				))}
				{(state.payment?.proofOfPaymentPDF || []).length < 1 && (
					<ThumbnailPDF onImageUpload={handlePdfUpload} isLoading={loading} />
				)}
			</div>
		</>
	)
}
