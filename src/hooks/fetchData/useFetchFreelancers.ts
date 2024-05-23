import { useState, useEffect } from 'react'
import { useApiFetch } from './useApiFetch'
import { IFreelancer } from '@interfaces/freelancer'

export const useFetchFreelancers = (params?: { city?: string }) => {
	const [url, setUrl] = useState<string>('freelancers')

	useEffect(() => {
		let constructedUrl = 'freelancers'
		if (params?.city) {
			constructedUrl += `?city=${encodeURIComponent(params.city)}`
		}
		setUrl(constructedUrl)
	}, [params?.city])

	const {
		data: freelancers,
		setData: setFreelancers,
		isLoading
	} = useApiFetch<IFreelancer[]>(url)

	return { freelancers, setFreelancers, isLoading }
}
