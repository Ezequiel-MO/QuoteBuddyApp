import { useState } from 'react'
import baseAPI from '../../../axios/axiosConfig'

export const usePostInvoice = (onSuccess, onError, currentInvoice) => {
	const [isLoading, setIsLoading] = useState(false)

	const handlePostInvoice = async () => {
		try {
			if (currentInvoice.postingStatus === 'posted') {
				throw new Error('This invoice has already been saved')
			}
			let confirmed = confirm(
				'ATTENTION: Please check all details are correct before saving. This invoice cannot be edited after it is saved to the Data Base'
			)
			if (confirmed) {
				setIsLoading(true)
				await baseAPI.post('invoices', currentInvoice)

				onSuccess()
			}
		} catch (error) {
			onError(error)
		} finally {
			setIsLoading(false)
		}
	}
	return { handlePostInvoice, isLoading }
}
