import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'

export const useGetCompanies = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [companies, setCompanies] = useState([])

	const getCompanies = useCallback(async () => {
		const url = 'client_companies'
		setIsLoading(true)
		try {
			const response = await baseAPI.get(url)
			setCompanies(response.data.data.data)
		} catch (error) {
			toast.error(error, toastOptions)
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		getCompanies()
	}, [getCompanies])

	return { companies, setCompanies, isLoading }
}
