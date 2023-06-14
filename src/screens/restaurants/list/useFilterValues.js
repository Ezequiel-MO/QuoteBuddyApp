import { useMemo } from 'react'

export const useFilterValues = (city, price, venueOrRestaurant) => {
	return useMemo(
		() => [
			{ name: 'city', value: city === 'none' ? undefined : city },
			{ name: 'price[lte]', value: price === 'none' ? undefined : price },
			{
				name: 'isVenue',
				value: venueOrRestaurant === 'all' ? undefined : venueOrRestaurant
			}
		],
		[city, price, venueOrRestaurant]
	)
}
