import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'

export const useGetCompany = (id) => {
	const [isLoading, setIsLoading] = useState(false)
	const [company, setCompany] = useState({})

	useEffect(() => {
		const getCompany = async (id) => {
			const url = `client_companies/${id}`
			setIsLoading(true)
			try {
				const response = await baseAPI.get(url)
				setCompany(response.data.data.data)
				setIsLoading(false)
			} catch (error) {
				toast.error(error, toastOptions)
			}
		}
		getCompany(id)
	}, [id])

	return { company, isLoading }
}
