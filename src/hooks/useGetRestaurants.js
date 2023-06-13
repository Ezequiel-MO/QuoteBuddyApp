import { useEffect, useState } from 'react'
import { getRestaurants } from '../helper'

export const useGetRestaurants = (city, price, venueOrRestaurant, page) => {
	const [isLoading, setIsLoading] = useState(false)
	const [restaurants, setRestaurants] = useState([])

	useEffect(() => {
		setIsLoading(true)
		const fetchRestaurants = async () => {
			const fetchedRestaurants = await getRestaurants(
				city,
				price,
				venueOrRestaurant
			)
			setRestaurants(fetchedRestaurants)
			setIsLoading(false)
		}
		fetchRestaurants()
	}, [city, price, venueOrRestaurant, page])

	return { restaurants, setRestaurants, isLoading }
}
