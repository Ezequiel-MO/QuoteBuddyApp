import { useMemo } from 'react'
import { ITransfer } from '../../../../interfaces'
import { AssistanceRow, TransferRow } from '../rows/meals_activities'
import { AssistanceItineraryRow } from "../rows/itinerary/AssistanceItineraryRow"
import { TransferIteneraryRow } from "../rows/itinerary/TransferIteneraryRow"

interface Props {
  date: string
  transfers: ITransfer[]
  type: 'morning' | 'afternoon' | 'night' | '' // este despues hay que eleminar
  starts: 'morning' | 'afternoon' | 'night' | ''
  ends: 'morning' | 'afternoon' | 'night' | ''
}

export const TransferItinerarySection = ({ date, transfers, type, starts, ends }: Props) => {
  if (!transfers) return
  const assistanceIsNeeded = transfers[0].assistance !== 0

  const groupedItems = useMemo(() => {
    const groups: { [key: string]: ITransfer[] } = {}
    transfers.forEach((item) => {
      const { _id } = item
      if (!groups[_id]) groups[_id] = []
      groups[_id].push(item)
    })
    return groups
  }, [transfers])


  return (
    <>
      {
        assistanceIsNeeded && (
          <AssistanceItineraryRow
            firstItem={transfers[0]}
            date={date}
            description='En Route Assistance'
            starts={starts}
            ends={ends}
          />
        )
      }
      <TransferIteneraryRow
        options={transfers}
        date={date}
        starts={starts}
        ends={ends}
      />
    </>
  )
}
