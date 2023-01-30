import { Icon } from '@iconify/react'
import { useCurrentProject } from '../../../../../../hooks'
import { MeetingMasterForm } from '../forms/MeetingMasterForm'

export const DisplayMeetingDays = ({
	handleMeeting,
	meetingForm,
	setMeetingForm
}) => {
	const { currentProject } = useCurrentProject()
	const { schedule } = currentProject

	return (
		<div className="flex flex-col ml-10 mt-3 w-[200px]">
			{schedule.map((day, index) => (
				<div
					key={day._id}
					className="flex flex-row items-center border border-orange-50 rounded-md border-dashed bg-black-50 p-2 my-2 ml-3 cursor-pointer"
				>
					<Icon icon="bi:arrow-return-right" color="white" width={30} />
					<div className="ml-3 text-white-100 grid grid-cols-1">
						<div className="uppercase">{day.date}</div>
						<div
							onClick={() =>
								handleMeeting(
									index,
									'Morning Meeting',
									'morningMeetings',
									day.date
								)
							}
							className="indent-3 w-[350px] hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer flex items-center justify-start"
						>
							Morning Meeting
							<span
								className={`${
									day.morningMeetings.length > 0 ? 'block' : 'hidden'
								}`}
							>
								<Icon icon="ci:download-done" color="lime" />
							</span>
						</div>

						<div
							onClick={() =>
								handleMeeting(
									index,
									'Afternoon Meeting',
									'afternoonMeetings',
									day.date
								)
							}
							className="indent-3 w-[350px] hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer flex items-center justify-start"
						>
							Afternoon Meeting
							<span
								className={`${
									day.afternoonMeetings.length > 0 ? 'block' : 'hidden'
								}`}
							>
								<Icon icon="ci:download-done" color="lime" />
							</span>
						</div>
						<div
							onClick={() =>
								handleMeeting(index, 'All day', 'fullDayMeetings', day.date)
							}
							className="indent-3 w-[350px] hover:text-orange-50 border-l-4 border-transparent hover:border-white-50 hover:cursor-pointer flex items-center justify-start"
						>
							All Day
							<span
								className={`${
									day.fullDayMeetings.length > 0 ? 'block' : 'hidden'
								}`}
							>
								<Icon icon="ci:download-done" color="lime" />
							</span>
						</div>
					</div>
				</div>
			))}
			{meetingForm.open && (
				<div className="absolute top-[145px] left-[280px] right-0 bottom-[135px] border border-white-50 p-5 rounded-lg bg-black-50">
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
