import { useMemo } from 'react'

export const useFilterValues = (
	city?: string,
	price?: number,
	venueOrRestaurant?: string
) => {
	return useMemo(
		() => [
			{ name: 'city', value: city === '' ? undefined : city },
			{ name: 'price[lte]', value: price === 0 ? undefined : price },
			{
				name: 'isVenue',
				value: venueOrRestaurant === 'all' ? undefined : venueOrRestaurant
			}
		],
		[city, price, venueOrRestaurant]
	)
}
