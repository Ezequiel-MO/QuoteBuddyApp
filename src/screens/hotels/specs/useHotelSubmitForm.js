import { useState } from 'react'
import baseAPI from '../../../axios/axiosConfig'
import { HotelFormData } from './HotelFormData'

export const useHotelForm = ({ onSuccess, onError, hotel }) => {
	const [isLoading, setIsLoading] = useState(false)
	const handleSubmit = async (values, files, endpoint, update) => {
		setIsLoading(true)

		let dataToPost
		try {
			if (update) {
				dataToPost = HotelFormData.update(values)
				await baseAPI.patch(`hotels/${hotel._id}`, dataToPost)
			}
			if (!update) {
				dataToPost = HotelFormData.create(values, files)
				await baseAPI.post('hotels', dataToPost)
			}
			if (endpoint === 'hotels/image') {
				dataToPost = HotelFormData.updateImageData(values, files)
				await baseAPI.patch(`hotels/images/${hotel._id}`, dataToPost)
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
