import { IEvent, IRestaurant, ITransfer } from '../../../../../interfaces'
import { AssistanceRow } from './AssistanceRow'
import { TransferRow } from './TransferRow'

interface Props {
	transfer: ITransfer[]
	date: string
	id:
		| 'transfer_morningEvents'
		| 'transfer_afternoonEvents'
		| 'transfer_lunch'
		| 'transfer_dinner'
	selectedEvent: IEvent | IRestaurant
}

export const EventTransferRow = ({
	transfer = [],
	date,
	id,
	selectedEvent
}: Props) => {
	const transferIsNeeded =
		selectedEvent &&
		Array.isArray(selectedEvent.transfer) &&
		selectedEvent.transfer.length > 0

	if (!transferIsNeeded) return null

	const assistanceIsNeeded = transfer[0].assistance !== 0

	return (
		<>
			{assistanceIsNeeded && (
				<AssistanceRow
					firstItem={transfer[0]}
					date={date}
					description="On Board Assistance"
					id={id}
					idRestaunrantOrActivity={selectedEvent._id}
				/>
			)}
			<TransferRow
				pax={transfer.length}
				date={date}
				options={transfer}
				description="Transfer Service (Morning Event)"
				id={id}
				selectedEvent={selectedEvent}
			/>
		</>
	)
}
