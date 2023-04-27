import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'

export const useGetCompanies = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [companies, setCompanies] = useState([])

	useEffect(() => {
		const getCompanies = async () => {
			let url = `client_companies`
			setIsLoading(true)
			try {
				const response = await baseAPI.get(url)
				setCompanies(response.data.data.data)
				setIsLoading(false)
			} catch (error) {
				toast.error(error, toastOptions)
			}
		}
		getCompanies()
	}, [])

	return { companies, setCompanies, isLoading }
}
