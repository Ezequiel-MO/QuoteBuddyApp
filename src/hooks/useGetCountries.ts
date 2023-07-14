import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../helper/toast'
import { ICountry } from '../interfaces/country'

interface UseGetCountriesReturn {
	countries: ICountry[]
	isLoading: boolean
	setCountries: React.Dispatch<React.SetStateAction<ICountry[]>>
}

export const useGetCountries = (accessCode?: string): UseGetCountriesReturn => {
	const [isLoading, setIsLoading] = useState(false)
	const [countries, setCountries] = useState<ICountry[]>([])

	useEffect(() => {
		const getCountries = async () => {
			setIsLoading(true)
			try {
				let url = 'countries?sort=accessCode'
				if (accessCode) {
					url = `countries?accessCode=${accessCode}`
				}
				const response = await baseAPI.get(url)
				setCountries(response.data.data.data)
				setIsLoading(false)
			} catch (error: any) {
				toast.error(error, errorToastOptions as any)
			}
		}

		getCountries()
	}, [accessCode])

	return {
		countries,
		isLoading,
		setCountries
	}
}
