import { useState, useEffect, useContext } from 'react'
import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import cutt_logo from '../../assets/CUTT_LOGO.png'
import baseAPI from '../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../helper/toast'
import { InvoiceContext } from './context'
import './invoice.css'
import useGetInvoices from '../../hooks/useGetInvoices'
import { INVOICE_ACTIONS } from './reducer'

const InvoiceLogo = () => {
  const { invoiceValues, dispatch } = useContext(InvoiceContext)
  const { invoices } = useGetInvoices()
  const [currentInvoiceNumber, setCurrentInvoiceNumber] = useState(
    parseFloat(invoiceValues.invoiceNumber)
  )

  useEffect(() => {
    if (invoices) {
      let invoiceNumbers = invoices?.map((invoice) =>
        parseFloat(invoice.invoiceNumber)
      )
      let lastInvoiceNumber = Math.max(...invoiceNumbers)
      setCurrentInvoiceNumber(lastInvoiceNumber)
      dispatch({
        type: INVOICE_ACTIONS.INCREMENT_INVOICE_NUMBER,
        payload: lastInvoiceNumber
      })
    }
  }, [invoices, invoiceValues])

  const handlePostInvoice = async () => {
    if (invoiceValues.postingStatus === 'posted') {
      toast.error('This invoice has already been saved', errorToastOptions)
      return
    }
    try {
      if (invoiceValues.postingStatus === 'editing') {
        let invoiceId = invoices?.filter(
          (invoice) =>
            parseFloat(invoice.invoiceNumber) === currentInvoiceNumber
        )[0]._id
        invoiceValues.invoiceNumber = parseFloat(invoiceValues.invoiceNumber)
        await baseAPI.patch(`v1/invoices/${invoiceId}`, invoiceValues)
        toast.success('Invoice Updated', toastOptions)
      } else {
        await baseAPI.post('v1/invoices', invoiceValues)
        toast.success('Invoice Saved', toastOptions)
      }
      dispatch({
        type: INVOICE_ACTIONS.CHANGE_POSTING_STATUS,
        payload: 'posted'
      })
    } catch (error) {
      toast.error(
        `Error Creating/Updating Invoice, ${
          error.response.data.message || 'unable to create/update the invoice'
        }`,
        errorToastOptions
      )
    }
  }

  return (
    <div className='border-b-[13px] border-b-white-50 h-[112px] mx-1 flex justify-between'>
      <img
        alt='Backoffice header'
        className='object-cover h-6 mt-10 ml-10'
        src={cutt_logo}
      />
      <div className='flex items-center'>
        <button
          type='button'
          className='text-black-50 mr-2 my-5 p-2 border border-white-50 text-center rounded-lg active:scale-105 hover:bg-white-50 hover:text-white-100 hover:font-bold'
          onClick={handlePostInvoice}
        >
          {invoiceValues.postingStatus === 'posted'
            ? 'Invoice Saved in DB'
            : invoiceValues.postingStatus === 'editing'
            ? 'Edit Invoice'
            : 'Create New Invoice'}
        </button>
        <button
          type='button'
          onClick={() =>
            dispatch({
              type: INVOICE_ACTIONS.CHANGE_POSTING_STATUS,
              payload: 'editing'
            })
          }
          className='text-black-50 mr-5 p-2 border border-white-50 text-center rounded-lg active:scale-105 hover:bg-white-50 hover:text-white-100 hover:font-bold'
        >
          <Icon icon='akar-icons:edit' />
        </button>
      </div>
    </div>
  )
}

export default InvoiceLogo
