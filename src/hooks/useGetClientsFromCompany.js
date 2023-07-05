import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { errorToastOptions } from '../helper/toast'
import baseAPI from '../axios/axiosConfig'

export const useGetClientsFromCompany = (companyName, forceRefresh) => {
	const [isLoading, setIsLoading] = useState(false)
	const [employees, setEmployees] = useState([])

	useEffect(() => {
		const controller = new AbortController()
		const getEmployees = async (companyName) => {
			setIsLoading(true)
			try {
				const url = `client_companies?name=${encodeURIComponent(companyName)}`
				const response = await baseAPI.get(url, {
					signal: controller.signal
				})

				setEmployees(response.data.data.data[0].employees)
			} catch (error) {
				toast.error(error, errorToastOptions)
			} finally {
				setIsLoading(false)
			}
		}
		getEmployees(companyName)
		return () => {
			controller.abort()
		}
	}, [companyName, forceRefresh])

	return { isLoading, employees }
}
