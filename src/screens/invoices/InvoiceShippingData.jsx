import { useContext } from 'react'
import { InvoiceContext } from './context'

const InvoiceShippingData = ({ handleChange }) => {
  const { invoiceValues } = useContext(InvoiceContext)

  if (invoiceValues.postingStatus === 'posted') {
    return (
      <div className='text-black-50 ml-10 mt-10 flex flex-col'>
        <div className='font-bold leading-none flex'>
          DATE:
          <p className='ml-2 font-normal'>{invoiceValues.date}</p>
        </div>
        <div className='font-bold leading-none flex'>
          SEND INVOICE TO:
          <p className='ml-2 font-normal'>{invoiceValues.client}</p>
        </div>
        <div className='font-bold leading-none flex'>
          COMPANY: <p className='ml-2 font-normal'>{invoiceValues.company}</p>
        </div>
        <div className='font-bold leading-none flex'>
          COMPANY ADDRESS:
          <p className='ml-2 font-normal'>{invoiceValues.address}</p>
        </div>
        <div className='font-bold leading-none flex'>
          POST CODE:{' '}
          <p className='ml-2 font-normal'>{invoiceValues.postCode}</p>
        </div>
        <div className='font-bold leading-none flex'>
          REFERENCE:{' '}
          <p className='ml-2 font-normal'>{invoiceValues.reference}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='text-black-50 ml-10 mt-10 flex flex-col'>
      <div className='font-bold leading-none flex'>
        DATE:
        <input
          type='text'
          name='date'
          className='ml-2 font-normal cursor-pointer w-[500px]'
          value={invoiceValues.date}
          onChange={handleChange}
        />
      </div>
      <div className='font-bold leading-none'>
        SEND INVOICE TO:
        <input
          type='text'
          name='client'
          className='ml-2 font-normal cursor-pointer w-[500px]'
          value={invoiceValues.client}
          onChange={handleChange}
        />
      </div>
      <div className='font-bold leading-none'>
        COMPANY:{' '}
        <input
          type='text'
          name='company'
          className='ml-2 font-normal cursor-pointer w-[500px]'
          value={invoiceValues.company}
          onChange={handleChange}
        />
      </div>
      <div className='font-bold leading-none'>
        COMPANY ADDRESS:
        <input
          type='text'
          name='address'
          className='ml-2 font-normal cursor-pointer w-[500px]'
          value={invoiceValues.address}
          onChange={handleChange}
        />
      </div>
      <div className='font-bold leading-none'>
        POST CODE:{' '}
        <input
          type='text'
          name='postCode'
          className='ml-2 font-normal cursor-pointer w-[500px]'
          value={invoiceValues.postCode}
          onChange={handleChange}
        />
      </div>
      <div className='font-bold leading-none'>
        REFERENCE:{' '}
        <input
          type='text'
          name='reference'
          className='ml-2 font-normal cursor-pointer w-[500px]'
          value={invoiceValues.reference}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default InvoiceShippingData
