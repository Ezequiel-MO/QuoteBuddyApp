import InvoiceDiagonal from './InvoiceDiagonal'
import InvoiceLogo from './InvoiceLogo'
import InvoiceTable from './InvoiceTable'
import InvoiceTableHeader from './InvoiceTableHeader'

const InvoiceBreakdown = () => {
  return (
    <>
      <InvoiceLogo />
      <InvoiceTableHeader breakdown />
      <InvoiceTable />
      <InvoiceDiagonal />
    </>
  )
}

export default InvoiceBreakdown
