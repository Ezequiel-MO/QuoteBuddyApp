import { useEffect } from 'react'
import { toast } from 'react-toastify'
import cutt_logo from '../../assets/CUTT_LOGO.png'
import baseAPI from '../../axios/axiosConfig'
import { errorToastOptions, toastOptions } from '../../helper/toast'
import { useCurrentInvoice, useGetInvoices } from '../../hooks'
import './invoice.css'

const InvoiceLogo = () => {
  const {
    incrementInvoiceNumber,
    changePostingStatus,
    toggleTaxBreakdown,
    currentInvoice
  } = useCurrentInvoice()
  const { invoices } = useGetInvoices()

  useEffect(() => {
    if (currentInvoice.postingStatus === 'review') return
    if (invoices.length > 0) {
      let invoiceNumbers = invoices?.map((invoice) => invoice.invoiceNumber)
      let lastInvoiceNumber = Math.max(...invoiceNumbers)
      incrementInvoiceNumber(lastInvoiceNumber)
    }
  }, [invoices, currentInvoice.postingStatus])

  const handlePostInvoice = async () => {
    if (currentInvoice.postingStatus === 'posted') {
      toast.error('This invoice has already been saved', errorToastOptions)
      return
    }
    let confirmed = confirm(
      'ATTENTION: Please check all details are correct before saving. This invoice cannot be edited after it is saved to the Data Base'
    )
    if (confirmed) {
      try {
        await baseAPI.post('v1/invoices', currentInvoice)
        toast.success('Invoice Saved', toastOptions)
        changePostingStatus('posted')
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
        {currentInvoice.postingStatus === 'posting' && (
          <div id='vat_checkbox'>
            <label htmlFor='VAT' className='text-black-50 mr-2'>
              Include VAT
            </label>
            <input
              type='checkbox'
              id='VAT'
              className='mr-2'
              checked={currentInvoice.taxBreakdown}
              onChange={(e) => toggleTaxBreakdown(e.target.checked)}
            />
          </div>
        )}

        {currentInvoice.postingStatus !== 'review' && (
          <button
            type='button'
            className='text-black-50 mr-2 my-5 p-2 border border-white-50 text-center rounded-lg active:scale-105 hover:bg-white-50 hover:text-white-100 hover:font-bold'
            onClick={handlePostInvoice}
          >
            {currentInvoice.postingStatus === 'posted'
              ? 'Invoice Saved in DB'
              : 'Generate New Invoice'}
          </button>
        )}
      </div>
    </div>
  )
}

export default InvoiceLogo
