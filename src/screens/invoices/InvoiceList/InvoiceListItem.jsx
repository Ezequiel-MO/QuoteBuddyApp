import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { removeItemFromList } from '../../../helper/RemoveItemFromList'
import accounting from 'accounting'

const InvoiceListItem = ({ invoice, invoices, setInvoices }) => {
  const navigate = useNavigate()

  return (
    <tbody>
      <tr className='mb-2 p-1 bg-gray-900 hover:bg-green-100 hover:text-black-50 rounded-md text-white-50'>
        <td
          onClick={() =>
            navigate(`/app/invoice/specs`, {
              state: { invoice }
            })
          }
          className='hover:text-blue-600 hover:underline cursor-pointer'
        >{`${invoice.invoiceNumber} `}</td>
        <td>{invoice.date}</td>
        <td>{invoice.client}</td>
        <td>{invoice.company}</td>
        <td>{invoice.reference}</td>
        <td>{accounting.formatMoney(invoice.lineAmount, 'EUR  ')}</td>
        <td
          className='cursor-pointer'
          onClick={() =>
            removeItemFromList('invoices', invoice._id, setInvoices, invoices)
          }
        >
          <Icon icon='fluent:delete-16-regular' color='#ea5933' />
        </td>
      </tr>
    </tbody>
  )
}

export default InvoiceListItem
