import { ICountry } from '@interfaces/country'
import { useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from 'src/axios/axiosConfig'
import { errorToastOptions, toastOptions } from 'src/helper/toast'

interface Props {
	onSuccess: (update: boolean) => void
	onError: (error: any) => void
	item: ICountry
}

export const useCountrySubmit = ({ onSuccess, onError, item }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handleSubmit = async (
		values: ICountry,
		endpoint: string,
		update: boolean
	) => {
		setIsLoading(true)

		let dataToPost = values
		try {
			if (update && item._id) {
				await baseAPI.patch(`${endpoint}/${item._id}`, dataToPost)
			}

			if (!update) {
				await baseAPI.post(endpoint, dataToPost)
			}
			onSuccess(update)
		} catch (error: any) {
			onError(error)
		} finally {
			setIsLoading(false)
		}
	}

	return { isLoading, handleSubmit }
}
