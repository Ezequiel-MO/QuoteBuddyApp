// src/screens/preview/main-section/cards/EventCard.tsx

import React from 'react'
import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'
import RenderPhotos from '@components/organisms/RenderPhotos'
import { IEvent } from '@interfaces/event'

interface Props {
	event: IEvent
	isActive: boolean
}

const EventCard: React.FC<Props> = ({ event, isActive }) => {
	return (
		<div id={event._id} className="rounded-lg">
			<RichParagraph text={event.textContent || ''} isActive={isActive} />
			<RenderPhotos images={event.imageContentUrl ?? []} />
		</div>
	)
}

export default EventCard
