import { IHotel } from '@interfaces/hotel'

export const calculateHotelCost = (hotel: IHotel, nights: number) => {
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
