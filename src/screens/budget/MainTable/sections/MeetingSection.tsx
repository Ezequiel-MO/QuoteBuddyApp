import { useState, useEffect } from 'react'
import { IMeeting } from '../../../../interfaces'
import { MeetingSummaryRow, MeetingBreakdownRows } from '../rows/meeting'
import { useCurrentProject } from 'src/hooks'
import { UpdateProgramMeetingsCostPayload } from 'src/redux/features/currentProject/types'

interface MeetingSectionProps {
	meetings: IMeeting[]
	date: string
	pax: number
	type: 'morning' | 'afternoon' | 'full_day'
	id: 'morningMeetings' | 'afternoonMeetings' | 'fullDayMeetings'
}

export const MeetingSection = ({
	meetings,
	date,
	pax,
	type
}: MeetingSectionProps) => {
	const {
		budget: { selectedHotel },
		updateBudgetProgramMeetingsCost
	} = useCurrentProject()
	const [isOpen, setIsOpen] = useState<boolean>(false)

	useEffect(() => {
		const meetingForSelectedHotel = meetings.find(
			(meeting) => meeting.hotelName === selectedHotel?.name
		)
		if (meetingForSelectedHotel) {
			const payload: UpdateProgramMeetingsCostPayload = {
				date,
				meeting: meetingForSelectedHotel,
				type,
				pax
			}
			updateBudgetProgramMeetingsCost(payload)
		}
	}, [meetings, selectedHotel])

	const [meetingsDay, setMeetingsDay] = useState<IMeeting[]>([])
	useEffect(() => {
		const meetingsHotel = meetings.filter(
			(el) => el.hotelName === selectedHotel?.name
		)
		if (isOpen) {
			setIsOpen(false)
		}
		setTimeout(() => {
			setMeetingsDay([])
		}, 500)
		setTimeout(() => {
			setMeetingsDay(meetingsHotel)
		}, 1000)
	}, [selectedHotel])

	return (
		meetingsDay?.length > 0 && (
			<>
				<MeetingSummaryRow
					type={type}
					date={date}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
				/>
				<MeetingBreakdownRows
					pax={pax}
					type={type}
					meetings={meetingsDay}
					isOpen={isOpen}
					date={date}
				/>
			</>
		)
	)
}
