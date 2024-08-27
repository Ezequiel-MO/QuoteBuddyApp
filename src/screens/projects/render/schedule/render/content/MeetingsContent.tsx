// MeetingsContent.tsx
import { HotelSchedule } from '@screens/projects/render/hotel/HotelSchedule'
import React from 'react'
import { TableMeeting } from '../TableMeeting'

const MeetingsContent: React.FC = () => (
	<>
		<HotelSchedule />
		<TableMeeting />
	</>
)

export default React.memo(MeetingsContent)
