import { useContext } from 'react'
import cutt_logo from '../../assets/CUTT_LOGO.png'
import { InvoiceContext } from './context'
import './invoice.css'

const InvoiceLogo = () => {
  const { invoiceValues } = useContext(InvoiceContext)

  const handlePostInvoice = () => {
    console.log('invoice posted')
  }
  return (
    <div className='border-b-[13px] border-b-white-50 h-[112px] mx-1 flex justify-between'>
      <img
        alt='Backoffice header'
        className='object-cover h-6 mt-10 ml-10'
        src={cutt_logo}
      />
      <button
        type='button'
        className='text-black-50 mr-10 my-5 p-2 border border-white-50 text-center rounded-lg active:scale-105 hover:bg-white-50 hover:text-white-100 hover:font-bold'
        onClick={handlePostInvoice}
      >
        Save Invoice
      </button>
    </div>
  )
}

export default InvoiceLogo
