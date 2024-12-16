import { IMeeting } from '@interfaces/meeting'
import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'
import RenderPhotos from '@components/organisms/RenderPhotos'
import { useCurrentProject } from 'src/hooks'

interface Props {
	meeting: IMeeting
	timing: string
}

export const MeetingCard = ({ meeting, timing }: Props) => {
	const {
		budget: { selectedHotel }
	} = useCurrentProject()

	if (meeting?.hotelName !== selectedHotel?.name) return null

	return (
		<div id={meeting._id}>
			<h5 className="text-lg font-semibold mb-2">{`${timing} Hotel Meeting at ${selectedHotel?.name}`}</h5>
			<RichParagraph text={meeting.introduction} />
			<RenderPhotos images={selectedHotel?.meetingImageContentUrl ?? []} />
		</div>
	)
}
