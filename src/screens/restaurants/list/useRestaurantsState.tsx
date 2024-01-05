import { useState } from 'react'

export const useRestaurantsState = (
	initialPrice: number = 0,
	initialVenueOrRestaurant: string = 'all'
) => {
	const [city, setCity] = useState('')
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
