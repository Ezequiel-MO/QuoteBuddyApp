import { useState, FC } from 'react'
import { MeetingCard } from './card/MeetingCard'
import { IntroAdd } from '../../../../../components/atoms'
import { IntroModal } from './introModal/IntroModal'
import { MeetingModal } from './meetingModal/MeetingModal'
import { IDay } from '@interfaces/project'
import { TimeOfEvent } from 'src/redux/features/currentProject/types'
import { IMeeting } from '@interfaces/meeting'

interface DayMeetingsProps {
	day: IDay
	dayIndex: number
	handleDeleteEvent: (
		dayIndex: number,
		timeOfEvent: TimeOfEvent,
		eventId: string
	) => void
	timeOfEvent: "fullDayMeetings" | "morningMeetings" | "afternoonMeetings"
}

export const DayMeetings: FC<DayMeetingsProps> = ({ timeOfEvent, day, handleDeleteEvent, dayIndex }) => {
	const meetings:IMeeting[] = day[timeOfEvent]?.meetings ?? []
	const hasMeetings = meetings && meetings.length > 0

	const [openModalIntro, setOpenModalIntro] = useState(false)
	const [open, setOpen] = useState(false)
	const [meeting, setMeeting] = useState<IMeeting>()

	const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, eventModal: IMeeting) => {
		setMeeting(eventModal)
		setOpen(true)
	}

	return (
		<div className="flex flex-col space-y-4 w-full hover:bg-gray-700">
			{hasMeetings && (
				<>
					<IntroAdd setOpen={setOpenModalIntro} events={day[timeOfEvent]} />
					<IntroModal
						day={day.date}
						open={openModalIntro}
						setOpen={setOpenModalIntro}
						eventType={timeOfEvent}
						dayIndex={dayIndex}
						events={day[timeOfEvent]}
					/>
				</>
			)}

			<MeetingModal
				open={open}
				setOpen={setOpen}
				meeting={meeting}
				dayIndex={dayIndex}
				timeOfEvent={timeOfEvent}
			/>
			{meetings.map((el, index) => (
				<MeetingCard
					meeting={el}
					index={index}
					handleClick={handleClick}
					onDelete={() => handleDeleteEvent(dayIndex, timeOfEvent, el._id)}
					key={index}
				/>
			))}
		</div>
	)
}
