import { useState, useEffect, useContext } from 'react'
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

  useEffect(() => {
    if (invoices.length > 0) {
      let invoiceNumbers = invoices?.map((invoice) => invoice.invoiceNumber)
      let lastInvoiceNumber = Math.max(...invoiceNumbers)
      dispatch({
        type: INVOICE_ACTIONS.INCREMENT_INVOICE_NUMBER,
        payload: lastInvoiceNumber
      })
    }
  }, [invoices])

  const handlePostInvoice = async () => {
    if (invoiceValues.postingStatus === 'posted') {
      toast.error('This invoice has already been saved', errorToastOptions)
      return
    }
    let confirmed = confirm(
      'ATTENTION: Please checkall details are correct before saving. This invoice cannot be edited after it is saved to the Data Base'
    )
    if (confirmed) {
      try {
        await baseAPI.post('v1/invoices', invoiceValues)
        toast.success('Invoice Saved', toastOptions)
        dispatch({
          type: INVOICE_ACTIONS.CHANGE_POSTING_STATUS,
          payload: 'posted'
        })
      } catch (error) {
        toast.error(
          `Error Creating/Updating Invoice, ${
            error || 'unable to create/update the invoice'
          }`,
          errorToastOptions
        )
      }
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
            : 'Generate New Invoice'}
        </button>
      </div>
    </div>
  )
}

export default InvoiceLogo
