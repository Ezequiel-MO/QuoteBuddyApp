import { IBudget } from '@interfaces/budget'
import { useAppDispatch } from 'src/hooks/redux/redux'
import { AppThunk } from 'src/redux/store'
import {
	SET_BUDGET,
	SET_BUDGET_SELECTED_HOTEL_COST
} from '../CurrentProjectSlice'
import { IHotel } from '@interfaces/hotel'
import { calculateHotelCost } from '../helpers/budgetCost'
import { ITransfer, ServiceKey } from '@interfaces/transfer'
import {
	IProgramTransfersPayload,
	TransferEntry,
	UpdateOvernightCostPayload,
	UpdateProgramActivitiesCostPayload,
	UpdateProgramMealsCostPayload,
	UpdateProgramMeetingsCostPayload,
	UpdateProgramShowsCostPayload
} from '../types'
import { IMeeting } from '@interfaces/meeting'

export const useBudgetActions = () => {
	const dispatch = useAppDispatch()

	const setBudget = (budget: Partial<IBudget>) =>
		dispatch(setBudgetThunk(budget))

	const setBudgetSelectedHotel = (hotel: IHotel) =>
		dispatch(setBudgetSelectedHotelThunk(hotel))

	const setBudgetSelectedHotelCost = (selectedHotel: IHotel, nights: number) =>
		dispatch(setBudgetSelectedHotelCostThunk(selectedHotel, nights))

	const updateBudgetTransfersInCost = (transfer_in: ITransfer[]) =>
		dispatch(updateBudgetTransfersInCostThunk(transfer_in))

	const updateBudgetTransfersOutCost = (transfer_out: ITransfer[]) =>
		dispatch(updateBudgetTransfersOutCostThunk(transfer_out))

	const updateBudgetProgramTransfersCost = (
		programTransfers: IProgramTransfersPayload
	) => dispatch(updateProgramTransfersCostThunk(programTransfers))

	const updateBudgetProgramMealsCost = (
		programMeals: UpdateProgramMealsCostPayload
	) => dispatch(updateProgramMealsCostThunk(programMeals))

	const updateBudgetProgramActivitiesCost = (
		payload: UpdateProgramActivitiesCostPayload
	) => {
		dispatch(updateProgramActivitiesCostThunk(payload))
	}

	const updateBudgetProgramMeetingsCost = (
		payload: UpdateProgramMeetingsCostPayload
	) => {
		dispatch(updateProgramMeetingsCostThunk(payload))
	}

	const updateBudgetProgramShowCost = (
		payload: UpdateProgramShowsCostPayload
	) => dispatch(updateProgramShowsCostThunk(payload))

	const updateBudgetOvernightCost = (payload: UpdateOvernightCostPayload) =>
		dispatch(updateOvernightCostThunk(payload))

	return {
		setBudget,
		setBudgetSelectedHotel,
		setBudgetSelectedHotelCost,
		updateBudgetTransfersInCost,
		updateBudgetTransfersOutCost,
		updateBudgetProgramTransfersCost,
		updateBudgetProgramMealsCost,
		updateBudgetProgramActivitiesCost,
		updateBudgetProgramMeetingsCost,
		updateBudgetProgramShowCost,
		updateBudgetOvernightCost
	}
}

const setBudgetThunk =
	(newBudgetPartial: Partial<IBudget>): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const existingBudget: IBudget = state.currentProject.budget

		const finalBudget: IBudget = {
			...existingBudget,
			hotels: newBudgetPartial.hotels ?? existingBudget.hotels ?? [],
			schedule: newBudgetPartial.schedule ?? existingBudget.schedule ?? [],
			nrPax: newBudgetPartial.nrPax ?? existingBudget.nrPax ?? 0,
			gifts: newBudgetPartial.gifts ?? existingBudget.gifts ?? [],
			programTransfers:
				newBudgetPartial.programTransfers ??
				existingBudget.programTransfers ??
				[],
			programTransfersCost:
				newBudgetPartial.programTransfersCost ??
				existingBudget.programTransfersCost ??
				0
		}

		dispatch(SET_BUDGET(finalBudget, 'update budget'))
	}

const setBudgetSelectedHotelThunk =
	(hotel: IHotel): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const existingBudget: IBudget = state.currentProject.budget

		const finalBudget: IBudget = {
			...existingBudget,
			selectedHotel: hotel
		}

		dispatch(SET_BUDGET(finalBudget, 'update selected hotel'))
	}

const setBudgetSelectedHotelCostThunk =
	(selectedHotel: IHotel, nights: number): AppThunk =>
	(dispatch) => {
		const { price = [] } = selectedHotel

		if (price.length === 0) {
			dispatch(SET_BUDGET_SELECTED_HOTEL_COST(0))
			return
		}

		const cost: number = calculateHotelCost(selectedHotel, nights)
		dispatch(SET_BUDGET_SELECTED_HOTEL_COST(cost))
	}

const updateBudgetTransfersInCostThunk =
	(transfer_in: ITransfer[]): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const existingBudget: IBudget = state.currentProject.budget

		let cost: number = 0

		cost = transfer_in?.reduce((acc, item) => acc + item.transfer_in || 0, 0)

		if (transfer_in?.length > 0) {
			const firstItem = transfer_in[0]
			cost +=
				(firstItem?.assistance || 0) * (firstItem?.assistanceCost || 0) +
				(firstItem?.meetGreet || 0) * (firstItem?.meetGreetCost || 0)
		}

		const finalBudget: IBudget = {
			...existingBudget,
			transfersInCost: cost
		}

		dispatch(SET_BUDGET(finalBudget, 'Cost of Transfers In'))
	}

const updateBudgetTransfersOutCostThunk =
	(transfer_out: ITransfer[]): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const existingBudget: IBudget = state.currentProject.budget

		let cost: number = 0

		cost = transfer_out?.reduce((acc, item) => acc + item.transfer_out || 0, 0)

		if (transfer_out?.length > 0) {
			const firstItem = transfer_out[0]
			cost +=
				(firstItem?.assistance || 0) * (firstItem?.assistanceCost || 0) +
				(firstItem?.meetGreet || 0) * (firstItem?.meetGreetCost || 0)
		}

		const finalBudget: IBudget = {
			...existingBudget,
			transfersOutCost: cost
		}

		dispatch(SET_BUDGET(finalBudget, 'Cost of Transfers Out'))
	}

const updateProgramTransfersCostThunk =
	(programTransfers: IProgramTransfersPayload): AppThunk =>
	(dispatch, getState) => {
		const { date, transfer, count, type } = programTransfers
		const state = getState()
		const existingBudget = state.currentProject.budget

		let totalServiceCost = 0
		let totalAssistanceCost = 0

		const serviceKey = transfer.selectedService as ServiceKey
		const serviceCost = transfer[serviceKey]

		if (typeof serviceCost === 'number') {
			totalServiceCost = serviceCost * count
		} else {
			console.error(
				`The service cost for the service '${transfer.selectedService}' is not a valid number.`
			)
		}

		totalAssistanceCost =
			(transfer.assistance || 0) * (transfer.assistanceCost || 0)

		const updatedTypeTransfers: TransferEntry = {
			transferCost: totalServiceCost,
			assistanceCost: totalAssistanceCost
		}

		const updatedBudget: IBudget = { ...existingBudget }

		if (
			type === 'transfer_morningItinerary' ||
			type === 'transfer_afternoonItinerary'
		) {
			const updatedItineraryTransfers = {
				...updatedBudget.itineraryTransfers,
				[date]: {
					...(updatedBudget.itineraryTransfers[date] || {}),
					[type]: updatedTypeTransfers
				}
			}

			let newItineraryTransfersCost = 0
			Object.values(updatedItineraryTransfers).forEach((dateTransfers) => {
				Object.values(dateTransfers).forEach((transferType: any) => {
					newItineraryTransfersCost +=
						transferType.transferCost + (transferType.assistanceCost || 0)
				})
			})

			updatedBudget.itineraryTransfers = updatedItineraryTransfers
			updatedBudget.itineraryTransfersCost = newItineraryTransfersCost
		} else {
			const updatedProgramTransfers = {
				...updatedBudget.programTransfers,
				[date]: {
					...updatedBudget.programTransfers[date],
					[type]: updatedTypeTransfers
				}
			}

			let newProgramTransfersCost = 0
			Object.values(updatedProgramTransfers).forEach((dateTransfers) => {
				Object.values(dateTransfers).forEach((transferType: any) => {
					newProgramTransfersCost +=
						transferType.transferCost + (transferType.assistanceCost || 0)
				})
			})

			updatedBudget.programTransfers = updatedProgramTransfers
			updatedBudget.programTransfersCost = newProgramTransfersCost
		}

		dispatch(
			SET_BUDGET(updatedBudget, 'Update program or itinerary transfers cost')
		)
	}

const updateProgramMealsCostThunk =
	(programMeals: UpdateProgramMealsCostPayload): AppThunk =>
	(dispatch, getState) => {
		const { date, restaurant, pax, type } = programMeals
		const state = getState()
		const existingBudget = state.currentProject.budget

		const updatedMeals = {
			...existingBudget.meals,
			[date]: {
				...existingBudget.meals?.[date],
				[type]: restaurant
			}
		}

		let totalMealsCost = 0
		let totalVenuesCost = 0

		if (restaurant?.isVenue) {
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

			totalVenuesCost =
				rental +
				cocktail_units * cocktail_price +
				catering_units * catering_price +
				staff_units * staff_menu_price +
				audiovisuals +
				cleaning +
				security +
				entertainment
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

		const updatedBudget: IBudget = {
			...existingBudget,
			meals: updatedMeals,
			mealsCost: restaurant?.isVenue ? totalVenuesCost : totalMealsCost
		}

		dispatch(SET_BUDGET(updatedBudget, 'Update program meals cost'))
	}

const updateProgramActivitiesCostThunk =
	({
		date,
		activity,
		pax,
		type
	}: UpdateProgramActivitiesCostPayload): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const existingBudget = state.currentProject.budget

		const updatedActivities = {
			...existingBudget.activities,
			[date]: {
				...existingBudget.activities?.[date],
				[type]: activity
			}
		}

		const totalActivitiesCost = Object.values(updatedActivities).reduce(
			(acc, day: any) => {
				let cost = 0
				if (day.morning) {
					const morningPax = day.morning.pricePerPerson ? pax : 1
					cost += (day.morning.price || 0) * morningPax
				}
				if (day.afternoon) {
					const afternoonPax = day.afternoon.pricePerPerson ? pax : 1
					cost += (day.afternoon.price || 0) * afternoonPax
				}
				return acc + cost
			},
			0
		)

		const finalBudget: IBudget = {
			...existingBudget,
			activities: updatedActivities,
			activitiesCost: totalActivitiesCost
		}

		dispatch(SET_BUDGET(finalBudget, 'Update program activities cost'))
	}

const updateProgramMeetingsCostThunk =
	({ date, meeting, type, pax }: UpdateProgramMeetingsCostPayload): AppThunk =>
	(dispatch, getState) => {
		if (!meeting) {
			// If no meeting is provided, do nothing or potentially dispatch a no-op.
			return
		}

		const state = getState()
		const existingBudget = state.currentProject.budget

		// Update the meetings object with the new meeting
		const updatedMeetings = {
			...existingBudget.meetings,
			[date]: {
				...existingBudget.meetings?.[date],
				[type]: meeting
			}
		}

		let totalMeetingsCost = 0

		Object.values(updatedMeetings).forEach((day: any) => {
			if (day) {
				Object.entries(day).forEach(([meetingType, meetingDetailsObj]) => {
					const meetingDetails = meetingDetailsObj as IMeeting
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

		const finalBudget: IBudget = {
			...existingBudget,
			meetings: updatedMeetings,
			meetingsCost: totalMeetingsCost
		}

		dispatch(SET_BUDGET(finalBudget, 'Update program meetings cost'))
	}

const updateProgramShowsCostThunk =
	({ date, show, type }: UpdateProgramShowsCostPayload): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const existingBudget = state.currentProject.budget

		// Update shows
		const updatedShows = {
			...existingBudget.shows,
			[date]: {
				...existingBudget.shows[date],
				[type]: show
			}
		}

		let cost = 0
		Object.values(updatedShows).forEach((day: any) => {
			if (day) {
				Object.values(day).forEach((showObj: any) => {
					if (showObj && showObj.price) {
						const {
							aavv = 0,
							artistsFee = 0,
							lighting = 0,
							mealAllowance = 0,
							travelAllowance = 0
						} = showObj.price

						const showCost =
							aavv + artistsFee + lighting + mealAllowance + travelAllowance
						cost += showCost
					}
				})
			}
		})

		const finalBudget: IBudget = {
			...existingBudget,
			shows: updatedShows,
			showsCost: cost
		}

		dispatch(SET_BUDGET(finalBudget, 'Update program shows cost'))
	}

const updateOvernightCostThunk =
	({ date, hotel }: UpdateOvernightCostPayload): AppThunk =>
	(dispatch, getState) => {
		const state = getState()
		const existingBudget = state.currentProject.budget

		const hotelCost = hotel ? calculateHotelCost(hotel, 1) : 0

		const updatedOvernight = {
			...existingBudget.overnight,
			[date]: {
				...existingBudget.overnight[date],
				hotel,
				hotelCost
			}
		}

		const totalCost = Object.values(updatedOvernight).reduce(
			(acc, day: any) => acc + (day.hotelCost || 0),
			0
		)

		const finalBudget: IBudget = {
			...existingBudget,
			overnight: updatedOvernight,
			overnightCost: totalCost
		}

		dispatch(SET_BUDGET(finalBudget, 'Update overnight cost'))
	}
