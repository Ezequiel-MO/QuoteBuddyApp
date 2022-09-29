import { useContext } from 'react'
import { InvoiceContext } from './context'
import { INVOICE_ACTIONS } from './reducer'

const InvoiceTableHeader = ({ breakdown = false }) => {
  const { invoiceValues, dispatch } = useContext(InvoiceContext)

  const handleChange = (e) => {
    dispatch({ type: INVOICE_ACTIONS.SET_INVOICE_VALUE, payload: e.target })
  }
  return (
    <div className='text-black-50 px-2 ml-10 mt-10 w-[700px] bg-white-50 flex items-center z-50'>
      <span className='font-bold'>INVOICE:</span>
      {breakdown ? (
        <span className='font-normal mx-3'>{`${invoiceValues.invoiceNumber}`}</span>
      ) : (
        <input
          type='text'
          name='invoiceNumber'
          className='ml-2 font-normal cursor-pointer bg-white-50'
          value={invoiceValues.invoiceNumber}
          onChange={handleChange}
        />
      )}

      <span className='font-normal'>{`${breakdown ? 'BREAKDOWN' : ''}`}</span>
    </div>
  )
}

export default InvoiceTableHeader
