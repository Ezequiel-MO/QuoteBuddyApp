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
	isFiltering: boolean = false
) => {
	const [url, setUrl] = useState<string>('')
	const filterValues = useFilterValues(city, price, venueOrRestaurant)

	useEffect(() => {
		const generateUrl = (): string => {
			let baseUrl = 'restaurants'

			if (!isFiltering) {
				baseUrl += `?page=${page}&limit=10`
				return baseUrl
			} else {
				baseUrl = filter({
					url: baseUrl,
					valuesRute: filterValues,
					filterOptions: ['city', 'price[lte]', 'isVenue'],
					page,
					includePagination: true
				})
			}

			return baseUrl
		}

		setUrl(generateUrl())
	}, [city, price, venueOrRestaurant, page, isFiltering, filterValues])

	const {
		data: restaurants,
		setData: setRestaurants,
		isLoading
	} = useApiFetch<IRestaurant>(url)

	return { restaurants, setRestaurants, isLoading }
}
