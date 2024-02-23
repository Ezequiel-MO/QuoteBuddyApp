import { IEvent } from '@interfaces/event'
import { EventCard } from '../cards/EventCard'
import TabbedContent from '@components/molecules/tabs/TabbedContent'

interface Props {
	events: IEvent[] | []
}

export const Events = ({ events }: Props) => {
	return (
		<div className="flex flex-wrap">
			<TabbedContent
				items={events}
				renderItem={(event) => <EventCard event={event} />}
				type="event"
			/>
		</div>
	)
}
