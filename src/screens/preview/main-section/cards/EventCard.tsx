// src/screens/preview/main-section/cards/EventCard.tsx

import React from 'react'
import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'
import { IEvent } from '@interfaces/event'
import { RenderPhotosCaptions } from '@components/organisms/RenderPhotosCaptions'


interface Props {
	event: IEvent
	isActive: boolean
}

const EventCard: React.FC<Props> = ({ event, isActive }) => {
	return (
		<div id={event._id} className="rounded-lg">
			<RichParagraph text={event.textContent || ''} isActive={isActive} />
			<RenderPhotosCaptions images={event.imageUrlCaptions ?? []} />
		</div>
	)
}

export default EventCard
