import { toast } from 'react-toastify'
import { filter } from '.'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from './toast'

const FilterRoutes = ['city', 'price[lte]', 'isVenue']

export const getRestaurants = async (city, price, venueOrRestaurant, page) => {
	const filterValues = [
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
			valuesRute: filterValues,
			filterOptions: FilterRoutes,
			page
		})
	}

	try {
		const response = await baseAPI.get(url)
		return response.data.data.data
	} catch (error) {
		toast.error(error, toastOptions)
		return []
	}
}
