import { useState, useEffect } from 'react'

const useGetLastInvoice = (invoices) => {
  const [lastInvoice, setLastInvoice] = useState({})
  const [lastInvoiceNumber, setLastInvoiceNumber] = useState(0)

  useEffect(() => {
    if (invoices.length > 0) {
      let invoiceNumbers = invoices?.map((invoice) => invoice.invoiceNumber)
      setLastInvoiceNumber(Math.max(...invoiceNumbers))
      setLastInvoice(
        invoices?.filter(
          (invoice) => parseFloat(invoice.invoiceNumber) === lastInvoiceNumber
        )[0]
      )
    }
  }, [invoices])

  return { lastInvoice, lastInvoiceNumber }
}

export default useGetLastInvoice
