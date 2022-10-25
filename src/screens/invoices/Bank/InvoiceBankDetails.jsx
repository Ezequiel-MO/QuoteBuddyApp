import { useState } from 'react'
import { useCurrentInvoice } from '../../../hooks/useCurrentInvoice'
import BBVADetails from './BBVADetails'
import DBDetails from './DBDetails'

const InvoiceBankDetails = () => {
  const { currentInvoice } = useCurrentInvoice()
  const [bank, setBank] = useState('DB')

  return (
    <>
      {currentInvoice.postingStatus !== 'posted' ? (
        <div className='mt-56 text-black-50 ml-10 z-[500]'>
          <select
            id='bank'
            name={bank}
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className='cursor-pointer'
          >
            <option value='DB'>Deutsche Bank</option>
            <option value='BBVA'>BBVA</option>
          </select>
        </div>
      ) : null}

      {bank === 'DB' ? <DBDetails /> : <BBVADetails />}
    </>
  )
}

export default InvoiceBankDetails
