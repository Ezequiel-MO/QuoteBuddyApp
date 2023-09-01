import { useState } from 'react'

export const useRestaurantsState = (
	initialCity: string,
	initialPrice: number = 0,
	initialVenueOrRestaurant: string = 'all'
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
