import { ITransfer } from '../../../../interfaces'
import { AssistanceItineraryRow } from '../rows/itinerary/AssistanceItineraryRow'
import { TransferItineraryRow } from '../rows/itinerary/TransferItineraryRow'

interface Props {
	date: string
	transfers?: ITransfer[]
	type: 'morning' | 'afternoon' | 'night' | ''
	starts: 'morning' | 'afternoon' | 'night' | ''
	ends: 'morning' | 'afternoon' | 'night' | ''
}

export const TransferItinerarySection = ({
	date,
	transfers,
	type,
	starts,
	ends
}: Props) => {
	if (!transfers) return
	const assistanceIsNeeded = transfers[0].assistance !== 0

	return (
		<>
			{assistanceIsNeeded && (
				<AssistanceItineraryRow
					firstItem={transfers[0]}
					date={date}
					description="En Route Assistance"
					starts={starts}
					ends={ends}
				/>
			)}
			<TransferItineraryRow
				options={transfers}
				date={date}
				starts={starts}
				ends={ends}
			/>
		</>
	)
}
