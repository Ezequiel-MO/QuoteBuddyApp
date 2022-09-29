import { useContext } from 'react'
import InvoiceBankDetails from './InvoiceBankDetails'
import InvoiceDiagonal from './InvoiceDiagonal'
import InvoiceLogo from './InvoiceLogo'
import InvoiceTable from './InvoiceTable'
import InvoiceTableHeader from './InvoiceTableHeader'
import { InvoiceContext } from './context'
import { INVOICE_ACTIONS } from './reducer'
import InvoiceShippingData from './InvoiceShippingData'

const InvoiceFrontPage = () => {
  const { dispatch } = useContext(InvoiceContext)
  const handleChange = (e) => {
    dispatch({ type: INVOICE_ACTIONS.SET_INVOICE_VALUE, payload: e.target })
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
