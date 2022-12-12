import { useCurrentInvoice } from '../../../hooks'
import '../invoice.css'
import PostedTable from './PostedTable'
import PostingTable from './PostingTable'

const InvoiceTable = ({ handleChange }) => {
  const { currentInvoice } = useCurrentInvoice()
  const { postingStatus, invoiceNumber } = currentInvoice

  if (postingStatus === 'posted' || postingStatus === 'review') {
    return <PostedTable invoiceNumber={invoiceNumber} />
  }

  return <PostingTable handleChange={handleChange} />
}

export default InvoiceTable
