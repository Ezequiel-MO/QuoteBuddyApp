import { useNavigate } from 'react-router-dom'
import accounting from 'accounting'
import { useCurrentInvoice } from '../../../hooks/useCurrentInvoice'
import {useAuth} from '../../../hooks'
import {ButtonDeleted} from "../../../components/atoms"

const InvoiceListItem = ({ invoice, invoices, setInvoices }) => {
	const navigate = useNavigate()
	const { setInvoice } = useCurrentInvoice()

	const {auth} = useAuth()

	const handleClick = () => {
		invoice.postingStatus = 'review'
		setInvoice(invoice)
		navigate(`/app/invoice/specs`)
	}

	return (
		<tbody>
			<tr className="mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50">
				<td
					onClick={handleClick}
					className="hover:text-blue-600 hover:underline cursor-pointer"
				>{`${invoice.invoiceNumber} `}</td>
				<td>{invoice.date}</td>
				<td>{invoice.client}</td>
				<td>{invoice.company}</td>
				<td>{invoice.reference}</td>
				<td>
					{accounting.formatMoney(invoice.lineAmount, `${invoice.currency} `)}
				</td>
				<td className="cursor-pointer">
					{
						auth.role === "admin" &&
						<ButtonDeleted
						endpoint={'invoices'}
						ID={invoice._id}
						setter={setInvoices}
						items={invoices}
						/>
					}
				</td>
			</tr>
		</tbody>
	)
}

export default InvoiceListItem
