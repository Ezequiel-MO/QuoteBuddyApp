import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { errorToastOptions } from '../helper/toast'

export const useGetInvoiceById = (invoiceId) => {
	const [isLoading, setIsLoading] = useState(true)
	const [invoice, setInvoice] = useState({})

	useEffect(() => {
		const controller = new AbortController()
		const getInvoiceById = async (invoiceId) => {
			const url = `/v1/invoices/${invoiceId}`
			try {
				setIsLoading(true)
				const response = await baseAPI.get(url, {
					signal: controller.signal
				})
				setInvoice(response.data.data.data)
			} catch (error) {
				toast.error(
					`Error fetching invoice, ${error.response.data.message}`,
					errorToastOptions
				)
			} finally {
				setIsLoading(false)
			}
		}
		getInvoiceById(invoiceId)
		return () => {
			controller.abort()
		}
	}, [invoiceId])

	return { invoice, isLoading }
}
