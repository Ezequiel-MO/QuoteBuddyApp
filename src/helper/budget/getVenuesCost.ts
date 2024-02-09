import { IRestaurant } from '@interfaces/restaurant'

export const getVenuesCost = (venue: IRestaurant) => {
	let totalCost = 0

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
	} = venue?.venue_price || {}

	totalCost =
		rental +
		cocktail_units * cocktail_price +
		catering_units * catering_price +
		staff_units * staff_menu_price +
		audiovisuals +
		cleaning +
		security +
		entertainment

	return totalCost
}
