import { useApiFetch } from '@hooks/fetchData'
import { IFreelancer } from '@interfaces/freelancer'
import { useState } from 'react'

export const useFreelancers = () => {
	const [url, setUrl] = useState<string>('')
	const [refresh, setRefresh] = useState<number>(0)

	const {
		data: freelancers = [],
		isLoading,
		dataLength
	} = useApiFetch<IFreelancer[]>(url, refresh, !!url)

	const fetchFreelancers = (city?: string) => {
		let endpoint = 'freelancers'
		if (city && city !== 'none') {
			endpoint += `?city=${encodeURIComponent(city)}`
		}

		console.log(`Fetching freelancers with URL: ${endpoint}`)
		setUrl(endpoint)
		setRefresh((prev) => prev + 1)
	}

	return {
		freelancers,
		isLoading,
		dataLength,
		fetchFreelancers
	}
}
