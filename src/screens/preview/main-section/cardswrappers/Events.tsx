// src/screens/preview/main-section/cardswrappers/Events.tsx

import React from 'react'
import EventCard from '../cards/EventCard'
import TabbedContent from '@components/molecules/tabs/TabbedContent'
import { IEvent } from '@interfaces/event'

interface Props {
	events: IEvent[]
}

export const Events: React.FC<Props> = ({ events }) => {
	return (
		<div className="flex flex-wrap">
			<TabbedContent
				items={events}
				renderItem={(event, index, isActive) => (
					<EventCard event={event} isActive={isActive} />
				)}
				type="event"
			/>
		</div>
	)
}

export default Events
