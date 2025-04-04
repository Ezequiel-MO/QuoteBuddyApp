import { useApiFetch } from '@hooks/fetchData'
import { useState } from 'react'

export const useTransferCompanies = () => {
	const [url, setUrl] = useState<string>('')
	const [refresh, setRefresh] = useState<number>(0)

	const {
		data: transferCompanies = [],
		isLoading,
		dataLength
	} = useApiFetch<string[]>(url, refresh, !!url)

	// Function to manually trigger a fetch
	const fetchCompanies = (city?: string) => {
		const endpoint =
			city && city !== 'none'
				? `transfers/companies?city=${encodeURIComponent(city)}`
				: 'transfers/companies'
		setUrl(endpoint)
		setRefresh((prev) => prev + 1)
	}

	return {
		transferCompanies,
		isLoading,
		dataLength,
		fetchCompanies
	}
}
