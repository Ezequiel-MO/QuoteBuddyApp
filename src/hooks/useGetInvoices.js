import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { errorToastOptions } from '../helper/toast'

export const useGetInvoices = (page) => {
	const [isLoading, setIsLoading] = useState(false)
	const [invoices, setInvoices] = useState([])

	useEffect(() => {
		const getInvoices = async () => {
			const url = `invoices?page=${page}&limit=10`
			setIsLoading(true)
			try {
				const response = await baseAPI.get(url)
				setInvoices(response.data.data.data)
				setIsLoading(false)
			} catch (error) {
				toast.error(
					`Error fetching invoices, ${error.response.data.message}`,
					errorToastOptions
				)
			}
		}

		getInvoices()
	}, [page])
	return { invoices, setInvoices, isLoading }
}
