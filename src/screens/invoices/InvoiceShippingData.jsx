import { useCurrentInvoice } from '../../hooks/useCurrentInvoice'

const InvoiceShippingData = ({ handleChange }) => {
  const { currentInvoice } = useCurrentInvoice()

  if (
    currentInvoice.postingStatus === 'posted' ||
    currentInvoice.postingStatus === 'review'
  ) {
    return (
      <div className='text-black-50 ml-10 mt-10 flex flex-col'>
        <div className='font-bold leading-none flex'>
          DATE:
          <p className='ml-2 font-normal'>{currentInvoice.date}</p>
        </div>
        <div className='font-bold leading-none flex'>
          SEND INVOICE TO:
          <p className='ml-2 font-normal'>{currentInvoice.client}</p>
        </div>
        <div className='font-bold leading-none flex'>
          COMPANY: <p className='ml-2 font-normal'>{currentInvoice.company}</p>
        </div>
        <div className='font-bold leading-none flex'>
          COMPANY ADDRESS:
          <p className='ml-2 font-normal'>{currentInvoice.address}</p>
        </div>
        <div className='font-bold leading-none flex'>
          POST CODE:{' '}
          <p className='ml-2 font-normal'>{currentInvoice.postCode}</p>
        </div>
        <div className='font-bold leading-none flex'>
          REFERENCE:{' '}
          <p className='ml-2 font-normal'>{currentInvoice.reference}</p>
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
          value={currentInvoice.date}
          onChange={handleChange}
        />
      </div>
      <div className='font-bold leading-none'>
        SEND INVOICE TO:
        <input
          type='text'
          name='client'
          className='ml-2 font-normal cursor-pointer w-[500px]'
          value={currentInvoice.client}
          onChange={handleChange}
        />
      </div>
      <div className='font-bold leading-none'>
        COMPANY:{' '}
        <input
          type='text'
          name='company'
          className='ml-2 font-normal cursor-pointer w-[500px]'
          value={currentInvoice.company}
          onChange={handleChange}
        />
      </div>
      <div className='font-bold leading-none'>
        COMPANY ADDRESS:
        <input
          type='text'
          name='address'
          className='ml-2 font-normal cursor-pointer w-[500px]'
          value={currentInvoice.address}
          onChange={handleChange}
        />
      </div>
      <div className='font-bold leading-none'>
        POST CODE:{' '}
        <input
          type='text'
          name='postCode'
          className='ml-2 font-normal cursor-pointer w-[500px]'
          value={currentInvoice.postCode}
          onChange={handleChange}
        />
      </div>
      <div className='font-bold leading-none'>
        REFERENCE:{' '}
        <input
          type='text'
          name='reference'
          className='ml-2 font-normal cursor-pointer w-[500px]'
          value={currentInvoice.reference}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default InvoiceShippingData
