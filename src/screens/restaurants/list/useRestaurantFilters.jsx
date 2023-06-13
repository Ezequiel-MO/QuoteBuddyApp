import { useState } from 'react'

export const useRestaurantFilters = (
	initialCity,
	initialPrice = 0,
	initialVenueOrRestaurant = 'all'
) => {
	const [city, setCity] = useState(initialCity)
	const [price, setPrice] = useState(initialPrice)
	const [venueOrRestaurant, setVenueOrRestaurant] = useState(
		initialVenueOrRestaurant
	)

	return {
		city,
		setCity,
		price,
		setPrice,
		venueOrRestaurant,
		setVenueOrRestaurant
	}
}
