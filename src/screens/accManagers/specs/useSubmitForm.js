import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import baseAPI from '../../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../../helper/toast'

export const useSubmitForm = (accManager) => {
	const navigate = useNavigate()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const submitForm = async (values, files, endpoint, update) => {
		let dataToPost
		try {
			setIsSubmitting(true)
			dataToPost = new FormData()
			if (update === false) {
				dataToPost.append('firstName', values.firstName)
				dataToPost.append('familyName', values.familyName)
				dataToPost.append('email', values.email)
				if (files.length > 0) {
					for (let i = 0; i < files.length; i++) {
						dataToPost.append('imageContentUrl', files[i])
					}
				}
				await baseAPI.post('v1/accManagers', dataToPost)
				toast.success('Account Manager Created', toastOptions)
			}
			if (update === true) {
				dataToPost.firstName = values.firstName
				dataToPost.familyName = values.familyName
				dataToPost.email = values.email
				await baseAPI.patch(`v1/accManagers/${accManager._id}`, dataToPost)
				toast.success('Account Manager Updated', toastOptions)
			}
			if (endpoint === 'accManagers/image') {
				const existingImages = accManager.imageContentUrl
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
				await baseAPI.patch(
					`v1/accManagers/images/${accManager._id}`,
					dataToPost
				)
			}
			setTimeout(() => {
				navigate('/app/accManager')
			}, 1000)
		} catch (error) {
			toast.error(
				`Error Creating/Updating Account Manager, ${error.response.data.message}`,
				errorToastOptions
			)
		} finally {
			setIsSubmitting(false)
		}
	}

	return { submitForm, isSubmitting }
}
