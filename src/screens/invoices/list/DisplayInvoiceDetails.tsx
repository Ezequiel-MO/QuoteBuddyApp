import { ButtonDeleteWithAuth, Spinner } from '@components/atoms'
import { formatMoney } from '../../../helper'
import { useGetClientName } from 'src/hooks/useGetClientName'
import { IInvoice } from '@interfaces/invoice'
import { useAuth } from '@context/auth/AuthProvider'
import { shortenDate } from '../helpers/shortenDate'

interface DisplayInvoiceDetailsProps {
	invoice: IInvoice
	handleClick: () => void
	invoices: IInvoice[]
	setInvoices: React.Dispatch<React.SetStateAction<IInvoice[]>>
}

export const DisplayInvoiceDetails: React.FC<DisplayInvoiceDetailsProps> = ({
	invoice,
	handleClick,
	invoices,
	setInvoices
}) => {
	const { auth } = useAuth()

	// Check if the client string is a MongoDB ID
	// MongoDB ObjectIDs are 24-character hexadecimal strings
	const isMongoId = /^[0-9a-fA-F]{24}$/.test(invoice.client)

	// Only use the hook if we have a MongoDB ID
	const { clientName } = useGetClientName(isMongoId ? invoice.client : '')

	return (
		<tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
			<td
				onClick={handleClick}
				className="hover:text-blue-600 hover:underline cursor-pointer border-r-[1px]"
			>{`${invoice.invoiceNumber} `}</td>
			<td className="truncate border-r-[1px]">
				{shortenDate(invoice.date, invoice.invoiceNumber)}
			</td>
			<td className="truncate border-r-[1px]">
				{isMongoId ? clientName : invoice.client}
			</td>
			<td className="truncate border-r-[1px]">{invoice.company}</td>
			<td className="truncate border-r-[1px] max-w-[250px]">
				{invoice.reference}
			</td>
			<td className="min-w-[150px] pl-5">
				{formatMoney(invoice.lineAmount, invoice.currency)}
			</td>
			{auth.role === 'admin' && (
				<td className="cursor-pointer">
					<ButtonDeleteWithAuth
						endpoint="invoices"
						ID={invoice._id}
						setter={setInvoices}
						items={invoices}
					/>
				</td>
			)}
		</tr>
	)
}
