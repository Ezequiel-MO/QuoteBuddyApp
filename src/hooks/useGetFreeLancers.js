import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'

export const useGetFreeLancers = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [freelancers, setFreelancers] = useState([])

	useEffect(() => {
		const getFreeLancers = async () => {
			let url = `freelancers`
			setIsLoading(true)
			try {
				const response = await baseAPI.get(url)
				setFreelancers(response.data.data.data)
				setIsLoading(false)
			} catch (error) {
				toast.error(error, toastOptions)
			}
		}
		getFreeLancers()
	}, [])

	return { freelancers, setFreelancers, isLoading }
}
