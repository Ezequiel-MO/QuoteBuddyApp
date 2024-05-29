import { useState } from 'react'
import baseAPI from '../../../axios/axiosConfig'
import { IInvoice, IInvoiceBreakdownLine } from '@interfaces/invoice'

interface UsePostInvoiceProps {
	onSuccess: () => void
	onError: (error: Error) => void
	currentInvoice: Partial<IInvoice>
	projectId: string
}

export const usePostInvoice = ({
	onSuccess,
	onError,
	currentInvoice,
	projectId
}: UsePostInvoiceProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handlePostInvoice = async () => {
		try {
			if (!currentInvoice || currentInvoice.status === 'posted') {
				throw new Error('This invoice has already been saved or is unavailable')
			}

			const breakdownLines: IInvoiceBreakdownLine[] =
				currentInvoice.breakdownLines || []
			const breakdownTotal = breakdownLines.reduce(
				(acc, line) => acc + (Number(line.amount) || 0),
				0
			)

			const shouldValidate =
				breakdownLines.length > 1 ||
				(breakdownLines.length === 1 && breakdownLines[0].amount !== 0)

			if (
				shouldValidate &&
				Number(currentInvoice.lineAmount) !== breakdownTotal
			) {
				throw new Error(
					'The invoice line amount does not match the sum of breakdown lines.'
				)
			}

			const confirmed = window.confirm(
				'Please confirm you want to post the invoice.'
			)
			if (confirmed) {
				setIsLoading(true)
				const response = await baseAPI.post('invoices', currentInvoice)
				const invoiceId = response.data.data.data._id

				await baseAPI.patch(`projects/${projectId}/addInvoice`, {
					invoiceId
				})
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
