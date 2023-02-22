import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { errorToastOptions } from '../../../helper/toast'
import { createNewItem } from './createNewItem'
import { updateImageData } from './updateImage'
import { updateItem } from './updateItem'

export const useSubmitForm = (accManager) => {
	const navigate = useNavigate()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const submitForm = async (values, files, endpoint, update) => {
		try {
			setIsSubmitting(true)

			if (update === false) createNewItem(values, files, endpoint)
			if (update === true) {
				updateItem(values, endpoint, accManager._id)
			}
			if (endpoint === 'accManagers/image') {
				updateImageData(values, endpoint, files, accManager)
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
