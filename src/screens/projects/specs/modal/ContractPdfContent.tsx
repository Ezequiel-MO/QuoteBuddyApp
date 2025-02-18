import React, { useState, useEffect } from 'react'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { toastOptions, errorToastOptions } from 'src/helper/toast'
import { ThumbnailPDF } from '@components/molecules/ThumbnailPDF'

interface IContractPdfContentProps {
	projectId: string
	onClose: () => void
	refreshProject: () => void
}

export const ContractPdfContent: React.FC<IContractPdfContentProps> = ({
	projectId,
	onClose,
	refreshProject
}) => {
	const [loading, setLoading] = useState(false)
	const [existingPdfUrl, setExistingPdfUrl] = useState<string | null>(null)

	/**
	 * Fetch the existing PDF (if any) on mount
	 */
	useEffect(() => {
		const fetchExistingPdf = async () => {
			try {
				const resp = await baseAPI.get(`projects/${projectId}`)
				// The 'documents' array could contain multiple PDFs.
				// For this example, we only display the first if it exists.
				const docs = resp.data?.data?.data?.documents || []
				if (docs.length > 0) {
					setExistingPdfUrl(docs[0])
				}
			} catch (error) {
				console.error('Error fetching existing PDF:', error)
			}
		}

		if (projectId) {
			fetchExistingPdf()
		}
	}, [projectId])

	/**
	 * Called after a user selects a new PDF in <ThumbnailPDF />
	 * We do a patch request to replace any existing PDF with the new one.
	 */
	const handlePdfUpload = async (file: File) => {
		setLoading(true)
		try {
			const formData = new FormData()

			// If an existing PDF is loaded, request its deletion
			if (existingPdfUrl) {
				formData.append('deletedPDF', existingPdfUrl)
			}

			// Add the new PDF
			formData.append('documents', file)

			await baseAPI.patch(`projects/documents/${projectId}`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			})

			toast.success('Legal contract replaced successfully!', toastOptions)

			// Show the newly uploaded PDF (locally) or refetch if you prefer
			setExistingPdfUrl(URL.createObjectURL(file))

			// Refresh your global context or local data
			refreshProject()

			// Optionally close modal or remain open
			onClose()
		} catch (error: any) {
			console.error('Contract upload failed:', error)
			toast.error(
				error.response?.data?.message || 'Upload failed. Please try again.',
				errorToastOptions
			)
		} finally {
			setLoading(false)
		}
	}

	/**
	 * Called when user clicks delete in <ThumbnailPDF />
	 * We remove the existing PDF from the backend and local state
	 */
	const handleDeletePdf = async () => {
		if (!existingPdfUrl) return
		setLoading(true)

		try {
			const formData = new FormData()
			formData.append('deletedPDF', existingPdfUrl)

			await baseAPI.patch(`projects/documents/${projectId}`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			})

			toast.success('PDF deleted successfully!', toastOptions)
			setExistingPdfUrl(null)
			refreshProject()
		} catch (error: any) {
			console.error('PDF deletion failed:', error)
			toast.error(
				error.response?.data?.message || 'Delete failed. Please try again.',
				errorToastOptions
			)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="p-4">
			<h3 className="mb-4 text-center text-xl font-semibold">
				Manage Legal Contract
			</h3>

			<div className="flex justify-center">
				<ThumbnailPDF
					imageSrc={existingPdfUrl ?? undefined}
					isLoading={loading}
					onImageUpload={handlePdfUpload}
					onDelete={handleDeletePdf}
				/>
			</div>

			<div className="mt-6 flex justify-center">
				<button
					type="button"
					className="btn btn-secondary mx-2"
					onClick={onClose}
					disabled={loading}
				>
					Close
				</button>
			</div>
		</div>
	)
}
