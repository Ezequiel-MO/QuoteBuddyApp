import accounting from 'accounting'

interface Props {
  units: number
  title: string
  rate: number
}

export const VenueBreakdownRow = ({ units, title, rate }: Props) => {
  if (units === 0) return null

  return (
    <>
      <th scope='row' className='text-left font-medium'>
        {title}
      </th>
      <td className='text-center'>{units}</td>
      <td></td>
      <td className='text-right'>{accounting.formatMoney(rate, '€')}</td>
      <td className='text-right'>
        {accounting.formatMoney(rate * units, '€')}
      </td>
    </>
  )
}
