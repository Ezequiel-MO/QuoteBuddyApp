import { IDay } from '@interfaces/project'

export const checkDayIsEmpty = (day: IDay): boolean => {
	const {
		fullDayMeetings: { meetings: fullDayMeetings },
		morningMeetings: { meetings: morningMeetings },
		afternoonMeetings: { meetings: afternoonMeetings },
		morningEvents: { events: morningEvents },
		afternoonEvents: { events: afternoonEvents },
		lunch: { restaurants: lunchRestaurants },
		dinner: { restaurants: dinnerRestaurants },
		transfer_in,
		transfer_out
	} = day

	const allArrays = [
		fullDayMeetings,
		morningMeetings,
		morningEvents,
		afternoonMeetings,
		afternoonEvents,
		lunchRestaurants,
		dinnerRestaurants,
		transfer_in,
		transfer_out
	]

	return allArrays.every((arr) => arr?.length === 0)
}
