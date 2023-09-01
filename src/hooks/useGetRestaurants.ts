import { useEffect, useState } from 'react'
import { filter } from '../helper'
import { IRestaurant } from 'src/interfaces'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { toastOptions } from 'src/helper/toast'
import { useFilterValues } from '@screens/restaurants/list/useFilterValues'

const FilterRoutes: string[] = ['city', 'price[lte]', 'isVenue']

export const useGetRestaurants = (
	city: string,
	price: number,
	venueOrRestaurant: string,
	page: number,
	fetchAll: boolean
) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [restaurants, setRestaurants] = useState<IRestaurant[]>([])
	const filterValues = useFilterValues(city, price, venueOrRestaurant)

	useEffect(() => {
		const fetchRestaurants = async (
			city: string,
			price: number,
			venueOrRestaurant: string
		) => {
			let url = fetchAll ? `restaurants` : `restaurants?page=${page}&limit=10`
			if (city || price || venueOrRestaurant) {
				url = filter({
					url: 'restaurants',
					valuesRute: filterValues,
					filterOptions: FilterRoutes,
					page,
					includePagination: !fetchAll
				})
			}
			setIsLoading(true)
			try {
				const response = await baseAPI.get(url)
				setRestaurants(response.data.data.data)
			} catch (error: any) {
				toast.error(error, toastOptions) as any
			} finally {
				setIsLoading(false)
			}
		}

		fetchRestaurants(city, price, venueOrRestaurant)
	}, [city, price, venueOrRestaurant, page, fetchAll])

	return { restaurants, setRestaurants, isLoading }
}
