import React, { ChangeEvent } from 'react'
import { useCurrentInvoice } from '../../../hooks'
import { PostedTable, PostingTable } from '.'
import './invoice.css'
import { IInvoice } from '@interfaces/invoice'

interface InvoiceTableProps {
	handleChange: (
		event: ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => void
	invoice: IInvoice
}

const InvoiceTable: React.FC<InvoiceTableProps> = ({
	handleChange,
	invoice
}) => {
	const { currentInvoice } = useCurrentInvoice()

	if (currentInvoice.postingStatus === 'posting') {
		return <PostingTable handleChange={handleChange} />
	}

	return <PostedTable invoice={invoice} />
}

export default InvoiceTable
