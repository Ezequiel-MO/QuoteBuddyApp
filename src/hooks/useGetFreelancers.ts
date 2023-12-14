import { useState, useEffect } from 'react'
import { IFreelancer } from '../interfaces/freelancer'
import { toast } from 'react-toastify'
import { errorToastOptions } from '../helper/toast'
import baseAPI from '../axios/axiosConfig'

export const useGetFreelancers = (city?: string) => {
	const [freelancers, setFreelancers] = useState<IFreelancer[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		const controller = new AbortController()
		const getFreelancerByCity = async () => {
			setIsLoading(true)
			try {
				let url = `freelancers`
				if (city) {
					url += `?city=${encodeURIComponent(city)}`
				}
				const response = await baseAPI.get(url, {
					signal: controller.signal
				})
				setFreelancers(response.data.data.data)
			} catch (error: any) {
				toast.error(error, errorToastOptions as any)
			} finally {
				setIsLoading(false)
			}
		}

		getFreelancerByCity()
		return () => {
			controller.abort()
		}
	}, [city])

	return { isLoading, freelancers }
}
