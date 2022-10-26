import accounting from 'accounting'
import useGetInvoice from '../../../hooks/useGetInvoice'

const PostedTable = ({ invoiceNumber }) => {
  const { invoice, isLoading } = useGetInvoice(invoiceNumber)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <table className='ml-10 text-black-50 w-[700px] border max-h-[500px] table-fixed z-50'>
      <tbody>
        <tr>
          <td className='border border-r-1 pl-2 w-[120px]'>
            {invoice?.lineDate}
          </td>
          <td className='border border-r-1 pl-2'>{invoice?.lineText}</td>
          <td className='border border-r-1 pl-2 w-[120px]'>
            <div className='flex items-center'>
              {`${accounting.formatMoney(
                invoice?.lineAmount,
                `${invoice?.currency}    `
              )}`}
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td></td>
          <td></td>
          <td className='border-2 pl-2 font-bold'>{`${accounting.formatMoney(
            invoice?.lineAmount,
            `${invoice?.currency}    `
          )}`}</td>
        </tr>
      </tfoot>
    </table>
  )
}

export default PostedTable
