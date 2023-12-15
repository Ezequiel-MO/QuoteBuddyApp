import { useEffect, useState } from 'react'
import { useApiFetch } from './useApiFetch'
import { IHotel } from '@interfaces/hotel'
import { useFilterValues } from '@screens/hotels/list/useFilterValues'
import { filter } from 'src/helper'

interface UseFetchHotelsParams {
	id?: string
	city: string
	numberStars: number
	numberRooms: number
	page?: number
	fetchAll?: boolean
}
export const useFetchHotels = ({
	id,
	city,
	numberStars,
	numberRooms,
	page = 1,
	fetchAll = false
}: UseFetchHotelsParams) => {
	const [url, setUrl] = useState<string>('')
	useEffect(() => {
		if (id) {
			setUrl(`hotels/${id}`)
		} else {
			const filterValues = useFilterValues(city, numberStars, numberRooms)
			let baseUrl: string = fetchAll ? `hotels` : `hotels?page=${page}&limit=10`
			const isFiltering = city || numberRooms || numberStars
			if (isFiltering) {
				baseUrl = filter({
					url: 'hotels',
					valuesRute: filterValues,
					filterOptions: ['city', 'numberRooms[lte]', 'numberStars'],
					page,
					includePagination: !fetchAll
				})
			}
			setUrl(baseUrl)
		}
	}, [id, city, numberStars, numberRooms, page, fetchAll])
	const { data: hotels, setData: setHotels, isLoading } = useApiFetch(url)

	return { hotels, setHotels, isLoading }
}
