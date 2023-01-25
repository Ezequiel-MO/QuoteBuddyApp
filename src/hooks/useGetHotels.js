import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'

export const useGetHotels = (city, numberStars, numberRooms, page) => {
	const [isLoading, setIsLoading] = useState(false)
	const [hotels, setHotels] = useState([])

	useEffect(() => {
		const getHotels = async (city, numberStars, numberRooms) => {
			const url =
				city && numberStars && numberRooms
					? `v1/hotels?page=${page}&limit=10&city=${city}&numberStars=${numberStars}&numberRooms[lte]=${numberRooms}`
					: city && numberStars
					? `v1/hotels?page=${page}&limit=10&city=${city}&numberStars=${numberStars}`
					: city && numberRooms
					? `v1/hotels?page=${page}&limit=10&city=${city}&numberRooms[lte]=${numberRooms}`
					: city
					? `v1/hotels?page=${page}&limit=10&city=${city}`
					: `/v1/hotels?page=${page}&limit=10`
			setIsLoading(true)
			try {
				const response = await baseAPI.get(url)
				setHotels(response.data.data.data)
				setIsLoading(false)
			} catch (error) {
				toast.error(error, toastOptions)
			}
		}
		getHotels(city, numberStars, numberRooms)
	}, [city, numberStars, numberRooms, page])

	return { hotels, setHotels, isLoading }
}
