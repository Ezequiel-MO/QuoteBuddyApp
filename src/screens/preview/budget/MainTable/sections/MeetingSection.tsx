import { useState, useEffect } from 'react'
import { IMeeting } from '../../../../interfaces'
import { MeetingSummaryRow, MeetingBreakdownRows } from '../rows/meeting'
import { useContextBudget } from '../../context/BudgetContext'

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
  const { state, dispatch } = useContextBudget()
  const { selectedHotel } = state
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    const meetingForSelectedHotel = meetings.find(
      (meeting) => meeting.hotelName === selectedHotel?.name
    )

    if (meetingForSelectedHotel) {
      dispatch({
        type: 'UPDATE_PROGRAM_MEETINGS_COST',
        payload: {
          date,
          meeting: meetingForSelectedHotel,
          type,
          pax
        }
      })
    }
  }, [meetings, selectedHotel, dispatch])

  return (
    meetings?.length > 0 && (
      <>
        <MeetingSummaryRow type={type} isOpen={isOpen} setIsOpen={setIsOpen} />
        <MeetingBreakdownRows
          pax={pax}
          type={type}
          meetings={meetings}
          isOpen={isOpen}
        />
      </>
    )
  )
}
