import { useContext } from 'react'
import { InvoiceContext } from './context'
import './invoice.css'
import accounting from 'accounting'

const InvoiceTable = ({ handleChange }) => {
  const { invoiceValues } = useContext(InvoiceContext)

  if (invoiceValues.postingStatus === 'posted') {
    return (
      <table className='ml-10 text-black-50 w-[700px] border max-h-[500px] table-fixed z-50'>
        <tbody>
          <tr>
            <td className='border border-r-1 pl-2 w-[120px]'>
              {invoiceValues.lineDate}
            </td>
            <td className='border border-r-1 pl-2'>{invoiceValues.lineText}</td>
            <td className='border border-r-1 pl-2 w-[120px]'>
              <div className='flex items-center'>
                EUR {invoiceValues.lineAmount}
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td className='border-2 pl-2 font-bold'>{`${accounting.formatMoney(
              invoiceValues.lineAmount,
              'EUR    '
            )}`}</td>
          </tr>
        </tfoot>
      </table>
    )
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
              value={invoiceValues.lineDate}
              onChange={handleChange}
            />
          </td>
          <td className='border border-r-1 pl-2'>
            <textarea
              type='text'
              name='lineText'
              className='date-input ml-2 font-normal cursor-pointer w-11/12'
              value={invoiceValues.lineText}
              onChange={handleChange}
            />
          </td>
          <td className='border border-r-1 pl-2 w-[120px]'>
            <div className='flex items-center'>
              EUR{' '}
              <span>
                <input
                  type='number'
                  name='lineAmount'
                  className='date-input ml-2 font-normal cursor-pointer w-[70px]'
                  value={invoiceValues.lineAmount}
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
            invoiceValues.lineAmount,
            'EUR    '
          )}`}</td>
        </tr>
      </tfoot>
    </table>
  )
}

export default InvoiceTable
