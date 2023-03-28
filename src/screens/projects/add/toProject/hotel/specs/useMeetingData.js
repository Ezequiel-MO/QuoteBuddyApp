import { useState } from 'react'

export const useMeetingData = () => {
	const [meetingForm, setMeetingForm] = useState({
		date: '',
		dayOfEvent: '',
		open: false,
		timing: '',
		timeOfEvent: ''
	})

	const handleMeeting = (dayOfEvent, timing, timeOfEvent, date) => {
		setMeetingForm({
			...meetingForm,
			date,
			dayOfEvent,
			open,
			timing,
			timeOfEvent
		})
	}

	return { meetingForm, setMeetingForm, handleMeeting }
}
