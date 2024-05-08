import React from 'react'
import { PostedTable, PostingTable } from '.'
import './invoice.css'
import { useInvoice } from '../context/InvoiceContext'

const InvoiceTable: React.FC = () => {
	const { state } = useInvoice()

	if (!state.currentInvoice) {
		return <div>No invoice data available.</div>
	}

	if (state.currentInvoice.status === 'posting') {
		return <PostingTable />
	}

	return <PostedTable />
}

export default InvoiceTable
