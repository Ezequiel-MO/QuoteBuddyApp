import { useNavigate } from 'react-router-dom'
import accounting from 'accounting'
import { useCurrentInvoice } from '../../../hooks/useCurrentInvoice'
import { useAuth } from '../../../hooks'
import { ButtonDeleted } from '../../../components/atoms'

const InvoiceListItem = ({ invoice, invoices, setInvoices }) => {
	const navigate = useNavigate()
	const { setInvoice } = useCurrentInvoice()

	const { auth } = useAuth()

	const handleClick = () => {
		invoice.postingStatus = 'review'
		setInvoice(invoice)
		navigate(`/app/invoice/specs/${invoice._id}`)
	}

	const shortenDate = (date) => {
		const dateArray = date.split(' ')
		const day = dateArray[1].slice(0, -3)
		const month = dateArray[0]
		const year = dateArray[2]
		const months = {
			January: '01',
			February: '02',
			March: '03',
			April: '04',
			May: '05',
			June: '06',
			July: '07',
			August: '08',
			September: '09',
			October: '10',
			November: '11',
			December: '12'
		}
		//check if `${day}/${months[month]}/${year}` contains the substring 'undefined', and return 'Invalid Date' if it does
		if (`${day}/${months[month]}/${year}`.includes('undefined' || 'NaN')) {
			return 'Inv. Date'
		}
		return `${day}/${months[month]}/${year}`
	}

	return (
		<tbody>
			<tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
				<td
					onClick={() => handleClick(invoice._id)}
					className="hover:text-blue-600 hover:underline cursor-pointer border-r-[1px]"
				>{`${invoice.invoiceNumber} `}</td>
				<td className="truncate border-r-[1px]">{shortenDate(invoice.date)}</td>
				<td className="truncate border-r-[1px]">{invoice.client}</td>
				<td className="truncate border-r-[1px]">{invoice.company}</td>
				<td className="truncate border-r-[1px] max-w-[300px]">
					{invoice.reference}
				</td>
				<td className="min-w-[150px] pl-5">
					{accounting.formatMoney(invoice.lineAmount, `${invoice.currency} `)}
				</td>
				<td className="cursor-pointer">
					{auth.role === 'admin' && (
						<ButtonDeleted
							endpoint={'invoices'}
							ID={invoice._id}
							setter={setInvoices}
							items={invoices}
						/>
					)}
				</td>
			</tr>
		</tbody>
	)
}

export default InvoiceListItem
