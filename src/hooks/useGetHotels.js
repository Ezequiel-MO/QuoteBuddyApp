import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'
import { filter } from '../helper/filterHelp'

export const useGetHotels = (city, numberStars, numberRooms, page) => {
	const [isLoading, setIsLoading] = useState(false)
	const [hotels, setHotels] = useState([])

	useEffect(() => {
		const getHotels = async (city, numberStars, numberRooms) => {
			const valuesRute = [
				{ name: 'city', value: city === 'none' ? undefined : city },
				{
					name: 'numberStars',
					value: numberStars === 'none' ? undefined : numberStars
				},
				{
					name: 'numberRooms[lte]',
					value: numberRooms === 'none' ? undefined : numberRooms
				}
			]
			const filterOptions = ['city', 'numberRooms[lte]', 'numberStars']
			let url = `v1/hotels?page=${page}&limit=10`
			if (city || numberRooms || numberStars) {
				url = filter({
					url: 'hotels',
					valuesRute: valuesRute,
					filterOptions: filterOptions,
					page: page
				})
			}
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
