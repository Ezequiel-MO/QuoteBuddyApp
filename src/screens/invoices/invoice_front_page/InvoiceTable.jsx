import { useCurrentInvoice } from '../../../hooks'
import './invoice.css'
import { PostedTable, PostingTable } from './'

export const InvoiceTable = ({ handleChange }) => {
	const { currentInvoice } = useCurrentInvoice()
	const { postingStatus, invoiceNumber } = currentInvoice

	if (postingStatus === 'posted' || postingStatus === 'review') {
		return <PostedTable invoiceNumber={invoiceNumber} />
	}

	return <PostingTable handleChange={handleChange} />
}
