import { useCurrentProject } from '../../../../../../hooks'
import { MeetingMasterForm } from '../forms/meetings/MeetingMasterForm'
import { MeetingDay } from './MeetingDay'

export const DisplayMeetingDays = ({
	handleMeeting,
	meetingForm,
	setMeetingForm
}) => {
	const { currentProject } = useCurrentProject()
	const { schedule } = currentProject

	return (
		<div className="flex flex-col ml-0 mt-3 w-[200px]">
			{schedule.map((day, index) => (
				<MeetingDay
					key={day._id}
					index={index}
					day={day}
					handleMeeting={handleMeeting}
				/>
			))}
			{meetingForm.open && (
				<div className="absolute top-[78px] left-[280px] right-40 bottom-[200px] border border-white-50 p-5 rounded-lg ">
					<MeetingMasterForm
						date={meetingForm.date}
						timing={meetingForm.timing}
						meetingForm={meetingForm}
						setMeetingForm={setMeetingForm}
					/>
				</div>
			)}
		</div>
	)
}
