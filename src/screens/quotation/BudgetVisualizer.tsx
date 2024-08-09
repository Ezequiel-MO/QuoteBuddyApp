import { Button } from '@components/atoms'
import { useQuotation } from './context/QuotationContext'
import * as fakeData from './constants/fakeData'
import { Icon } from '@iconify/react'

const BudgetVisualizer = () => {
	const { state, dispatch } = useQuotation()

	return (
		<div
			className={`flex flex-col items-left justify-start fixed right-0 top-0 h-full bg-gray-800 border-l shadow-lg transition-transform duration-300 ${
				state.isBudgetVisualizerOpen ? 'translate-x-0' : 'translate-x-full'
			} w-2/4 z-50`}
		>
			<Button
				icon="mdi:hide"
				widthIcon={24}
				handleClick={() => dispatch({ type: 'TOGGLE_BUDGET_VISUALIZER' })}
				type="button"
				newClass="flex items-center uppercase px-3 py-1 text-white bg-gray-800 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-gray-900 active:scale-95"
			>
				Hide
			</Button>
			<div className="p-4 h-full overflow-y-auto hide-scrollbar">
				<h1 className="text-2xl font-bold text-white">Budget Visualizer</h1>

				{/* Accommodation Category */}
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
										<div className="col-span-2 font-bold text-right">
											Nr. Units
										</div>
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
											{hotel.price[0].DoubleRoomNr *
												hotel.price[0].DoubleRoomPrice}
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

				{/* Day Categories */}
				{fakeData.SCHEDULE.map((day, dayIndex) => (
					<div key={dayIndex} className="mt-6">
						<h2 className="text-xl font-semibold text-blue-400">
							{fakeData.DAYS[dayIndex]}
						</h2>

						{/* Activity Sections */}
						{Object.entries(day).map(([activity, details]) => {
							if (
								activity === 'ACCOMMODATION' ||
								(details as any[]).length === 0
							)
								return null

							return (
								<div
									key={activity}
									className="mt-4 bg-gray-700 p-4 rounded-md shadow-md"
								>
									<div className="text-sm font-bold text-white mb-4">
										{activity}
									</div>
									<div className="grid grid-cols-12 gap-4 text-white mb-2">
										<div className="col-span-6 text-sm font-bold"></div>
										<div className="col-span-2 text-sm font-bold text-right">
											Pax
										</div>
										<div className="col-span-2 text-sm font-bold text-right">
											Price
										</div>
										<div className="col-span-2 text-sm font-bold text-right">
											Total
										</div>
									</div>
									{(details as fakeData.Activity[]).map((detail, index) => (
										<div
											key={index}
											className="grid grid-cols-12 gap-4 items-center mt-2"
										>
											<div className="col-span-6 text-lg font-medium text-gray-300">
												{detail.name}
											</div>
											<div className="col-span-2 text-lg text-gray-300 text-right">
												x {detail.nrPax}
											</div>
											<div className="col-span-2 text-lg text-orange-600 text-right">
												€{detail.price}
											</div>
											<div className="col-span-2 text-lg text-white text-right">
												€{detail.total}
											</div>
											<div className="col-span-12 flex items-center justify-start">
												<Icon
													icon="mdi:plus-circle-outline"
													className="text-gray-400 cursor-pointer hover:text-gray-200"
													onClick={() => {
														/* Placeholder for add transfer logic */
													}}
												/>
												<span className="ml-2 text-sm text-gray-400">
													Add Transfer
												</span>
											</div>
										</div>
									))}
								</div>
							)
						})}
					</div>
				))}
			</div>
		</div>
	)
}

export default BudgetVisualizer
