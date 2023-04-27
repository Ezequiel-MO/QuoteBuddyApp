import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'

export const useGetHotel = (id) => {
	const [isLoading, setIsLoading] = useState(false)
	const [hotel, setHotel] = useState({})

	useEffect(() => {
		const fetchHotel = async () => {
			const url = `hotels/${id}`
			setIsLoading(true)
			try {
				const response = await baseAPI.get(url)
				setHotel(response.data.data.data)
			} catch (error) {
				toast.error(error, toastOptions)
			} finally {
				setIsLoading(false)
			}
		}
		if (id) {
			fetchHotel()
		}
	}, [id])

	return { hotel, isLoading }
}
