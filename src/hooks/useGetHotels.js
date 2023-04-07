import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'
import { filter } from '../helper/filterHelp'

export const useGetHotels = (city, numberStars, numberRooms, page) => {
	const [isLoading, setIsLoading] = useState(false)
	const [hotels, setHotels] = useState([])
	const [allHotels, setAllHotels] = useState([])

	useEffect(() => {
		const getHotels = async (city, numberStars, numberRooms) => {
			const valuesRute = [
				{ name: 'city', value: city === 'none' ? undefined : city },
				{
					name: 'numberStars',
					value: numberStars === 'none' ? undefined : numberStars
				},
				{
					name: 'numberRooms[lte]',
					value: numberRooms === 'none' ? undefined : numberRooms
				}
			]
			const filterOptions = ['city', 'numberRooms[lte]', 'numberStars']
			let url = `v1/hotels?page=${page}&limit=10`
			let urlWithoutPagination = 'v1/hotels'

			if (city || numberRooms || numberStars) {
				const filteredUrl = filter({
					url: 'hotels',
					valuesRute: valuesRute,
					filterOptions: filterOptions,
					page: page
				})
				url = filteredUrl
				urlWithoutPagination = filter({
					url: 'hotels',
					valuesRute: valuesRute,
					filterOptions: filterOptions
				})
			}
			setIsLoading(true)
			try {
				const response = await baseAPI.get(url)
				setHotels(response.data.data.data)

				// Fetch all hotels without pagination
				let currentPage = 1
				let allHotelsData = []
				let hasMoreData = true

				while (hasMoreData) {
					const responseWithoutPagination = await baseAPI.get(
						`${urlWithoutPagination}&page=${currentPage}&limit=100`
					)
					const currentData = responseWithoutPagination.data.data.data
					if (currentData.length > 0) {
						allHotelsData = [...allHotelsData, ...currentData]
						currentPage++
					} else {
						hasMoreData = false
					}
				}

				setAllHotels(allHotelsData)
				setIsLoading(false)
			} catch (error) {
				toast.error(error, toastOptions)
			}
		}

		getHotels(city, numberStars, numberRooms)
	}, [city, numberStars, numberRooms, page])

	return { hotels, setHotels, allHotels, isLoading }
}
