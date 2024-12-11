import { BudgetState } from 'src/screens/budget/context/interfaces'
import { IRestaurant, IGift, IProject } from 'src/interfaces'

export function getDayIndex(date: string, state: IProject) {
	let dayIndex: number | undefined
	let daySchedule = date.split(' ')
	switch (daySchedule[0]) {
		case 'Arrival':
			dayIndex = 0
			break
		case 'Day':
			dayIndex = parseInt(daySchedule[1]) - 1
			break
		case 'Departure':
			dayIndex = state.schedule.length - 1
			break
		default:
			dayIndex = undefined
			break
	}
	if (typeof dayIndex !== 'number') throw Error('day not found')
	return dayIndex
}

export function existActivity(
	dayIndex: number,
	state: IProject,
	typeActivity: 'morningEvents' | 'afternoonEvents',
	idActivity: string
) {
	const findActivity = state.schedule[dayIndex][typeActivity].events.find(
		(el) => el._id === idActivity
	)
	if (!findActivity) throw Error('Activity not found')
}

export function existActivityItinerary(
	dayIndex: number,
	state: BudgetState,
	typeActivity: 'morningActivity' | 'afternoonActivity',
	idActivity: string
) {
	const findActivity = state.schedule[dayIndex].itinerary[
		typeActivity
	].events.find((el) => el._id === idActivity)
	if (!findActivity) throw Error('Activity not found')
}

export function existRestaurant(
	dayIndex: number,
	state: BudgetState,
	typeMeal: 'lunch' | 'dinner',
	idRestaurant: string
) {
	const findRestaurant = state.schedule[dayIndex][typeMeal].restaurants.find(
		(el) => el._id === idRestaurant
	)
	if (!findRestaurant) throw Error('restaurant not found')
}

export function existRestaurantItinerary(
	dayIndex: number,
	state: BudgetState,
	typeMeal: 'lunch' | 'dinner',
	idRestaurant: string
) {
	const findRestaurant = state.schedule[dayIndex].itinerary[
		typeMeal
	].restaurants.find((el) => el._id === idRestaurant)
	if (!findRestaurant) throw Error('restaurant not found')
}

export function existEntertaiment(
	restaurant: IRestaurant,
	idEntertaiment: string
) {
	const findEntertaiment = restaurant.entertainment?.find(
		(el) => el._id === idEntertaiment
	)
	if (!findEntertaiment) throw Error('entertainment not found')
}

export function existGift(gifts: IGift[], idGift: string) {
	const findGift = gifts?.find((el) => el._id === idGift)
	if (!findGift) throw Error('gift not found')
}

export function existMeeting(
	dayIndex: number,
	state: BudgetState,
	typeMeeting: 'morningMeetings' | 'afternoonMeetings' | 'fullDayMeetings',
	idMeeting: string,
	hotelName: string
) {
	const findMeeting = state.schedule[dayIndex][typeMeeting].meetings.find(
		(el) => el._id === idMeeting && el.hotelName === hotelName
	)
	if (!findMeeting) throw Error('Meeting not found')
}

export const getKeyHotelPrice = (
	fieldTitle: string,
	unitsOrPrice: 'units' | 'price'
) => {
	let fieldName:
		| 'DUInr'
		| 'DUIprice'
		| 'DoubleRoomNr'
		| 'DoubleRoomPrice'
		| 'breakfast'
		| 'DailyTax' = 'DUInr'
	switch (fieldTitle) {
		case 'Double Room Single Use':
			if (unitsOrPrice === 'units') {
				fieldName = 'DUInr'
			} else {
				fieldName = 'DUIprice'
			}
			break
		case 'Double Room //Twin Room':
			if (unitsOrPrice === 'units') {
				fieldName = 'DoubleRoomNr'
			} else {
				fieldName = 'DoubleRoomPrice'
			}
			break
		case 'City Tax':
			fieldName = 'DailyTax'
			break
		case 'Breakfast':
			fieldName = 'breakfast'
			break
		default:
			console.error('Invalid field title')
	}
	return fieldName
}
