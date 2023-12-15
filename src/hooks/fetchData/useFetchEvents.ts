import { useEffect, useState } from 'react'
import { IEvent } from '@interfaces/event'
import { useFilterValues } from '@screens/events/list/useFilterValues'
import { useApiFetch } from './useApiFetch'
import { filter } from 'src/helper'

export const useFetchEvents = (
	city: string,
	price: number,
	page: number,
	fetchAll: boolean
) => {
	const [url, setUrl] = useState<string>('')
	const filterValues = useFilterValues(city, price)

	useEffect(() => {
		const generateUrl = () => {
			const isFiltering = city !== '' || price !== 0

			let baseUrl = 'events'

			if (isFiltering) {
				baseUrl = filter({
					url: baseUrl,
					valuesRute: filterValues,
					filterOptions: ['city', 'price[lte]'],
					page,
					limit: '10',
					includePagination: true
				})
			} else if (!fetchAll) {
				baseUrl += `?page=${page}&limit=10`
			}

			return baseUrl
		}

		setUrl(generateUrl())
	}, [city, price, page, fetchAll, filterValues])

	const {
		data: events,
		setData: setEvents,
		isLoading
	} = useApiFetch<IEvent>(url)

	return { events, setEvents, isLoading }
}
