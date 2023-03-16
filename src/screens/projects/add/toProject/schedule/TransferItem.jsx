import { DayEventOrderedItem } from './DayEventOrderedItem'

export const TransferItem = ({ route, dayOfEvent, timeOfEvent, text }) => (
	<DayEventOrderedItem
		route={route}
		dayOfEvent={dayOfEvent}
		timeOfEvent={timeOfEvent}
		text={text}
	/>
)
