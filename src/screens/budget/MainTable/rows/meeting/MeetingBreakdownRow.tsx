import accounting from 'accounting'

interface Props {
  units: number | 0
  title: string
  rate: number | 0
}

export const MeetingBreakdownRow = ({ units, title, rate }: Props) => {
  if (rate === 0) return null
  return (
    <tr className='border-b border-gray-200 hover:bg-gray-100 hover:text-[#000]'>
      <td className='py-3 px-6 text-left whitespace-nowrap flex items-center font-medium'>
        {title}
      </td>
      <td className='py-3 px-6 text-center'>
        <span
          className={`${
            units !== null
              ? 'bg-orange-50 text-[#fff] font-extrabold py-1 px-3 rounded-full text-sm'
              : null
          }`}
        >
          {units}
        </span>
      </td>
      <td className='py-3 px-6 text-center'></td>
      <td className='py-3 px-6 text-center'>
        {accounting.formatMoney(rate, '€')}
      </td>
      <td className='py-3 px-6 text-center'>
        {accounting.formatMoney(rate * units, '€')}
      </td>
    </tr>
  )
}
