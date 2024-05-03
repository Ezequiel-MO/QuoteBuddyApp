import { ButtonDeleteWithAuth } from '@components/atoms'
import { formatMoney, shortenDate } from '../../../helper'

export const DisplayInvoiceDetails = ({
	invoice,
	handleClick,
	auth,
	invoices,
	setInvoices
}) => {
	return (
		<tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
			<td
				onClick={handleClick}
				className="hover:text-blue-600 hover:underline cursor-pointer border-r-[1px]"
			>{`${invoice.invoiceNumber} `}</td>
			<td className="truncate border-r-[1px]">
				{shortenDate(invoice.date, invoice.invoiceNumber)}
			</td>
			<td className="truncate border-r-[1px]">{invoice.client}</td>
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
