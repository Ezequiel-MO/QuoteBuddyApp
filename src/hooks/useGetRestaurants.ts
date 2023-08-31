import { useEffect, useState } from 'react'
import { getRestaurants } from '../helper'
import { IRestaurant } from 'src/interfaces'

export const useGetRestaurants = (
	city: string,
	price: number,
	venueOrRestaurant: string,
	page: number
) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [restaurants, setRestaurants] = useState<IRestaurant[]>([])

	useEffect(() => {
		setIsLoading(true)
		const fetchRestaurants = async () => {
			const fetchedRestaurants = await getRestaurants(
				city,
				price,
				venueOrRestaurant,
				page
			)
			setRestaurants(fetchedRestaurants)
			setIsLoading(false)
		}
		fetchRestaurants()
	}, [city, price, venueOrRestaurant, page])

	return { restaurants, setRestaurants, isLoading }
}
