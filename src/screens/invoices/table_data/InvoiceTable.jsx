import '../invoice.css'
import accounting from 'accounting'
import { useCurrentInvoice } from '../../../hooks/useCurrentInvoice'
import PostedTable from './PostedTable'

const InvoiceTable = ({ handleChange }) => {
  const { currentInvoice, changeCurrency } = useCurrentInvoice()
  const {
    currency,
    lineDate,
    lineText,
    lineAmount,
    postingStatus,
    invoiceNumber
  } = currentInvoice

  if (postingStatus === 'posted' || postingStatus === 'review') {
    return <PostedTable invoiceNumber={invoiceNumber} />
  }

  return (
    <table className='ml-10 text-black-50 w-[700px] border max-h-[500px] table-fixed z-50'>
      <tbody>
        <tr>
          <td className='border border-r-1 pl-2 w-[120px]'>
            {' '}
            <input
              type='date'
              name='lineDate'
              className='date-input ml-2 font-normal cursor-pointer w-[100px]'
              value={lineDate}
              onChange={handleChange}
            />
          </td>
          <td className='border border-r-1 pl-2'>
            <textarea
              type='text'
              name='lineText'
              className='date-input ml-2 font-normal cursor-pointer w-11/12'
              value={lineText}
              onChange={handleChange}
            />
          </td>
          <td className='border border-r-1 pl-2 w-[120px]'>
            <div className='flex items-center'>
              <select
                id='currencyUnit'
                name='currencyUnit'
                value={currency}
                onChange={(e) => changeCurrency(e.target.value)}
                className='cursor-pointer'
              >
                <option value='EUR'>EUR</option>
                <option value='USD'>USD</option>
              </select>
              <span>
                <input
                  type='number'
                  name='lineAmount'
                  className='date-input ml-2 font-normal cursor-pointer w-[70px]'
                  value={lineAmount}
                  onChange={handleChange}
                />
              </span>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td></td>
          <td className='border-2 pl-2 font-bold'>{`${accounting.formatMoney(
            currentInvoice.lineAmount,
            `${currency}    `
          )}`}</td>
        </tr>
      </tfoot>
    </table>
  )
}

export default InvoiceTable
