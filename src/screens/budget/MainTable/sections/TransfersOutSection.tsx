import { ITransfer } from '../../../../interfaces'
import {
  DispatchRow,
  TransfersOutAssistanceRow,
  TransfersOutRow
} from '../rows/transfers_out'

interface TransfersOutSectionProps {
  transfers: ITransfer[]
  date: string
}

export const TransfersOutSection = ({
  transfers,
  date
}: TransfersOutSectionProps) => {
  return (
    <>
      <DispatchRow lastItem={transfers[0]} date={date} />
      <TransfersOutAssistanceRow firstItem={transfers[0]} date={date} />
      <TransfersOutRow items={transfers} date={date} />
    </>
  )
}
