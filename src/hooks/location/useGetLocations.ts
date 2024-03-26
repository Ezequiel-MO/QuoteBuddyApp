import { ILocation } from '@interfaces/location'
import { useEffect, useState } from 'react'
import baseAPI from 'src/axios/axiosConfig'

export const useGetLocations = () => {
	const [locations, setLocations] = useState<ILocation[]>([])

	useEffect(() => {
		const getLocations = async () => {
			try {
				const response = await baseAPI.get('locations')
				setLocations(response.data.data.data as ILocation[])
			} catch (error) {
				console.log(error)
			}
		}

		getLocations()
	}, [])

	return {
		locations
	}
}
