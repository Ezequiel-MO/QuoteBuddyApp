import { useState } from 'react'
import baseAPI from '../../../axios/axiosConfig'
import { EventFormData } from './EventFormData'

export const useEventForm = ({ onSuccess, onError, event }) => {
	const [isLoading, setIsLoading] = useState(false)
	const handleSubmit = async (values, files, endpoint, update) => {
		setIsLoading(true)

		let dataToPost
		try {
			if (update) {
				dataToPost = EventFormData.update(values)
				await baseAPI.patch(`events/${event._id}`, dataToPost)
			}
			if (!update) {
				dataToPost = EventFormData.create(values, files)
				await baseAPI.post('events', dataToPost)
			}
			if (endpoint === 'events/image') {
				dataToPost = EventFormData.updateImageData(values, files)
				await baseAPI.patch(`events/images/${event._id}`, dataToPost)
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
