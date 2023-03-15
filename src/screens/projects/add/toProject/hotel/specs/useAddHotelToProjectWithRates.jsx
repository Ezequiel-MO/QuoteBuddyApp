import { useState } from 'react'
import baseAPI from '../../../../../../axios/axiosConfig'

export const useAddHotelToProjectWithRates = (
	hotels,
	hotelId,
	{ onSuccess, onError }
) => {
	const [isLoading, setIsLoading] = useState(false)

	const postHotelWithPricesToProject = async (values) => {
		try {
			const hotelAlreadyInProject = hotels.find(
				(hotel) => hotel._id === hotelId
			)
			if (hotelAlreadyInProject) throw new Error('Hotel already in project')
			setIsLoading(true)
			const res = await baseAPI.get(`v1/hotels/${hotelId}`)
			const hotel = res.data.data.data
			onSuccess(hotel, values)
		} catch (error) {
			onError(error)
		} finally {
			setIsLoading(false)
		}
	}

	return { isLoading, postHotelWithPricesToProject }
}
