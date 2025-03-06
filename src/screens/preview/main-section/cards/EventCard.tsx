import React, { useMemo } from 'react'
import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'
import { IEvent } from '@interfaces/event'
import { RenderPhotosCaptions } from '@components/organisms/RenderPhotosCaptions'

interface Props {
	event: IEvent
	isActive: boolean
}

const EventCard: React.FC<Props> = ({ event, isActive }) => {
	const { imageContentUrl, imageUrlCaptions } = event

	const images = useMemo(() => {
		if (imageUrlCaptions && imageUrlCaptions.length > 0) {
			return imageUrlCaptions
		} else if (imageContentUrl && imageContentUrl.length > 0) {
			return imageContentUrl.map((url) => ({ imageUrl: url, caption: '' }))
		}

		return []
	}, [imageContentUrl, imageUrlCaptions])

	return (
		<div id={event._id} className="rounded-lg">
			<RichParagraph text={event.textContent || ''} isActive={isActive} />
			<RenderPhotosCaptions images={images ?? []} />
		</div>
	)
}

export default EventCard
