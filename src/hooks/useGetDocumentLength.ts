import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { errorToastOptions } from '../helper/toast'
import { filterDocumentLength } from '../helper/filterHelp'

interface FilterValue {
	name: string
	value: string | undefined
}

interface Return {
	results: number
}

export const useGetDocumentLength = (
	url: string,
	valuesRute: FilterValue[],
	filterOptions: string[]
): Return => {
	const allValues = valuesRute ? valuesRute.filter((el) => el.value) : []
	const [results, setResults] = useState<number>(0)

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
			} catch (error: any) {
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
