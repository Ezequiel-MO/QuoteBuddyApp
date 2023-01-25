import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { errorToastOptions } from '../helper/toast'

export const useGetDocumentLength = (url) => {
	const [results, setResults] = useState(0)

	useEffect(() => {
		const resultsUrl = `v1/${url}`
		const controller = new AbortController()
		const getDocumentLength = async () => {
			try {
				const response = await baseAPI.get(resultsUrl, {
					signal: controller.signal
				})
				const results = Math.ceil(response.data.results / 10)
				setResults(results)
			} catch (error) {
				toast.error(error, errorToastOptions)
			}
		}
		getDocumentLength()
		return () => {
			controller.abort()
		}
	}, [url])

	return {
		results
	}
}
