import { ITransfer } from '../../../../interfaces'
import {
  MeetGreetRow,
  TransfersInAssistanceRow,
  TransfersInRow
} from '../rows/transfers_in'

interface TransfersInSectionProps {
  transfers: ITransfer[]
  date: string
}

export const TransfersInSection = ({
  transfers,
  date
}: TransfersInSectionProps) => {
  return (
    <>
      <MeetGreetRow firstItem={transfers[0]} date={date} />
      <TransfersInAssistanceRow firstItem={transfers[0]} date={date} />
      <TransfersInRow items={transfers} date={date} />
    </>
  )
}
