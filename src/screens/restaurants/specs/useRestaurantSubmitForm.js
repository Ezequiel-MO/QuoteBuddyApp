import { useState } from 'react'
import { RestaurantFormData } from '../'
import baseAPI from '../../../axios/axiosConfig'

export const useRestaurantSubmitForm = ({ onSuccess, onError, restaurant }) => {
	const [isLoading, setIsLoading] = useState(false)
	const handleSubmit = async (values, files, endpoint, update) => {
		setIsLoading(true)

		let dataToPost
		try {
			if (update) {
				dataToPost = RestaurantFormData.update(values)
				await baseAPI.patch(`v1/restaurants/${restaurant._id}`, dataToPost)
			}
			if (!update) {
				dataToPost = RestaurantFormData.create(values, files)
				await baseAPI.post('v1/restaurants', dataToPost)
			}
			if (endpoint === 'restaurants/image') {
				dataToPost = RestaurantFormData.updateImageData(values, files)
				await baseAPI.patch(
					`v1/restaurants/images/${restaurant._id}`,
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
