import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'
import RenderPhotos from '@components/organisms/RenderPhotos'
import { IEvent } from '@interfaces/event'

interface Props {
	event: IEvent
}

export const EventCard = ({ event }: Props) => {
	return (
		<div id={event._id} className="rounded-lg">
			<RichParagraph text={event.textContent || ''} />
			<RenderPhotos images={event.imageContentUrl ?? []} />
		</div>
	)
}
