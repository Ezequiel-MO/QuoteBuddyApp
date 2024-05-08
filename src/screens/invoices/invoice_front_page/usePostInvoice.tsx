import { useState } from 'react'
import baseAPI from '../../../axios/axiosConfig'
import { IInvoice } from '@interfaces/invoice'

interface UsePostInvoiceProps {
	onSuccess: () => void
	onError: (error: Error) => void
	currentInvoice: Partial<IInvoice>
}

export const usePostInvoice = ({
	onSuccess,
	onError,
	currentInvoice
}: UsePostInvoiceProps) => {
	const [isLoading, setIsLoading] = useState(false)

	const handlePostInvoice = async () => {
		try {
			if (!currentInvoice || currentInvoice.status === 'posted') {
				throw new Error('This invoice has already been saved or is unavailable')
			}
			const confirmed = window.confirm(
				'Please confirm you want to post the invoice.'
			)
			if (confirmed) {
				setIsLoading(true)
				await baseAPI.post('invoices', currentInvoice)
				onSuccess()
			}
		} catch (error) {
			onError(error instanceof Error ? error : new Error(String(error)))
		} finally {
			setIsLoading(false)
		}
	}

	return { handlePostInvoice, isLoading }
}
