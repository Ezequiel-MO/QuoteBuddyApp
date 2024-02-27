import { useState } from 'react'
import { useCurrentProject } from 'src/hooks'

interface UseRestaurantsStateReturn {
	city: string
	setCity: (city: string) => void
	price: number
	setPrice: (price: number) => void
	venueOrRestaurant: string
	setVenueOrRestaurant: (venueOrRestaurant: string) => void
	language: string
	setLanguage: (city: string) => void
}

export const useRestaurantsState = (
	initialPrice: number = 0,
	initialVenueOrRestaurant: string = 'all'
): UseRestaurantsStateReturn => {
	const { currentProject } = useCurrentProject()
	const { groupLocation , languageVendorDescriptions } = currentProject
	const [city, setCity] = useState<string>(groupLocation || "")
	const [price, setPrice] = useState<number>(initialPrice)
	const [language, setLanguage] = useState(languageVendorDescriptions || "")
	const [venueOrRestaurant, setVenueOrRestaurant] = useState<string>(
		initialVenueOrRestaurant
	)

	return {
		city,
		setCity,
		price,
		setPrice,
		venueOrRestaurant,
		setVenueOrRestaurant,
		language,
		setLanguage
	}
}
