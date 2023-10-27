import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { toastOptions } from '../helper/toast'

export const useGetCompany = (id: string, forceRefresh: number = 0) => {
	const [isLoading, setIsLoading] = useState(false)
	const [company, setCompany] = useState({})

	useEffect(() => {
		const getCompany = async (id: string) => {
			const url = `client_companies/${id}`
			setIsLoading(true)
			try {
				const response = await baseAPI.get(url)
				setCompany(response.data.data.data)
				setIsLoading(false)
			} catch (error: any) {
				console.log({ error })
				toast.error(error.message, toastOptions)
			}
		}
		getCompany(id)
	}, [id, forceRefresh])

	return { company, isLoading }
}
