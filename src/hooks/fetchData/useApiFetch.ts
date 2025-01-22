import { AxiosResponse } from 'axios'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import baseAPI from 'src/axios/axiosConfig'
import { errorToastOptions } from 'src/helper/toast'

interface IApiResponse<T> {
	data: {
		data: T
	}
	results: number
	nonPaginatedResults: number
}

export function useApiFetch<T>(
	url: string,
	forceRefresh: number = 0,
	shouldFetch: boolean = true,
	debounceDelay: number = 500 // Nuevo parámetro para controlar el tiempo de debounce
): {
	data: T
	setData: React.Dispatch<React.SetStateAction<T>>
	dataLength: number
	isLoading: boolean
} {
	const [data, setData] = useState<T>([] as T)
	const [dataLength, setDataLength] = useState<number>(1)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		if (!shouldFetch) return

		const controller = new AbortController()
		let timeoutId: NodeJS.Timeout

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
				setDataLength(response.data.nonPaginatedResults || 1)
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

		timeoutId = setTimeout(fetchData, debounceDelay)

		return () => {
			clearTimeout(timeoutId)
			controller.abort()
		}
	}, [url, forceRefresh, shouldFetch, debounceDelay]) // Añadimos debounceDelay a las dependencias

	return { data, setData, dataLength, isLoading }
}
