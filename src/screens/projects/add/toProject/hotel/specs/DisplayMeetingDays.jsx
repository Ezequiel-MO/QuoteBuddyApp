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
		<div className="flex flex-col ml-10 mt-3 w-[200px]">
			{schedule.map((day) => (
				<MeetingDay key={day._id} day={day} handleMeeting={handleMeeting} />
			))}
			{meetingForm.open && (
				<div className="absolute top-[145px] left-[280px] right-0 bottom-[50px] border border-white-50 p-5 rounded-lg bg-black-50">
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
