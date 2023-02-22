import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { errorToastOptions } from '../../../helper/toast'

export const updateImageData = async (values, endpoint, files, category) => {
	let dataToPost
	dataToPost = new FormData()
	const existingImages = category.imageContentUrl
	if (values?.imageContentUrl.length > 0) {
		dataToPost.append('imageUrls', values.imageContentUrl)
	}
	if (values?.deletedImage?.length > 0) {
		dataToPost.append('deletedImage', values.deletedImage)
	}
	if (files.length > 0) {
		for (let i = 0; i < files.length; i++) {
			dataToPost.append('imageContentUrl', files[i])
		}
	}
	if (existingImages.length > 0) {
		toast.error(
			`Please delete existing images before uploading new ones`,
			errorToastOptions
		)
		return
	}
	await baseAPI.patch(`v1/accManagers/image/${category._id}`, dataToPost)
}
