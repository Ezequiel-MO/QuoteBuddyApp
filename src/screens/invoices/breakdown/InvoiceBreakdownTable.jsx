import { useCurrentInvoice } from '../../../hooks'
import '../invoice_front_page/invoice.css'
import { PostedTable } from '../invoice_front_page'
import { BreakdownList } from './'

export const InvoiceBreakdownTable = () => {
	const { currentInvoice } = useCurrentInvoice()
	const { postingStatus, invoiceNumber } = currentInvoice

	if (postingStatus === 'posted' || postingStatus === 'review') {
		return <PostedTable invoiceNumber={invoiceNumber} />
	}

	return <BreakdownList />
}
