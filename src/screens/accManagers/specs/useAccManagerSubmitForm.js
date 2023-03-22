import { useState } from 'react'
import baseAPI from '../../../axios/axiosConfig'
import { AccManagerFormData } from './AccManagerFormData'

export const useAccManagerSubmitForm = ({ onSuccess, onError, accManager }) => {
	const [isLoading, setIsLoading] = useState(false)
	const handleSubmit = async (values, files, endpoint, update) => {
		setIsLoading(true)
		let dataToPost
		try {
			if (update) {
				dataToPost = AccManagerFormData.update(values)
				await baseAPI.patch(`v1/accManagers/${accManager._id}`, dataToPost)
			}
			if (!update) {
				dataToPost = AccManagerFormData.create(values, files)
				await baseAPI.post('v1/accManagers', dataToPost)
			}
			if (endpoint === 'accManagers/image') {
				dataToPost = AccManagerFormData.updateImageData(values, files)
				await baseAPI.patch(
					`v1/accManagers/images/${accManager._id}`,
					dataToPost
				)
			}

			onSuccess(update)
		} catch (error) {
			onError(error)
		} finally {
			setIsLoading(false)
		}
	}

	return { handleSubmit, isLoading }
}
