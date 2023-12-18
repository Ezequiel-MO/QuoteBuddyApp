import { useState, useEffect } from 'react'
import { useApiFetch } from './useApiFetch'
import { IInvoice } from '@interfaces/invoice'

interface Props {
	page?: number
	invoiceId?: string
	invoiceNumber?: string
	limit?: number
}

export const useFetchInvoices = ({
	page,
	invoiceId,
	invoiceNumber,
	limit = 10
}: Props) => {
	const [url, setUrl] = useState<string>('')

	useEffect(() => {
		let constructedUrl = 'invoices'

		if (invoiceId) {
			constructedUrl = `invoices/${invoiceId}`
		} else if (invoiceNumber) {
			constructedUrl = `invoices?invoiceNumber=${invoiceNumber}`
		} else if (page !== undefined) {
			constructedUrl += `?page=${page}&limit=${limit}`
		}

		setUrl(constructedUrl)
	}, [page, invoiceId, invoiceNumber, limit])

	const {
		data: invoices,
		setData: setInvoices,
		isLoading
	} = useApiFetch<IInvoice[]>(url)

	return { invoices, setInvoices, isLoading }
}
