import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { errorToastOptions } from '../helper/toast'
import { filterDocumentLength } from '../helper/filterHelp'

export const useGetDocumentLength = (url, valuesRute, filterOptions) => {
	const allValues = valuesRute ? valuesRute.filter((el) => el.value) : []
	const [results, setResults] = useState(0)

	useEffect(() => {
		let resultsUrl = `${url}`
		if (allValues.length > 0) {
			resultsUrl = filterDocumentLength({
				filterOptions: filterOptions,
				valuesRute: valuesRute,
				url: url
			})
		}
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
	}, [url, valuesRute, filterOptions])

	return {
		results
	}
}
