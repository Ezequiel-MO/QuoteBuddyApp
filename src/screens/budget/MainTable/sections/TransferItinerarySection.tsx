import { ITransfer } from '../../../../interfaces'
import { AssistanceItineraryRow } from '../rows/itinerary/AssistanceItineraryRow'
import { TransferItineraryRow } from '../rows/itinerary/TransferItineraryRow'
import { SectionHeader } from './SectionHeader'

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
	if (!transfers) return null

	const assistanceIsNeeded = transfers[0]?.assistance !== 0

	// Format times for readability
	const formatTimePeriod = (period: string): string => {
		if (!period) return ''
		return period.charAt(0).toUpperCase() + period.slice(1)
	}

	const subtitle = `${formatTimePeriod(starts)} to ${formatTimePeriod(ends)}`

	return (
		<>
			{/* Section Header */}
			<SectionHeader
				title="Itinerary Transfers"
				type="transfer"
				subtitle={subtitle}
			/>

			{/* Assistance Row */}
			{assistanceIsNeeded && (
				<AssistanceItineraryRow
					firstItem={transfers[0]}
					date={date}
					description="En Route Assistance"
					starts={starts}
					ends={ends}
				/>
			)}

			{/* Transfer Row */}
			<TransferItineraryRow
				options={transfers}
				date={date}
				starts={starts}
				ends={ends}
			/>
		</>
	)
}
