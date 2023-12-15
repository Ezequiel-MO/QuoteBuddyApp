import { useEffect, useState } from 'react'
import { IRestaurant } from '@interfaces/restaurant'
import { useApiFetch } from './useApiFetch'
import { useFilterValues } from '@screens/restaurants/list/useFilterValues'
import { filter } from 'src/helper'

export const useFetchRestaurants = (
	city: string,
	price: number,
	venueOrRestaurant: string,
	page: number,
	fetchAll: boolean
) => {
	const [url, setUrl] = useState<string>('')
	const filterValues = useFilterValues(city, price, venueOrRestaurant)

	useEffect(() => {
		const generateUrl = (): string => {
			let baseUrl = 'restaurants'

			const isFiltering = city !== '' || price !== 0 || venueOrRestaurant !== ''

			if (isFiltering) {
				baseUrl = filter({
					url: baseUrl,
					valuesRute: filterValues,
					filterOptions: ['city', 'price[lte]', 'isVenue'],
					page,
					includePagination: !fetchAll
				})
			} else if (!fetchAll) {
				baseUrl += `?page=${page}&limit=10`
			}

			return baseUrl
		}

		setUrl(generateUrl())
	}, [city, price, venueOrRestaurant, page, fetchAll, filterValues])

	const {
		data: restaurants,
		setData: setRestaurants,
		isLoading
	} = useApiFetch<IRestaurant>(url)

	return { restaurants, setRestaurants, isLoading }
}
