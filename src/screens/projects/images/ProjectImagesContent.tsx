import React, { useState } from 'react'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { errorToastOptions, toastOptions } from 'src/helper/toast'
import { useProject } from '../context/ProjectContext'
import { ThumbnailPDF } from "src/components/molecules/ThumbnailPDF"
import { useCurrentProject } from 'src/hooks'


const ProjectImagesContent: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const { state, dispatch } = useProject()
	const { currentProject, setCurrentProject, deletedBudgetPDF, addBudgetPDF } = useCurrentProject()

	const handleImageUpload = async (file: File) => {
		setLoading(true)
		const formData = new FormData()
		formData.append('imageContentUrl', file)
		try {
			let newImageUrls: string[] = []
			if (state.update && currentProject?._id) {
				const response = await baseAPI.patch(
					`projects/images/${currentProject._id}`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data'
						}
					}
				)
				newImageUrls = response.data.data.data.imageContentUrl
			} else {
				const blobUrl = URL.createObjectURL(file)
				newImageUrls = [blobUrl]
			}
			addBudgetPDF(newImageUrls)
			state.searchTerm = ""//para reniciar el listado
		} catch (error: any) {
			console.error('Image upload failed:', error)
			alert('Image upload failed. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	const handleImageDelete = async (urlPdf: string) => {
		if (!currentProject?.imageContentUrl) {
			return
		}
		const loadingToast = toast.loading('Delete PDF, please wait')
		let response
		const data = { pdfUrl: urlPdf , keyDoc:"imageContentUrl" }
		try {
			if (state.update && currentProject._id) {
				response = await baseAPI.delete(`projects/images/${currentProject._id}`, { data })
			}
			toast.dismiss(loadingToast)
			deletedBudgetPDF(urlPdf)
			toast.success('Deleted PDF successfully', toastOptions)
			state.searchTerm = "" //para reniciar el listado
		} catch (error: any) {
			toast.dismiss(loadingToast)
			console.error('Image deletion failed:', error)
			toast.error('Image deletion failed.', errorToastOptions)
		}
	}



	return (
		<>
			<div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
				{
					(currentProject?.imageContentUrl || []).map((pdfSrc, index) => (
						<ThumbnailPDF
							imageSrc={pdfSrc}
							onDelete={() => handleImageDelete(pdfSrc)}
							onImageUpload={() => { }}
							key={index}
						/>
					))
				}
				{(currentProject?.imageContentUrl || []).length < 1 && (
					<ThumbnailPDF onImageUpload={handleImageUpload} isLoading={loading} />
				)}
			</div>
		</>
	)
}

export default ProjectImagesContent
