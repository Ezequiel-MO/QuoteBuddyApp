import { IMeeting } from '@interfaces/meeting'
import { useContextBudget } from '../../budget/context/BudgetContext'
import { RichParagraph } from '@components/atoms/paragraphs/RichParagraph'
import RenderPhotos from '@components/organisms/RenderPhotos'

interface Props {
	meeting: IMeeting
	timing: string
}

export const MeetingCard = ({ meeting, timing }: Props) => {
	const { state } = useContextBudget()

	if (meeting?.hotelName !== state.selectedHotel?.name) return null

	return (
		<div id={meeting._id}>
			<h5 className="text-lg font-semibold mb-2">{`${timing} Hotel Meeting at ${state.selectedHotel?.name}`}</h5>
			<RichParagraph text={meeting.introduction} />
			<RenderPhotos
				images={state.selectedHotel?.meetingImageContentUrl ?? []}
			/>
		</div>
	)
}
