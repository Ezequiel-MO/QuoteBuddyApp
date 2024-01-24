import { useState } from 'react'

interface UseRestaurantsStateReturn {
	city: string
	setCity: (city: string) => void
	price: number
	setPrice: (price: number) => void
	venueOrRestaurant: string
	setVenueOrRestaurant: (venueOrRestaurant: string) => void
}

export const useRestaurantsState = (
	initialPrice: number = 0,
	initialVenueOrRestaurant: string = 'all'
): UseRestaurantsStateReturn => {
	const [city, setCity] = useState<string>('')
	const [price, setPrice] = useState<number>(initialPrice)
	const [venueOrRestaurant, setVenueOrRestaurant] = useState<string>(
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
