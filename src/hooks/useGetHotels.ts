import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'
import { filter } from '../helper/filterHelp'
import { useFilterValues } from '../screens/hotels/list/useFilterValues'
import { IHotel } from 'src/interfaces'

const filterOptions: string[] = ['city', 'numberRooms[lte]', 'numberStars']

export const useGetHotels = (
	city: string,
	numberStars: number,
	numberRooms: number,
	page: number,
	fetchAll: boolean
) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [hotels, setHotels] = useState<IHotel[]>([])
	const filterValues = useFilterValues(city, numberStars, numberRooms)

	useEffect(() => {
		const getHotels = async (
			city: string,
			numberStars: number,
			numberRooms: number
		) => {
			let url: string = fetchAll ? `hotels` : `hotels?page=${page}&limit=10`
			if (city || numberRooms || numberStars) {
				url = filter({
					url: 'hotels',
					valuesRute: filterValues,
					filterOptions: filterOptions,
					page: page
				})
			}
			setIsLoading(true)
			try {
				const response = await baseAPI.get(url)
				setHotels(response.data.data.data)
			} catch (error: any) {
				toast.error(error, toastOptions) as any
			} finally {
				setIsLoading(false)
			}
		}
		getHotels(city, numberStars, numberRooms)
	}, [city, numberStars, numberRooms, page, fetchAll])

	return { hotels, setHotels, isLoading }
}
