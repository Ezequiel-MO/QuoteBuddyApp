import { useContext } from 'react'
import { InvoiceContext } from './context'
import { INVOICE_ACTIONS } from './reducer'

const InvoiceHeader = () => {
  const { invoiceValues, dispatch } = useContext(InvoiceContext)

  const handleChange = (e) => {
    dispatch({ type: INVOICE_ACTIONS.SET_INVOICE_VALUE, payload: e.target })
  }
  return (
    <div className='text-black-50 ml-10 mt-10 flex flex-col'>
      <div className='font-bold leading-none'>
        DATE:{' '}
        <input
          type='text'
          name='date'
          className='ml-2 font-normal cursor-pointer'
          value={invoiceValues.date}
          onChange={handleChange}
        />
      </div>
      <div className='font-bold leading-none'>
        SEND INVOICE TO:
        <input
          type='text'
          name='client'
          className='ml-2 font-normal cursor-pointer'
          value={invoiceValues.client}
          onChange={handleChange}
        />
      </div>
      <div className='font-bold leading-none'>
        COMPANY:{' '}
        <input
          type='text'
          name='company'
          className='ml-2 font-normal cursor-pointer'
          value={invoiceValues.company}
          onChange={handleChange}
        />
      </div>
      <div className='font-bold leading-none'>
        COMPANY ADDRESS:
        <input
          type='text'
          name='address'
          className='ml-2 font-normal cursor-pointer'
          value={invoiceValues.address}
          onChange={handleChange}
        />
      </div>
      <div className='font-bold leading-none'>
        POST CODE:{' '}
        <input
          type='text'
          name='postCode'
          className='ml-2 font-normal cursor-pointer'
          value={invoiceValues.postCode}
          onChange={handleChange}
        />
      </div>
      <div className='font-bold leading-none'>
        REFERENCE:{' '}
        <input
          type='text'
          name='reference'
          className='ml-2 font-normal cursor-pointer'
          value={invoiceValues.reference}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default InvoiceHeader
