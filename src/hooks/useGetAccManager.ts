import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'
import { IAccManager } from '@interfaces/accManager'

export const useGetAccManager = (query: string) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [accManager, setAccManager] = useState<IAccManager | null>(null)

	useEffect(() => {
		const controller = new AbortController()
		const getAccManager = async (query: string) => {
			const url = `accManagers?email=${query}`
			setIsLoading(true)
			try {
				const response = await baseAPI.get(url, {
					signal: controller.signal
				})
				setAccManager(response.data.data.data[0] as IAccManager)
				setIsLoading(false)
			} catch (error: any) {
				toast.error(error, toastOptions)
			}
		}

		getAccManager(query)

		return () => {
			controller.abort()
		}
	}, [query])

	return { accManager, setAccManager, isLoading }
}
