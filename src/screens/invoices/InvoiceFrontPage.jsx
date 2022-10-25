import InvoiceBankDetails from './Bank/InvoiceBankDetails'
import InvoiceDiagonal from './InvoiceDiagonal'
import InvoiceLogo from './InvoiceLogo'
import InvoiceTable from './InvoiceTable'
import InvoiceTableHeader from './InvoiceTableHeader'
import InvoiceShippingData from './InvoiceShippingData'
import { useCurrentInvoice } from '../../hooks/useCurrentInvoice'

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
