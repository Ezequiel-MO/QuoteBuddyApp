import { useCurrentInvoice } from '../../../hooks'

const InvoiceTableHeader = ({ breakdown = false }) => {
	const { currentInvoice } = useCurrentInvoice()

	return (
		<div className="text-black-50 px-2 ml-10 mt-10 w-[700px] bg-white-50 flex items-center z-50">
			<span className="font-bold">INVOICE:</span>
			<span className="font-normal mx-3">{currentInvoice?.invoiceNumber}</span>
			<span className="font-normal">{`${breakdown ? 'BREAKDOWN' : ''}`}</span>
		</div>
	)
}

export default InvoiceTableHeader
