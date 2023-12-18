import { AxiosResponse } from 'axios'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import baseAPI from 'src/axios/axiosConfig'
import { errorToastOptions } from 'src/helper/toast'

interface IApiResponse<T> {
	data: {
		data: T[]
	}
}

export function useApiFetch<T>(url: string) {
	const [data, setData] = useState<T[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		const controller = new AbortController()
		const fetchData = async () => {
			setIsLoading(true)
			try {
				const response: AxiosResponse<IApiResponse<T>> = await baseAPI.get(
					url,
					{
						signal: controller.signal
					}
				)
				setData(response.data.data.data)
			} catch (error: any) {
				if (!controller.signal.aborted) {
					toast.error(error, errorToastOptions as any)
				}
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()

		return () => {
			controller.abort()
		}
	}, [url])

	return { data, setData, isLoading }
}
