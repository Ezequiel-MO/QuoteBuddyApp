import accounting from 'accounting'

interface Props {
  title: string
  rate: number
}

export const EntertainmentBreakdownRow = ({ title, rate }: Props) => {
  return (
    <tr>
      <td align='center'>{title}</td>
      <td align='center'> </td>
      <td align='center'></td>
      <td align='center'></td>
      <td align='center'>{accounting.formatMoney(rate, '€')}</td>
    </tr>
  )
}
