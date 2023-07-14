import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import baseAPI from '../axios/axiosConfig'
import { IInvoice } from '../interfaces'
import { errorToastOptions } from '../helper/toast'
import { AxiosResponse } from 'axios'

interface IApiResponse {
	data: {
		data: IInvoice
	}
}

export const useGetInvoiceById = (invoiceId: string) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [invoice, setInvoice] = useState<IInvoice | null>(null)

	useEffect(() => {
		if (!invoiceId) return

		setIsLoading(true)

		const getInvoiceById = async (invoiceId: string) => {
			const url = `invoices/${invoiceId}`
			try {
				const response: AxiosResponse<IApiResponse> =
					await baseAPI.get<IApiResponse>(url)

				setInvoice(response.data.data.data)
			} catch (error: any) {
				if (error.name === 'AbortError') {
					console.log('Fetch operation was aborted')
				} else {
					toast.error(
						`Error fetching invoice, ${error?.response?.data?.message}`,
						errorToastOptions as any
					)
				}
			} finally {
				setIsLoading(false)
			}
		}
		getInvoiceById(invoiceId)
	}, [invoiceId])

	return { invoice, isLoading }
}
