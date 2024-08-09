import * as fakeData from '../constants/fakeData'

function AccommodationCard() {
	return (
		<div className="mt-6">
			<h2 className="text-xl font-semibold text-blue-400">ACCOMMODATION</h2>
			{fakeData.SCHEDULE.filter((day) => day.ACCOMMODATION).map(
				(day, dayIndex) =>
					day.ACCOMMODATION?.map((hotel, index) => (
						<div
							key={`${dayIndex}-hotel-${index}`}
							className="mt-4 bg-gray-700 p-4 rounded-md shadow-md"
						>
							<div className="text-lg font-medium text-gray-300 mb-4">
								{hotel.name}
							</div>
							<div className="grid grid-cols-12 gap-4 text-sm text-gray-300">
								{/* Header Row */}
								<div className="col-span-3 font-bold">Description</div>
								<div className="col-span-2 font-bold text-right">Nr. Units</div>
								<div className="col-span-2 font-bold text-right">
									Nr. of Nights
								</div>
								<div className="col-span-2 font-bold text-right">
									Cost/Room/Night
								</div>
								<div className="col-span-3 font-bold text-right">
									Total Cost
								</div>

								{/* Double Room Single Use */}
								<div className="col-span-3">Double Room Single Use</div>
								<div className="col-span-2 text-right">
									{hotel.price[0].DUInr}
								</div>
								<div className="col-span-2 text-right">1</div>
								<div className="col-span-2 text-right">
									€{hotel.price[0].DUIprice}
								</div>
								<div className="col-span-3 text-right">
									€{hotel.price[0].DUInr * hotel.price[0].DUIprice}
								</div>

								{/* Double Room/Twin Room */}
								<div className="col-span-3">Double Room/Twin Room</div>
								<div className="col-span-2 text-right">
									{hotel.price[0].DoubleRoomNr}
								</div>
								<div className="col-span-2 text-right">1</div>
								<div className="col-span-2 text-right">
									€{hotel.price[0].DoubleRoomPrice}
								</div>
								<div className="col-span-3 text-right">
									€
									{hotel.price[0].DoubleRoomNr * hotel.price[0].DoubleRoomPrice}
								</div>

								{/* City Tax */}
								<div className="col-span-3">City Tax</div>
								<div className="col-span-2 text-right">-</div>
								<div className="col-span-2 text-right">1</div>
								<div className="col-span-2 text-right">
									€{hotel.price[0].DailyTax}
								</div>
								<div className="col-span-3 text-right">
									€{hotel.price[0].DailyTax}
								</div>

								{/* Breakfast */}
								<div className="col-span-3">Breakfast</div>
								<div className="col-span-2 text-right">-</div>
								<div className="col-span-2 text-right">1</div>
								<div className="col-span-2 text-right">
									€{hotel.price[0].breakfast}
								</div>
								<div className="col-span-3 text-right">
									€{hotel.price[0].breakfast}
								</div>

								{/* Total Cost */}
								<div className="col-span-12 font-bold text-white mt-4 text-right">
									Total Accommodation Cost: €
									{hotel.price[0].DUInr * hotel.price[0].DUIprice +
										hotel.price[0].DoubleRoomNr *
											hotel.price[0].DoubleRoomPrice +
										hotel.price[0].DailyTax +
										hotel.price[0].breakfast}
								</div>
							</div>
						</div>
					))
			)}
		</div>
	)
}

export default AccommodationCard
