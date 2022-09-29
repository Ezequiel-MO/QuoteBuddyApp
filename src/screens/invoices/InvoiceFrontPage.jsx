import { useState } from 'react'
import InvoiceBankDetails from './InvoiceBankDetails'
import InvoiceDiagonal from './InvoiceDiagonal'
import InvoiceHeader from './InvoiceHeader'
import InvoiceLogo from './InvoiceLogo'
import InvoiceTable from './InvoiceTable'
import InvoiceTableHeader from './InvoiceTableHeader'

const InvoiceFrontPage = () => {
  return (
    <>
      <InvoiceLogo />
      <InvoiceHeader />
      <InvoiceTableHeader />
      <InvoiceTable />
      <InvoiceBankDetails />
      <InvoiceDiagonal />
    </>
  )
}

export default InvoiceFrontPage
