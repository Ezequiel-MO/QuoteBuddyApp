import { useState, useEffect, useLayoutEffect } from 'react'
import useGetInvoices from './useGetInvoices'

const useGetInvoice = (invoiceNumber) => {
  const [isLoading, setIsLoading] = useState(true)
  const { invoices } = useGetInvoices()
  const [invoice, setInvoice] = useState(invoices[0] || {})

  useLayoutEffect(() => {
    const currentInvoice = invoices?.filter(
      (invoice) => invoice.invoiceNumber === invoiceNumber
    )
    setInvoice(currentInvoice[0])
    if (currentInvoice.length > 0) {
      setIsLoading(false)
    }
    setInvoice(currentInvoice[0])
  }, [invoices, invoiceNumber])
  return { invoice, isLoading }
}

export default useGetInvoice
