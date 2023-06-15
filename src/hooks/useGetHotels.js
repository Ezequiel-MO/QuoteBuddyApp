import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'
import { filter } from '../helper/filterHelp'
import { useFilterValues } from '../screens/hotels/list/useFilterValues'

const filterOptions = ['city', 'numberRooms[lte]', 'numberStars']

export const useGetHotels = (city, numberStars, numberRooms, page) => {
	const [isLoading, setIsLoading] = useState(false)
	const [hotels, setHotels] = useState([])
	const filterValues = useFilterValues(city, numberStars, numberRooms)

	useEffect(() => {
		const getHotels = async (city, numberStars, numberRooms) => {
			let url = `hotels?page=${page}&limit=10`
			if (city || numberRooms || numberStars) {
				url = filter({
					url: 'hotels',
					valuesRute: filterValues,
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
