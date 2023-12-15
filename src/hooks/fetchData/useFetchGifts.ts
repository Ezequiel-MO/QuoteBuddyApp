import { useFilterValues } from '@screens/gifts/list/useFilterValues'
import { useEffect, useState } from 'react'
import { useApiFetch } from './useApiFetch'
import { IGift } from '@interfaces/gift'
import { filter } from 'src/helper'

export const useFetchGifts = (price: number = 0) => {
	const [url, setUrl] = useState<string>('')
	const filterValues = useFilterValues(price)

	useEffect(() => {
		const generateUrl = (): string => {
			let baseUrl = 'gifts'
			const isFiltering = price !== 0

			if (isFiltering) {
				baseUrl = filter({
					url: baseUrl,
					valuesRute: filterValues,
					filterOptions: ['price[lte]'],
					page: 1
				})
			}
			return baseUrl
		}
		setUrl(generateUrl())
	}, [price])

	const { data: gifts, setData: setGifts, isLoading } = useApiFetch<IGift>(url)

	return {
		gifts,
		setGifts,
		isLoading
	}
}
