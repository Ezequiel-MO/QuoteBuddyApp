import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { errorToastOptions } from '../helper/toast'
import { ILocation } from '../interfaces/location'

interface ApiResponse {
	data: {
		data: ILocation[]
	}
}

interface UseGetLocationsReturn {
	locations: ILocation[]
	setLocations: React.Dispatch<React.SetStateAction<ILocation[]>>
	isLoading: boolean
}

export const useGetLocations = (): UseGetLocationsReturn => {
	const [isLoading, setIsLoading] = useState(false)
	const [locations, setLocations] = useState<ILocation[]>([])

	useEffect(() => {
		const controller = new AbortController()
		const getLocations = async () => {
			let url = 'locations'
			setIsLoading(true)
			try {
				const response = await baseAPI.get<ApiResponse>(url, {
					signal: controller.signal
				})
				setLocations(response.data.data.data)
				setIsLoading(false)
			} catch (error: any) {
				toast.error(error, errorToastOptions as any)
			}
		}

		getLocations()

		return () => {
			controller.abort()
		}
	}, [])

	return {
		locations,
		setLocations,
		isLoading
	}
}
