import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'

export const useGetAccManagers = (page) => {
	const [isLoading, setIsLoading] = useState(false)
	const [accManagers, setAccManagers] = useState([])
	const [results, setResults] = useState(0)

	useEffect(() => {
		const url = 'v1/accManagers'
		const controller = new AbortController()
		const getDocumentLength = async () => {
			try {
				const response = await baseAPI.get(url, {
					signal: controller.signal
				})
				const results = Math.ceil(response.data.results / 10)
				setResults(results)
			} catch (error) {
				toast.error(error, toastOptions)
			}
		}
		getDocumentLength()
		return () => {
			controller.abort()
		}
	}, [])

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
				toast.error(error, toastOptions)
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
		results,
		setAccManagers
	}
}
