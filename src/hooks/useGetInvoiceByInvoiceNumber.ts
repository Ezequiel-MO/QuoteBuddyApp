import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { errorToastOptions } from '../helper/toast'
import { IInvoice } from '../interfaces'
import { AxiosResponse } from 'axios'

interface IApiResponse {
	data: {
		data: IInvoice
	}
}

export const useGetInvoiceByNumber = (invoiceNumber: string) => {
	const [isLoading, setIsLoading] = useState(true)
	const [invoice, setInvoice] = useState<IInvoice | null>(null)

	useEffect(() => {
		const controller = new AbortController()
		const getInvoiceByNumber = async (invoiceNumber: string) => {
			const url = `invoices?invoiceNumber=${invoiceNumber}`
			try {
				setIsLoading(true)
				const response: AxiosResponse<IApiResponse> =
					await baseAPI.get<IApiResponse>(url, {
						signal: controller.signal
					})
				setInvoice(response.data.data.data)
			} catch (error: any) {
				toast.error(
					`Error fetching invoice, ${error.response?.data?.message}`,
					errorToastOptions as any
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
