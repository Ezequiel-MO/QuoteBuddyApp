import { useDispatch, useSelector } from 'react-redux'
import {
  RESET_MEETING_VALUES,
  selectMeetingValues
} from '../redux/features/MeetingValuesSlice'

export const useMeetingValues = () => {
  const dispatch = useDispatch()
  const meetingValues = useSelector(selectMeetingValues)
  const resetMeetingValues = () => {
    dispatch(RESET_MEETING_VALUES())
  }

  return {
    meetingValues,
    resetMeetingValues
  }
}
