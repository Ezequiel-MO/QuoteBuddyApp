import {
	IHotel,
	ITransfer,
	IRestaurant,
	IEvent,
	IEntertainment,
	IEntertainmentPrice,
	IGift,
	IMeeting
} from '../../../interfaces'
import { BudgetActions, BudgetState } from './interfaces'
import { IDay } from '../../../interfaces'

export const SET_BUDGET = 'SET_BUDGET'
export const SET_SELECTED_HOTEL = 'SET_SELECTED_HOTEL'
export const SET_SELECTED_HOTEL_COST = 'SET_SELECTED_HOTEL_COST'
export const UPDATE_TRANSFERS_IN_COST = 'UPDATE_TRANSFERS_IN_COST'
export const UPDATE_TRANSFERS_OUT_COST = 'UPDATE_TRANSFERS_OUT_COST'
export const UPDATE_ITINERARY_TRANSFERS_COST = 'UPDATE_ITINERARY_TRANSFERS_COST'
export const UPDATE_PROGRAM_TRANSFERS_COST = 'UPDATE_PROGRAM_TRANSFERS_COST'
export const UPDATE_PROGRAM_MEALS_COST = 'UPDATE_PROGRAM_MEALS_COST'
export const UPDATE_PROGRAM_ACTIVITIES_COST = 'UPDATE_PROGRAM_ACTIVITIES_COST'
export const UPDATE_PROGRAM_MEETINGS_COST = 'UPDATE_PROGRAM_MEETINGS_COST'
export const UPDATE_PROGRAM_SHOWS_COST = 'UPDATE_PROGRAM_SHOWS_COST'
export const UPDATE_OVERNIGHT_COST = 'UPDATE_OVERNIGHT_COST'
export const UPDATE_MEETGREET_TRANSFER_IN = 'UPDATE_MEETGREET_TRANSFER_IN'
export const UPDATE_ASSISTANCE_TRANSFER_IN = 'UPDATE_ASSISTANCE_TRANSFER_IN'
export const UPDATE_TRANSFERS_IN = 'UPDATE_TRANSFERS_IN'
export const UPDATE_MORNING_ACTIVITY = 'UPDATE_MORNING_ACTIVITY'
export const UPDATE_MEETGREET_TRANSFER_OUT = 'UPDATE_MEETGREET_TRANSFER_OUT'
export const UPDATE_ASSISTANCE_TRANSFER_OUT = 'UPDATE_ASSISTANCE_TRANSFER_OUT'
export const UPDATE_TRANSFERS_OUT = 'UPDATE_TRANSFERS_OUT'
export const UPDATE_AFTERNOON_ACTIVITY = 'UPDATE_AFTERNOON_ACTIVITY'
export const UPDATE_LUNCH_RESTAURANT = 'UPDATE_LUNCH_RESTAURANT'
export const UPDATE_DINNER_RESTAURANT = 'UPDATE_DINNER_RESTAURANT'
export const UPDATE_ASSISTANCE_TRANSFER_ACTIVITY_RESTAURANT =
	'UPDATE_ASSISTANCE_TRANSFER_ACTIVITY_RESTAURANT'
export const UPDATE_TRANSFER_ACTIVITY = 'UPDATE_TRANSFER_ACTIVITY'
export const UPDATE_TRANSFER_RESTAURANT = 'UPDATE_TRANSFER_RESTAURANT'
export const UPDATE_OVERNIGHT_HOTEL_PRICE = 'UPDATE_OVERNIGHT_HOTEL_PRICE'
export const UPDATE_RESTAURANT_VENUE = 'UPDATE_RESTAURANT_VENUE'
export const UPDATE_RESTAURANT_ENTERTAIMENT = 'UPDATE_RESTAURANT_ENTERTAIMENT'
export const UPDATE_GIFT = 'UPDATE_GIFT'
export const UPDATE_GIFT_COST = 'UPDATE_GIFT_COST'
export const UPDATE_MEETING = 'UPDATE_MEETING'
export const UPDATE_HOTEL_PRICE = 'UPDATE_HOTEL_PRICE'
export const UPDATE_ASSISTANCE_TRANSFERS_ITINERARY =
	'UPDATE_ASSISTANCE_TRANSFERS_ITINERARY'
export const UPDATE_TRANSFERS_ITINERARY = 'UPDATE_TRANSFERS_ITINERARY'
export const UPDATE_MORNING_ACTIVITY_ITINERARY =
	'UPDATE_MORNING_ACTIVITY_ITINERARY'
export const UPDATE_LUNCH_RESTAURANT_ITINERARY =
	'UPDATE_LUNCH_RESTAURANT_ITINERARY'
export const UPDATE_AFTERNOON_ACTIVITY_ITINERARY =
	'UPDATE_AFTERNOON_ACTIVITY_ITINERARY'
export const UPDATE_DINNER_RESTAURANT_ITINERARY =
	'UPDATE_DINNER_RESTAURANT_ITINERARY'

interface TransferEntry {
	transferCost: number
	assistanceCost: number
}

const calculateHotelCost = (hotel: IHotel, nights: number) => {
	const firstPrice = hotel && hotel?.price[0]

	const hotelCost =
		nights *
		((firstPrice.DUInr ?? 0) * (firstPrice.DUIprice ?? 0) +
			(firstPrice.DoubleRoomNr ?? 0) * (firstPrice.DoubleRoomPrice ?? 0) +
			(firstPrice.breakfast ?? 0) * (firstPrice.DUInr ?? 0) +
			(firstPrice.breakfast ?? 0) * (firstPrice.DoubleRoomNr ?? 0) * 2 +
			(firstPrice.DailyTax ?? 0) * (firstPrice.DUInr ?? 0) +
			(firstPrice.DailyTax ?? 0) * (firstPrice.DoubleRoomNr ?? 0) * 2)

	return hotelCost
}

export const budgetReducer = (
	state: BudgetState,
	action: BudgetActions
): BudgetState => {
	switch (action.type) {
		case SET_BUDGET: {
			const {
				hotels,
				schedule,
				nrPax,
				gifts,
				programTransfers,
				programTransfersCost
			} = action.payload
			return {
				...state,
				hotels: hotels || [],
				schedule: schedule || [],
				nrPax: nrPax || 0,
				gifts: gifts || 0,
				programTransfers: programTransfers,
				programTransfersCost: programTransfersCost
			}
		}
		case SET_SELECTED_HOTEL: {
			return {
				...state,
				selectedHotel: action.payload.selectedHotel
			}
		}
		case SET_SELECTED_HOTEL_COST: {
			let cost
			const { nights, selectedHotel } = action.payload
			const { price = [] } = selectedHotel
			if (price.length === 0) {
				return {
					...state,
					selectedHotelCost: 0
				}
			}
			cost = calculateHotelCost(selectedHotel, nights)

			return {
				...state,
				selectedHotelCost: cost
			}
		}
		case UPDATE_TRANSFERS_IN_COST: {
			let cost = 0
			const { transfer_in } = action.payload
			cost = transfer_in?.reduce(
				(acc, item) => acc + (item.transfer_in || 0),
				0
			)
			if (transfer_in?.length > 0) {
				const firstItem = transfer_in[0]
				cost +=
					(firstItem.assistance || 0) * (firstItem.assistanceCost || 0) +
					(firstItem.meetGreet || 0) * (firstItem.meetGreetCost || 0)
			}

			return {
				...state,
				transfersInCost: cost
			}
		}
		case UPDATE_TRANSFERS_OUT_COST: {
			let cost = 0
			const { transfer_out } = action.payload
			cost = transfer_out?.reduce(
				(acc, item) => acc + (item.transfer_out || 0),
				0
			)
			if (transfer_out?.length > 0) {
				const firstItem = transfer_out[0]
				cost +=
					(firstItem.assistance || 0) * (firstItem.assistanceCost || 0) +
					(firstItem.meetGreet || 0) * (firstItem.meetGreetCost || 0)
			}

			return {
				...state,
				transfersOutCost: cost
			}
		}
		case UPDATE_PROGRAM_TRANSFERS_COST: {
			const { date, transfer, count, type } = action.payload

			let totalServiceCost = 0
			let totalAssistanceCost = 0

			if (transfer) {
				const serviceKey = transfer.selectedService as keyof typeof transfer
				const serviceCost = transfer[serviceKey]

				if (typeof serviceCost === 'number') {
					totalServiceCost = serviceCost * count
				} else {
					console.error(
						`The service cost for the service '${serviceKey}' is not a number.`
					)
				}

				totalAssistanceCost =
					(transfer.assistance || 0) * (transfer.assistanceCost || 0)
			}

			const updatedTypeTransfers: TransferEntry = {
				transferCost: totalServiceCost,
				assistanceCost: totalAssistanceCost
			}

			if (
				type === 'transfer_morningItinerary' ||
				type === 'transfer_afternoonItinerary'
			) {
				const updatedItineraryTransfers = {
					...state.itineraryTransfers,
					[date]: {
						...(state.itineraryTransfers[date] || {}),
						[type]: updatedTypeTransfers
					}
				}
				let newItineraryTransfersCost = 0

				Object.values(updatedItineraryTransfers).forEach((dateTransfers) => {
					Object.values(dateTransfers).forEach((transferType) => {
						newItineraryTransfersCost +=
							transferType.transferCost + totalAssistanceCost
					})
				})
				return {
					...state,
					itineraryTransfers: updatedItineraryTransfers,
					itineraryTransfersCost: newItineraryTransfersCost
				}
			} else {
				const updatedProgramTransfers = {
					...state.programTransfers,
					[date]: {
						...state.programTransfers[date],
						[type]: updatedTypeTransfers
					}
				}

				let newProgramTransfersCost = 0
				Object.values(updatedProgramTransfers).forEach((dateTransfers) => {
					Object.values(dateTransfers).forEach((transferType) => {
						if ('assistanceCost' in transferType) {
							newProgramTransfersCost +=
								transferType.transferCost + (transferType.assistanceCost || 0)
						} else {
							newProgramTransfersCost += transferType.transferCost
						}
					})
				})

				return {
					...state,
					programTransfers: updatedProgramTransfers,
					programTransfersCost: newProgramTransfersCost
				}
			}
		}
		case UPDATE_PROGRAM_MEALS_COST: {
			const { date, restaurant, pax, type } = action.payload

			let totalMealsCost = 0
			let totalVenuesCost = 0

			const updatedMeals = {
				...state.meals,
				[date]: {
					...state.meals?.[date],
					[type]: restaurant
				}
			}

			if (restaurant && restaurant?.isVenue) {
				const {
					rental = 0,
					cocktail_units = 0,
					cocktail_price = 0,
					catering_units = 0,
					catering_price = 0,
					staff_units = 0,
					staff_menu_price = 0,
					audiovisuals = 0,
					cleaning = 0,
					security = 0,
					entertainment = 0
				} = restaurant?.venue_price || {}

				totalVenuesCost = Number(
					rental +
						cocktail_units * cocktail_price +
						catering_units * catering_price +
						staff_units * staff_menu_price +
						audiovisuals +
						cleaning +
						security +
						entertainment
				)
			} else {
				totalMealsCost =
					Object.values(updatedMeals).reduce((acc, day) => {
						let cost = 0
						if (day.lunch && !day.lunch.isVenue) {
							cost += day.lunch.price ?? 0
						}
						if (day.dinner && !day.dinner.isVenue) {
							cost += day.dinner.price ?? 0
						}
						return acc + cost
					}, 0) * pax
			}

			return {
				...state,
				meals: {
					...state.meals,
					[date]: {
						...state.meals?.[date],
						[type]: restaurant
					}
				},
				mealsCost: restaurant?.isVenue ? totalVenuesCost : totalMealsCost
			}
		}

		case UPDATE_PROGRAM_ACTIVITIES_COST: {
			const { date, activity, pax, type } = action.payload

			// Calculate nrPax based on the activity's pricePerPerson property
			let totalActivitiesCost = 0

			// Update the activities object with the new activity
			const updatedActivities = {
				...state.activities,
				[date]: {
					...state.activities?.[date],
					[type]: activity
				}
			}

			// Calculate the total activities cost
			totalActivitiesCost = Object.values(updatedActivities).reduce(
				(acc, day) => {
					let cost = 0
					if (day.morning) {
						const morningPax = day.morning.pricePerPerson ? pax : 1
						cost += (day.morning.price || 0) * morningPax
					}
					if (day.afternoon) {
						const afternoonPax = day.afternoon.pricePerPerson ? pax : 1
						cost += (day.afternoon?.price ?? 0) * afternoonPax
					}
					return acc + cost
				},
				0
			)

			return {
				...state,
				activities: updatedActivities,
				activitiesCost: totalActivitiesCost
			}
		}
		case UPDATE_PROGRAM_MEETINGS_COST: {
			const { date, meeting, type, pax } = action.payload

			if (!meeting) return state

			const updatedMeetings = {
				...state.meetings,
				[date]: {
					...state.meetings?.[date],
					[type]: meeting
				}
			}

			let totalMeetingsCost = 0

			Object.values(updatedMeetings).forEach((day) => {
				if (day) {
					Object.entries(day).forEach(([meetingType, meetingDetails]) => {
						if (meetingDetails) {
							const {
								FDRate = 0,
								HDRate = 0,
								HDDDR = 0,
								FDDDR = 0,
								coffeeBreakUnits = 0,
								coffeeBreakPrice = 0,
								workingLunchUnits = 0,
								workingLunchPrice = 0,
								hotelDinnerUnits = 0,
								hotelDinnerPrice = 0,
								aavvPackage = 0
							} = meetingDetails

							const dddrCost = meetingType === 'full_day' ? FDDDR : HDDDR
							const meetingCost =
								FDRate +
								HDRate +
								dddrCost * pax +
								coffeeBreakUnits * coffeeBreakPrice +
								workingLunchUnits * workingLunchPrice +
								hotelDinnerUnits * hotelDinnerPrice +
								aavvPackage
							totalMeetingsCost += meetingCost
						}
					})
				}
			})

			return {
				...state,
				meetings: updatedMeetings,
				meetingsCost: totalMeetingsCost
			}
		}
		case UPDATE_PROGRAM_SHOWS_COST: {
			const { date, show, type } = action.payload

			const updatedShows = {
				...state.shows,
				[date]: {
					...state.shows[date],
					[type]: show
				}
			}
			let cost = 0

			Object.values(updatedShows).forEach((day) => {
				if (day) {
					Object.values(day).forEach((show) => {
						if (show && show?.price) {
							const {
								aavv = 0,
								artistsFee = 0,
								lighting = 0,
								mealAllowance = 0,
								travelAllowance = 0
							} = show?.price
							let showCost =
								aavv + artistsFee + lighting + mealAllowance + travelAllowance
							cost += showCost
						}
					})
				}
			})

			return {
				...state,
				shows: updatedShows,
				showsCost: cost
			}
		}
		case UPDATE_OVERNIGHT_COST: {
			const { date, hotel } = action.payload
			const hotelCost = hotel ? calculateHotelCost(hotel, 1) : 0

			const updatedOvernight = {
				...state.overnight,
				[date]: {
					...state.overnight[date],
					hotel,
					hotelCost
				}
			}

			const totalCost = Object.values(updatedOvernight).reduce(
				(acc, day) => acc + day.hotelCost,
				0
			)

			return {
				...state,
				overnight: updatedOvernight,
				overnightCost: totalCost
			}
		}
		case UPDATE_MEETGREET_TRANSFER_IN: {
			const { unit, key } = action.payload
			//creo una copia "Profunda" de array de objetos
			const copySchedule: IDay[] = JSON.parse(JSON.stringify(state.schedule))
			const transfersIn = copySchedule[0].transfer_in
			for (let i = 0; i < transfersIn.length; i++) {
				transfersIn[i][key] = unit
			}
			return {
				...state,
				schedule: copySchedule
			}
		}
		case UPDATE_ASSISTANCE_TRANSFER_IN: {
			const { value, key } = action.payload
			//creo una copia "Profunda" de array de objetos
			const copySchedule: IDay[] = JSON.parse(JSON.stringify(state.schedule))
			const transfersIn = copySchedule[0].transfer_in
			for (let i = 0; i < transfersIn.length; i++) {
				transfersIn[i][key] = value
			}
			return {
				...state,
				schedule: copySchedule
			}
		}
		case UPDATE_TRANSFERS_IN: {
			const { value, typeUpdate, id } = action.payload
			const copySchedule: IDay[] = JSON.parse(JSON.stringify(state.schedule))
			if (typeUpdate === 'priceTransfer') {
				const transfersIn = copySchedule[0].transfer_in.map((el) => {
					if (el._id === id) {
						el.transfer_in = value
					}
					return el
				})
				copySchedule[0].transfer_in = transfersIn
				return {
					...state,
					schedule: copySchedule
				}
			}
			if (typeUpdate === 'transfer') {
				const findTransferIn = copySchedule[0].transfer_in.find(
					(el) => el._id === id
				)
				const findIndexTransferIn = copySchedule[0].transfer_in.findIndex(
					(el) => el._id === id
				)
				const transfersIn: any = copySchedule[0].transfer_in.map((el: any) => {
					if (el?._id === findTransferIn?._id) {
						el = []
					}
					return el
				})
				const updateTransferIn = []
				for (let i = 0; i < value; i++) {
					if (findTransferIn) {
						updateTransferIn.push(findTransferIn)
					}
				}
				transfersIn[findIndexTransferIn] = updateTransferIn
				copySchedule[0].transfer_in = transfersIn.flat(2)
				//VERSION ANTERIOR
				// const fiterTransfersIn = copySchedule[0].transfer_in.filter(el => el._id !== id)
				// for (let i = 0; i < value; i++) {
				// 	if (findTransferIn) {
				// 		fiterTransfersIn.push(findTransferIn)
				// 	}
				// }
				// copySchedule[0].transfer_in = fiterTransfersIn
				return {
					...state,
					schedule: copySchedule
				}
			}
			return { ...state }
		}
		case UPDATE_MORNING_ACTIVITY: {
			const { value, dayIndex, id, key } = action.payload
			const copySchedule: IDay[] = JSON.parse(JSON.stringify(state.schedule))
			const copyActivities = copySchedule[dayIndex].morningEvents.events.map(
				(el) => {
					if (el._id === id) {
						el[key] = value
					}
					return el
				}
			)
			copySchedule[dayIndex].morningEvents.events = copyActivities
			return {
				...state,
				schedule: copySchedule
			}
		}
		case UPDATE_MEETGREET_TRANSFER_OUT: {
			const { value, key } = action.payload
			const copySchedule: IDay[] = JSON.parse(JSON.stringify(state.schedule))
			const lastIndex = copySchedule.length - 1
			const transfersOut = copySchedule[lastIndex].transfer_out
			for (let i = 0; i < transfersOut.length; i++) {
				transfersOut[i][key] = value
			}
			return {
				...state,
				schedule: copySchedule
			}
		}
		case UPDATE_ASSISTANCE_TRANSFER_OUT: {
			const { value, key } = action.payload
			const copySchedule: IDay[] = JSON.parse(JSON.stringify(state.schedule))
			const lastIndex = copySchedule.length - 1
			const transfersOut = copySchedule[lastIndex].transfer_out
			for (let i = 0; i < transfersOut.length; i++) {
				transfersOut[i][key] = value
			}
			return {
				...state,
				schedule: copySchedule
			}
		}
		case UPDATE_TRANSFERS_OUT: {
			const { value, typeUpdate, id } = action.payload
			const copySchedule: IDay[] = JSON.parse(JSON.stringify(state.schedule))
			const lastIndex = copySchedule.length - 1
			if (typeUpdate === 'priceTransfer') {
				const transfersOut = copySchedule[lastIndex].transfer_out.map((el) => {
					if (el._id === id) {
						el.transfer_out = value
					}
					return el
				})
				copySchedule[lastIndex].transfer_out = transfersOut
				return {
					...state,
					schedule: copySchedule
				}
			}
			if (typeUpdate === 'transfer') {
				const findTransferOut = copySchedule[lastIndex].transfer_out.find(
					(el) => el._id === id
				)
				const findIndexTransferOut = copySchedule[
					lastIndex
				].transfer_out.findIndex((el) => el._id === id)
				const transfersOut: any = copySchedule[lastIndex].transfer_out.map(
					(el: any) => {
						if (el?._id === findTransferOut?._id) {
							el = []
						}
						return el
					}
				)
				const updateTransferOut = []
				for (let i = 0; i < value; i++) {
					if (findTransferOut) {
						updateTransferOut.push(findTransferOut)
					}
				}
				transfersOut[findIndexTransferOut] = updateTransferOut
				copySchedule[lastIndex].transfer_out = transfersOut.flat(2)
				return {
					...state,
					schedule: copySchedule
				}
			}
			return { ...state }
		}
		case UPDATE_AFTERNOON_ACTIVITY: {
			const { value, dayIndex, id, key } = action.payload
			//creo una copia "Profunda" de array de objetos
			const copySchedule: IDay[] = JSON.parse(JSON.stringify(state.schedule))
			const copyActivities = copySchedule[dayIndex].afternoonEvents.events.map(
				(el) => {
					if (el._id === id) {
						el[key] = value
					}
					return el
				}
			)
			copySchedule[dayIndex].afternoonEvents.events = copyActivities
			return {
				...state,
				schedule: copySchedule
			}
		}
		case UPDATE_LUNCH_RESTAURANT: {
			const { value, dayIndex, id, key } = action.payload
			const copySchedule: IDay[] = JSON.parse(JSON.stringify(state.schedule))
			const copyRestaurants = copySchedule[dayIndex].lunch.restaurants.map(
				(el) => {
					if (el._id === id) {
						el[key] = value
					}
					return el
				}
			)
			copySchedule[dayIndex].lunch.restaurants = copyRestaurants
			return {
				...state,
				schedule: copySchedule
			}
		}
		case UPDATE_DINNER_RESTAURANT: {
			const { value, dayIndex, id, key } = action.payload
			const copySchedule: IDay[] = JSON.parse(JSON.stringify(state.schedule))
			const copyRestaurants = copySchedule[dayIndex].dinner.restaurants.map(
				(el) => {
					if (el._id === id) {
						el[key] = value
					}
					return el
				}
			)
			copySchedule[dayIndex].dinner.restaurants = copyRestaurants
			return {
				...state,
				schedule: copySchedule
			}
		}
		case UPDATE_ASSISTANCE_TRANSFER_ACTIVITY_RESTAURANT: {
			const { value, dayIndex, typeEvent, key, id } = action.payload
			const typesMeals = ['lunch', 'dinner']
			const typesActivities = ['morningEvents', 'afternoonEvents']
			//creo una copia "Profunda" de array de objetos
			const copySchedule: IDay[] = JSON.parse(JSON.stringify(state.schedule))
			if (typesMeals.includes(typeEvent)) {
				const restaurants: IRestaurant[] =
					copySchedule[dayIndex][typeEvent]['restaurants']
				const restaurant = restaurants.find(
					(el) => el._id === id
				) as IRestaurant
				const transfers: ITransfer[] = restaurant.transfer || []
				for (let i = 0; i < transfers?.length; i++) {
					transfers[i][key] = value
				}
			}
			if (typesActivities.includes(typeEvent)) {
				const activities: IEvent[] = copySchedule[dayIndex][typeEvent]['events']
				const activity = activities.find((el) => el._id === id) as IEvent
				const transfers: ITransfer[] = activity.transfer || []
				for (let i = 0; i < transfers?.length; i++) {
					transfers[i][key] = value
				}
			}
			return {
				...state,
				schedule: copySchedule
			}
		}
		case UPDATE_TRANSFER_ACTIVITY: {
			const {
				value,
				dayIndex,
				typeEvent,
				idActivity,
				typeUpdate,
				idTransfer,
				serviceKey
			} = action.payload
			const copySchedule: IDay[] = JSON.parse(JSON.stringify(state.schedule))
			const activities: IEvent[] = copySchedule[dayIndex][typeEvent]['events']
			const activity = activities.find((el) => el._id === idActivity) as IEvent
			if (typeUpdate === 'priceTransfer' && activity.transfer) {
				const transfers = activity.transfer.map((el) => {
					if (el._id === idTransfer && el.selectedService === serviceKey) {
						el[serviceKey] = value
					}
					return el
				})
				activity.transfer = transfers
				return {
					...state,
					schedule: copySchedule
				}
			}
			if (typeUpdate === 'transfer' && activity.transfer) {
				const findTransfer = activity.transfer.find(
					(el) => el._id === idTransfer && el.selectedService === serviceKey
				)
				const findIndexTransfer = activity.transfer.findIndex(
					(el) => el._id === idTransfer && el.selectedService === serviceKey
				)
				const transfers: any = activity.transfer.map((el: any) => {
					if (
						el?._id === findTransfer?._id &&
						el.selectedService === serviceKey
					) {
						el = []
					}
					return el
				})
				const updateTransfer = []
				for (let i = 0; i < value; i++) {
					if (findTransfer) {
						updateTransfer.push(findTransfer)
					}
				}
				transfers[findIndexTransfer] = updateTransfer
				activity.transfer = transfers.flat(2)
				return {
					...state,
					schedule: copySchedule
				}
			}
			return {
				...state,
				schedule: copySchedule
			}
		}
		case UPDATE_TRANSFER_RESTAURANT: {
			const {
				value,
				dayIndex,
				typeEvent,
				idRestaurant,
				typeUpdate,
				idTransfer,
				serviceKey
			} = action.payload
			const copySchedule: IDay[] = JSON.parse(JSON.stringify(state.schedule))
			const restaurants: IRestaurant[] =
				copySchedule[dayIndex][typeEvent].restaurants
			const restaurant = restaurants.find(
				(el) => el._id === idRestaurant
			) as IRestaurant
			if (typeUpdate === 'priceTransfer' && restaurant.transfer) {
				const transfers = restaurant.transfer.map((el) => {
					if (el._id === idTransfer && el.selectedService === serviceKey) {
						el[serviceKey] = value
					}
					return el
				})
				restaurant.transfer = transfers
				return {
					...state,
					schedule: copySchedule
				}
			}
			if (typeUpdate === 'transfer' && restaurant.transfer) {
				const findTransfer = restaurant.transfer.find(
					(el) => el._id === idTransfer && el.selectedService === serviceKey
				)
				const findIndexTransfer = restaurant.transfer.findIndex(
					(el) => el._id === idTransfer && el.selectedService === serviceKey
				)
				const transfers: any = restaurant.transfer.map((el: any) => {
					if (
						el?._id === findTransfer?._id &&
						el.selectedService === serviceKey
					) {
						el = []
					}
					return el
				})
				const updateTransfer = []
				for (let i = 0; i < value; i++) {
					if (findTransfer) {
						updateTransfer.push(findTransfer)
					}
				}
				transfers[findIndexTransfer] = updateTransfer
				restaurant.transfer = transfers.flat(2)
				return {
					...state,
					schedule: copySchedule
				}
			}
			return {
				...state,
				schedule: copySchedule
			}
		}
		case UPDATE_OVERNIGHT_HOTEL_PRICE: {
			const { dayIndex, value, id, key } = action.payload
			//creo una copia "Profunda" de array de objetos
			const copySchedule: IDay[] = JSON.parse(JSON.stringify(state.schedule))
			const findIndexHotel = copySchedule[dayIndex].overnight.hotels.findIndex(
				(el) => el._id === id
			)
			// if (findIndexHotel === -1) return { ...state }
			const overnightHotel =
				copySchedule[dayIndex].overnight.hotels[findIndexHotel]
			overnightHotel.price[0][key] = value
			return {
				...state,
				schedule: copySchedule
			}
		}
		case UPDATE_RESTAURANT_VENUE: {
			const { value, dayIndex, typeMeal, restaurantId, keyVenue } =
				action.payload
			//creo una copia "Profunda" de array de objetos
			const copySchedule: IDay[] = JSON.parse(JSON.stringify(state.schedule))
			const restaurants: IRestaurant[] =
				copySchedule[dayIndex][typeMeal].restaurants
			const restaurant = restaurants.find(
				(el) => el._id === restaurantId
			) as IRestaurant
			if (restaurant.venue_price) {
				restaurant.venue_price[keyVenue] = value
			} else {
				restaurant.venue_price = {}
				restaurant.venue_price[keyVenue] = value
			}
			return {
				...state,
				schedule: copySchedule
			}
		}

		case UPDATE_RESTAURANT_ENTERTAIMENT: {
			const {
				value,
				dayIndex,
				typeMeal,
				idRestaurant,
				idEntertaiment,
				keyEntertainmentPrice
			} = action.payload
			//creo una copia "Profunda" de array de objetos
			const copySchedule: IDay[] = JSON.parse(JSON.stringify(state.schedule))
			const restaurants: IRestaurant[] =
				copySchedule[dayIndex][typeMeal].restaurants
			const restaurant = restaurants.find(
				(el) => el._id === idRestaurant
			) as IRestaurant
			const entertainment = restaurant.entertainment?.find(
				(el) => el._id === idEntertaiment
			) as IEntertainment
			if (entertainment.price) {
				entertainment.price[keyEntertainmentPrice] = value
			} else {
				entertainment.price = {} as IEntertainmentPrice
				entertainment.price[keyEntertainmentPrice] = value
			}
			return {
				...state,
				schedule: copySchedule
			}
		}
		case UPDATE_GIFT: {
			const { idGift, keyGift, value } = action.payload
			//creo una copia "Profunda" de array de objetos
			const copyGifts: IGift[] = JSON.parse(JSON.stringify(state.gifts))
			const gift = copyGifts.find((el) => el._id === idGift) as IGift
			gift[keyGift] = value
			return {
				...state,
				gifts: copyGifts
			}
		}
		case UPDATE_GIFT_COST: {
			const { value } = action.payload
			return {
				...state,
				giftCost: value
			}
		}
		case UPDATE_MEETING: {
			const { dayIndex, typeMeeting, idMeeting, keyMeeting, value } =
				action.payload
			//creo una copia "Profunda" de array de objetos
			const copySchedule: IDay[] = JSON.parse(JSON.stringify(state.schedule))
			const meetings = copySchedule[dayIndex][typeMeeting].meetings
			const meeting = meetings.find((el) => el._id === idMeeting) as IMeeting
			meeting[keyMeeting] = value
			return {
				...state,
				schedule: copySchedule
			}
		}
		case UPDATE_HOTEL_PRICE: {
			const { value, idHotel, keyHotelPrice } = action.payload
			//creo una copia "Profunda" de array de objetos
			const copyHotels: IHotel[] = JSON.parse(JSON.stringify(state.hotels))
			const hotel = copyHotels.find((el) => el._id === idHotel)
			if (hotel) {
				hotel.price[0][keyHotelPrice] = value
			}
			return {
				...state,
				hotels: copyHotels,
				selectedHotel: hotel as IHotel
			}
		}
		case UPDATE_ASSISTANCE_TRANSFERS_ITINERARY: {
			const { dayIndex, key, value } = action.payload
			//creo una copia "Profunda" de array de objetos
			const copySchedule: IDay[] = JSON.parse(JSON.stringify(state.schedule))
			const transfers = copySchedule[dayIndex].itinerary.itinerary
			for (let i = 0; i < transfers.length; i++) {
				transfers[i][key] = value
			}
			return {
				...state,
				schedule: copySchedule
			}
		}
		case UPDATE_TRANSFERS_ITINERARY: {
			const { dayIndex, idTransfer, typeUpdate, serviceKey, value } =
				action.payload
			//creo una copia "Profunda" de array de objetos
			const copySchedule: IDay[] = JSON.parse(JSON.stringify(state.schedule))
			const transfersItinerary = copySchedule[dayIndex].itinerary.itinerary
			if (typeUpdate === 'priceTransfer') {
				transfersItinerary.forEach((el) => {
					if (el._id === idTransfer && el.selectedService === serviceKey) {
						el[serviceKey] = value
					}
					return el
				})
				return {
					...state,
					schedule: copySchedule
				}
			}
			if (typeUpdate === 'transfer') {
				const transfer = transfersItinerary.find(
					(el) => el._id === idTransfer && el.selectedService === serviceKey
				)
				const indexTransfer = transfersItinerary.findIndex(
					(el) => el._id === idTransfer && el.selectedService === serviceKey
				)
				const transfers: any = transfersItinerary.map((el: any) => {
					if (el?._id === transfer?._id && el.selectedService === serviceKey) {
						el = []
					}
					return el
				})
				const updateTransfer = []
				for (let i = 0; i < value; i++) {
					updateTransfer.push(transfer)
				}
				transfers[indexTransfer] = updateTransfer
				copySchedule[dayIndex].itinerary.itinerary = transfers.flat(2)
				return {
					...state,
					schedule: copySchedule
				}
			}
			return {
				...state,
				schedule: copySchedule
			}
		}
		case UPDATE_MORNING_ACTIVITY_ITINERARY: {
			const { value, dayIndex, id, key } = action.payload
			const copySchedule: IDay[] = JSON.parse(JSON.stringify(state.schedule))
			const copyActivities = copySchedule[
				dayIndex
			].itinerary.morningActivity.events.map((el) => {
				if (el._id === id) {
					el[key] = value
				}
				return el
			})
			copySchedule[dayIndex].itinerary.morningActivity.events = copyActivities
			return {
				...state,
				schedule: copySchedule
			}
		}
		case UPDATE_LUNCH_RESTAURANT_ITINERARY: {
			const { value, dayIndex, id, key } = action.payload
			const copySchedule: IDay[] = JSON.parse(JSON.stringify(state.schedule))
			const copyRestaurants = copySchedule[
				dayIndex
			].itinerary.lunch.restaurants.map((el) => {
				if (el._id === id) {
					el[key] = value
				}
				return el
			})
			copySchedule[dayIndex].itinerary.lunch.restaurants = copyRestaurants
			return {
				...state,
				schedule: copySchedule
			}
		}
		case UPDATE_AFTERNOON_ACTIVITY_ITINERARY: {
			const { value, dayIndex, id, key } = action.payload
			const copySchedule: IDay[] = JSON.parse(JSON.stringify(state.schedule))
			const copyActivities = copySchedule[
				dayIndex
			].itinerary.afternoonActivity.events.map((el) => {
				if (el._id === id) {
					el[key] = value
				}
				return el
			})
			copySchedule[dayIndex].itinerary.afternoonActivity.events = copyActivities
			return {
				...state,
				schedule: copySchedule
			}
		}
		case UPDATE_DINNER_RESTAURANT_ITINERARY: {
			const { value, dayIndex, id, key } = action.payload
			const copySchedule: IDay[] = JSON.parse(JSON.stringify(state.schedule))
			const copyRestaurants = copySchedule[
				dayIndex
			].itinerary.dinner.restaurants.map((el) => {
				if (el._id === id) {
					el[key] = value
				}
				return el
			})
			copySchedule[dayIndex].itinerary.dinner.restaurants = copyRestaurants
			return {
				...state,
				schedule: copySchedule
			}
		}
		default:
			return state
	}
}
