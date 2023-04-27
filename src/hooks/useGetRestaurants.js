import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'
import { filter } from '../helper/filterHelp'

export const useGetRestaurants = (city, price, venueOrRestaurant, page) => {
	const [isLoading, setIsLoading] = useState(false)
	const [restaurants, setRestaurants] = useState([])

	useEffect(() => {
		const getRestaurants = async (city, price, venueOrRestaurant) => {
			const filterOptions = ['city', 'price[lte]', 'isVenue']
			const valuesRute = [
				{ name: 'city', value: city === 'none' ? undefined : city },
				{ name: 'price[lte]', value: price === 'none' ? undefined : price },
				{
					name: 'isVenue',
					value: venueOrRestaurant === 'all' ? undefined : venueOrRestaurant
				}
			]
			let url = `restaurants?page=${page}&limit=10`
			if (city || price || venueOrRestaurant) {
				url = filter({
					url: 'restaurants',
					valuesRute: valuesRute,
					filterOptions: filterOptions,
					page: page
				})
			}
			setIsLoading(true)
			try {
				const response = await baseAPI.get(url)
				setRestaurants(response.data.data.data)
				setIsLoading(false)
			} catch (error) {
				toast.error(error, toastOptions)
			}
		}
		getRestaurants(city, price, venueOrRestaurant)
	}, [city, price, venueOrRestaurant, page])

	return { restaurants, setRestaurants, isLoading }
}
