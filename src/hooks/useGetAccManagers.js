import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { errorToastOptions } from '../helper/toast'

export const useGetAccManagers = (page) => {
	const [isLoading, setIsLoading] = useState(false)
	const [accManagers, setAccManagers] = useState([])

	useEffect(() => {
		const url = `v1/accManagers?page=${page}&limit=10`

		const controller = new AbortController()
		const getAccManagers = async () => {
			setIsLoading(true)
			try {
				const response = await baseAPI.get(url, {
					signal: controller.signal
				})

				setAccManagers(response.data.data.data)
				setIsLoading(false)
			} catch (error) {
				toast.error(error, errorToastOptions)
			}
		}

		getAccManagers()

		return () => {
			controller.abort()
		}
	}, [page])

	return {
		isLoading,
		accManagers,
		setAccManagers
	}
}
