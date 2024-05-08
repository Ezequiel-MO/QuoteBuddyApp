import { AxiosResponse } from 'axios'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import baseAPI from 'src/axios/axiosConfig'
import { errorToastOptions } from 'src/helper/toast'

interface IApiResponse<T> {
	data: {
		data: T
	}
}

export function useApiFetch<T>(
	url: string,
	forceRefresh: number = 0,
	shouldFetch: boolean = true
): {
	data: T
	setData: React.Dispatch<React.SetStateAction<T>>
	isLoading: boolean
} {
	const [data, setData] = useState<T>([] as T)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		if (!shouldFetch) return
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
					toast.error(
						error?.response?.data?.message || 'An error occurred',
						errorToastOptions
					)
				}
			} finally {
				if (!controller.signal.aborted) {
					setIsLoading(false)
				}
			}
		}

		fetchData()

		return () => {
			controller.abort()
		}
	}, [url, forceRefresh, shouldFetch])

	return { data, setData, isLoading }
}
