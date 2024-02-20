import { ITransfer } from '../../../../interfaces'
import { AssistanceRow, TransferRow } from '../rows/meals_activities'

interface Props {
  date: string
  transfers: ITransfer[]
  type: 'morning' | 'afternoon' | 'night' | ''
}

export const TransferItinerarySection = ({ date, transfers, type }: Props) => {
  if (!transfers) return
  const assistanceIsNeeded = transfers[0].assistance !== 0

  return (
    <>
      {assistanceIsNeeded && (
        <AssistanceRow
          firstItem={transfers[0]}
          date={date}
          description='En Route Assistance'
        />
      )}
      <TransferRow
        date={date}
        options={transfers}
        description='En Route Itinerary'
        id={
          type === 'morning'
            ? 'transfer_morningItinerary'
            : 'transfer_afternoonItinerary'
        }
      />
    </>
  )
}
