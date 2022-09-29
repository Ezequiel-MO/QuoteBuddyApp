import { forwardRef, useReducer } from 'react'
import { InvoiceContext } from './context'
import InvoiceBreakdown from './InvoiceBreakdown'
import InvoiceFrontPage from './InvoiceFrontPage'
import { initialInvoiceValues, invoiceReducer } from './reducer'

const Invoice = forwardRef((props, ref) => {
  const [invoiceValues, dispatch] = useReducer(
    invoiceReducer,
    initialInvoiceValues
  )

  return (
    <div ref={ref} className='flex flex-col items-center justify-center'>
      <InvoiceContext.Provider value={{ invoiceValues, dispatch }}>
        <div className='bg-white-0 text-white-0 w-[800px] h-[1126px] relative flex flex-col'>
          <InvoiceFrontPage />
        </div>
        {/*   <div className='bg-white-0 text-white-0 w-[800px] h-[1126px] relative flex flex-col'>
          <InvoiceBreakdown />
        </div> */}
      </InvoiceContext.Provider>
    </div>
  )
})

export default Invoice
