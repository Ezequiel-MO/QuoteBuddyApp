import * as fakeData from '../constants/fakeData'

interface Props {
	day: fakeData.DaySchedule
}

function MeetingCard({ day }: Props) {
	return (
		<div>
			{' '}
			{['MORNING MEETING', 'AFTERNOON MEETING', 'FULLDAY MEETING'].map(
				(meetingType) => {
					const meetingDetails = day[
						meetingType as keyof fakeData.DaySchedule
					] as fakeData.MEETING[] | undefined
					if (meetingDetails && meetingDetails.length > 0) {
						return (
							<div
								key={meetingType}
								className="mt-4 bg-gray-700 p-4 rounded-md shadow-md"
							>
								<div className="text-sm font-bold text-white mb-4">
									{meetingType.replace('_', ' ')}
								</div>
								{meetingDetails.map((meeting, index) => (
									<div key={`${meetingType}-${index}`} className="mt-4">
										<div className="text-lg font-medium text-gray-300 mb-4">
											{meeting.hotelName}
										</div>
										<div className="grid grid-cols-12 gap-4 text-sm text-gray-300">
											<div className="col-span-3 font-bold">Description</div>
											<div className="col-span-2 font-bold text-right">
												Units
											</div>
											<div className="col-span-2 font-bold text-right">
												Cost/Unit
											</div>
											<div className="col-span-5 font-bold text-right">
												Total Cost
											</div>

											<div className="col-span-3">Room Capacity</div>
											<div className="col-span-2 text-right">
												{meeting.roomCapacity}
											</div>
											<div className="col-span-2 text-right">-</div>
											<div className="col-span-5 text-right">-</div>

											<div className="col-span-3">Half-Day Rate</div>
											<div className="col-span-2 text-right">-</div>
											<div className="col-span-2 text-right">
												€{meeting.HDRate}
											</div>
											<div className="col-span-5 text-right">
												€{meeting.HDRate * meeting.roomCapacity}
											</div>

											<div className="col-span-3">Full-Day Rate</div>
											<div className="col-span-2 text-right">-</div>
											<div className="col-span-2 text-right">
												€{meeting.FDRate}
											</div>
											<div className="col-span-5 text-right">
												€{meeting.FDRate * meeting.roomCapacity}
											</div>

											<div className="col-span-3">Half-Day DDR</div>
											<div className="col-span-2 text-right">-</div>
											<div className="col-span-2 text-right">
												€{meeting.HDDDR}
											</div>
											<div className="col-span-5 text-right">
												€{meeting.HDDDR * meeting.roomCapacity}
											</div>

											<div className="col-span-3">Full-Day DDR</div>
											<div className="col-span-2 text-right">-</div>
											<div className="col-span-2 text-right">
												€{meeting.FDDDR}
											</div>
											<div className="col-span-5 text-right">
												€{meeting.FDDDR * meeting.roomCapacity}
											</div>

											<div className="col-span-3">Coffee Breaks</div>
											<div className="col-span-2 text-right">
												{meeting.coffeeBreakUnits}
											</div>
											<div className="col-span-2 text-right">
												€{meeting.coffeeBreakPrice}
											</div>
											<div className="col-span-5 text-right">
												€{meeting.coffeeBreakUnits * meeting.coffeeBreakPrice}
											</div>

											<div className="col-span-3">Working Lunch</div>
											<div className="col-span-2 text-right">
												{meeting.workingLunchUnits}
											</div>
											<div className="col-span-2 text-right">
												€{meeting.workingLunchPrice}
											</div>
											<div className="col-span-5 text-right">
												€{meeting.workingLunchUnits * meeting.workingLunchPrice}
											</div>

											<div className="col-span-3">A/V Package</div>
											<div className="col-span-2 text-right">-</div>
											<div className="col-span-2 text-right">
												€{meeting.aavvPackage}
											</div>
											<div className="col-span-5 text-right">
												€{meeting.aavvPackage}
											</div>

											<div className="col-span-3">Hotel Dinner</div>
											<div className="col-span-2 text-right">
												{meeting.hotelDinnerUnits}
											</div>
											<div className="col-span-2 text-right">
												€{meeting.hotelDinnerPrice}
											</div>
											<div className="col-span-5 text-right">
												€{meeting.hotelDinnerUnits * meeting.hotelDinnerPrice}
											</div>

											<div className="col-span-12 font-bold text-white mt-4 text-right">
												Total Meeting Cost: €
												{meeting.HDRate * meeting.roomCapacity +
													meeting.FDRate * meeting.roomCapacity +
													meeting.HDDDR * meeting.roomCapacity +
													meeting.FDDDR * meeting.roomCapacity +
													meeting.coffeeBreakUnits * meeting.coffeeBreakPrice +
													meeting.workingLunchUnits *
														meeting.workingLunchPrice +
													meeting.aavvPackage +
													meeting.hotelDinnerUnits * meeting.hotelDinnerPrice}
											</div>
										</div>
									</div>
								))}
							</div>
						)
					}
					return null
				}
			)}
		</div>
	)
}

export default MeetingCard
