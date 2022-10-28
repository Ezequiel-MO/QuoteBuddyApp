import InvoiceBankDetails from './Bank/InvoiceBankDetails'
import InvoiceDiagonal from './InvoiceDiagonal'
import InvoiceTable from './table_data/InvoiceTable'
import InvoiceTableHeader from './table_data/InvoiceTableHeader'
import InvoiceShippingData from './InvoiceShippingData'
import { useCurrentInvoice } from '../../hooks/useCurrentInvoice'
import InvoiceLogo from './InvoiceLogo'

const InvoiceFrontPage = () => {
  const { setInvoiceValue } = useCurrentInvoice()

  const handleChange = (e) => {
    const payload = { name: e.target.name, value: e.target.value }
    setInvoiceValue(payload)
  }
  return (
    <>
      <InvoiceLogo />
      <InvoiceShippingData handleChange={handleChange} />
      <InvoiceTableHeader />
      <InvoiceTable handleChange={handleChange} />
      <InvoiceBankDetails />
      <InvoiceDiagonal />
    </>
  )
}

export default InvoiceFrontPage
