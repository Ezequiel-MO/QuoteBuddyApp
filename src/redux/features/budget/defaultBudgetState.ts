import { IBudget } from '@interfaces/budget'

export const defaultBudget: IBudget = {
	hotels: [],
	selectedHotel: null,
	selectedHotelCost: 0,
	schedule: [],
	activities: {},
	activitiesCost: 0,
	meals: {},
	mealsCost: 0,
	meetings: {},
	meetingsCost: 0,
	overnight: {},
	overnightCost: 0,
	shows: {},
	showsCost: 0,
	programTransfers: {},
	programTransfersCost: 0,
	transfersInCost: 0,
	transfersOutCost: 0,
	itineraryTransfers: {},
	itineraryTransfersCost: 0,
	nrPax: 0,
	gifts: [],
	giftCost: 0
}
