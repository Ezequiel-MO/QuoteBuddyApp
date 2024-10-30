import { useInvoice } from '@screens/invoices/context/InvoiceContext'
import React from 'react'

interface Props {
	handlePostInvoice: () => void
}

export const InvoicePostingButton: React.FC<Props> = ({
	handlePostInvoice
}) => {
	const { state } = useInvoice()
	const invoice = state.currentInvoice

	if (!invoice) {
		return <div>No invoice data available. Please load an invoice.</div>
	}
	return (
		<div className="h-[112px] mx-1 flex justify-between">
			<div className="flex items-center">
				<button
					type="button"
					className={`${
						invoice.status === 'posting'
							? 'bg-white-100 hover:bg-orange-50 text-black-50 mr-2 my-5 p-2 border border-white-50 text-center rounded-lg active:scale-105  hover:text-white-100 hover:font-bold'
							: 'hidden'
					}`}
					onClick={handlePostInvoice}
				>
					{invoice.status === 'posted'
						? 'Invoice Saved in DB'
						: 'Generate New Invoice'}
				</button>
			</div>
		</div>
	)
}
