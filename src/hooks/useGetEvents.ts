import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'
import { filter } from '../helper/filterHelp'
const filterOptions = ['city', 'price[lte]']

export const useGetEvents = (
	city: string,
	price: number,
	page: number,
	fetchAll: boolean
) => {
	const [isLoading, setIsLoading] = useState(false)
	const [events, setEvents] = useState([])

	useEffect(() => {
		const getEvents = async (city: string, price: number) => {
			const valuesRute = [
				{ name: 'city', value: city === 'none' ? undefined : city },
				{ name: 'price[lte]', value: price === 0 ? undefined : price }
			]
			let url = fetchAll ? `events` : `events?page=${page}&limit=10`
			if (city || price) {
				url = filter({
					url: 'events',
					valuesRute: valuesRute,
					filterOptions: filterOptions,
					page: page,
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
