import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from 'src/axios/axiosConfig'
import { filter } from 'src/helper'
import { toastOptions } from 'src/helper/toast'
import { IEntertainment } from 'src/interfaces/entertainment'

const filterOptions = ['city']

export const useGetEntertainmentShows = (
	city: string,
	page: number,
	filterValues: { name: string; value: string | number | undefined }[],
	fetchAll: boolean
) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [entertainmentShows, setEntertainmentShows] = useState<
		IEntertainment[]
	>([])

	useEffect(() => {
		const getEntertainmentShows = async (city: string) => {
			let url = fetchAll
				? `entertainments`
				: `entertainments?page=${page}&limit=10`
			if (city) {
				url = filter({
					url: 'entertainments',
					valuesRute: filterValues,
					filterOptions,
					page: page,
					includePagination: !fetchAll
				})
			}
			setIsLoading(true)
			try {
				const response = await baseAPI.get(url)
				setEntertainmentShows(response.data.data.data)
				setIsLoading(false)
			} catch (error: any) {
				toast.error(error, toastOptions) as any
			} finally {
				setIsLoading(false)
			}
		}
		getEntertainmentShows(city)
	}, [city, page, fetchAll])
	return {
		isLoading,
		entertainmentShows,
		setEntertainmentShows
	}
}
