import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'
import { filter } from '../helper/filterHelp'
import { IEvent } from 'src/interfaces'

const filterOptions = ['city', 'price[lte]']

export const useGetEvents = (
	city: string,
	price: number,
	page: number,
	filterValues: { name: string; value: string | number | undefined }[],
	fetchAll: boolean
) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [events, setEvents] = useState<IEvent[]>([])

	useEffect(() => {
		const getEvents = async (city: string, price: number) => {
			let url = fetchAll ? `events` : `events?page=${page}&limit=10`
			if (city || price) {
				url = filter({
					url: 'events',
					valuesRute: filterValues,
					filterOptions,
					page,
					includePagination: !fetchAll
				})
			}
			setIsLoading(true)
			try {
				const response = await baseAPI.get(url)
				setEvents(response.data.data.data)
				setIsLoading(false)
			} catch (error: any) {
				toast.error(error, toastOptions) as any
			} finally {
				setIsLoading(false)
			}
		}
		getEvents(city, price)
	}, [city, price, page, fetchAll])

	return { events, setEvents, isLoading }
}
