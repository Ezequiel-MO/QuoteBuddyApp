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
	const imageContentUrl = event.imageContentUrl
	const imageUrlCaptions = event.imageUrlCaptions
	let images
	//check if imageContentUrl is not empty
	if (imageContentUrl) {
		//convert each item of imageContentUrl to an object with imageUrl and caption
		images = imageContentUrl.map((image, index) => {
			return { imageUrl: image, caption: '' }
		})
	}
	//if imageUrlCaptions is not empty, use it
	else if (imageUrlCaptions) {
		images = imageUrlCaptions
	}

	return (
		<div id={event._id} className="rounded-lg">
			<RichParagraph text={event.textContent || ''} isActive={isActive} />
			<RenderPhotosCaptions images={images ?? []} />
		</div>
	)
}

export default EventCard
