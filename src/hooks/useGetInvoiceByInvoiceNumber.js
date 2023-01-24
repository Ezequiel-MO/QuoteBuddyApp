import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { errorToastOptions } from '../helper/toast'

export const useGetInvoiceByNumber = (invoiceNumber) => {
	const [isLoading, setIsLoading] = useState(true)
	const [invoice, setInvoice] = useState({})

	useEffect(() => {
		const controller = new AbortController()
		const getInvoiceByNumber = async (invoiceNumber) => {
			const url = `/v1/invoices?invoiceNumber=${invoiceNumber}`
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
		getInvoiceByNumber(invoiceNumber)
		return () => {
			controller.abort()
		}
	}, [invoiceNumber])

	return { invoice, isLoading }
}
