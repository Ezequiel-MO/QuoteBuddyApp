import { TimeOfEvent } from '../types'

export const eventMappings: Record<
	TimeOfEvent,
	{ key: string; subKey: string }
> = {
	morningEvents: { key: 'morningEvents', subKey: 'events' },
	afternoonEvents: { key: 'afternoonEvents', subKey: 'events' },
	morningMeetings: { key: 'morningMeetings', subKey: 'meetings' },
	afternoonMeetings: { key: 'afternoonMeetings', subKey: 'meetings' },
	fullDayMeetings: { key: 'fullDayMeetings', subKey: 'meetings' },
	lunch: { key: 'lunch', subKey: 'restaurants' },
	dinner: { key: 'dinner', subKey: 'restaurants' },
	transfer_in: { key: 'transfer_in', subKey: 'transfers' },
	transfer_out: { key: 'transfer_out', subKey: 'transfers' },
	overnight: { key: 'overnight', subKey: 'hotels' },
	itinerary: { key: 'itinerary', subKey: 'transfers' },
	morningActivity: { key: 'morningActivity', subKey: 'events' },
	afternoonActivity: { key: 'afternoonActivity', subKey: 'events' },
	nightActivity: { key: 'nightActivity', subKey: 'events' }
}
