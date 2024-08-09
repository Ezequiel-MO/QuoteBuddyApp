import * as fakeData from '../constants/fakeData'

interface Props {
	day: fakeData.DaySchedule
	dayIndex: number
}

function TransferOutCard({ day, dayIndex }: Props) {
	return (
		<div>
			{dayIndex === fakeData.SCHEDULE.length - 1 &&
				day['TRANSFER OUT'] &&
				day['TRANSFER OUT'].length > 0 && (
					<div className="mt-4 bg-gray-700 p-4 rounded-md shadow-md">
						<div className="text-sm font-bold text-white mb-4">
							TRANSFER OUT
						</div>
						{day['TRANSFER OUT'].map((transfer, index) => (
							<div key={`transfer-out-${index}`} className="mt-4">
								<div className="grid grid-cols-12 gap-4 text-sm text-gray-300">
									<div className="col-span-3 font-bold">Description</div>
									<div className="col-span-2 font-bold text-right">Units</div>
									<div className="col-span-2 font-bold text-right">
										Cost/Unit
									</div>
									<div className="col-span-5 font-bold text-right">
										Total Cost
									</div>

									<div className="col-span-3">
										Vehicle Type: {transfer.vehicleType}
									</div>
									<div className="col-span-2 text-right">
										{transfer.vehicleCapacity ?? 0}
									</div>
									<div className="col-span-2 text-right">
										€{transfer.vehiclePrice}
									</div>
									<div className="col-span-5 text-right">
										€
										{(transfer.vehiclePrice ?? 0) *
											(transfer.vehicleCapacity ?? 0)}
									</div>

									<div className="col-span-3">Meet & Greet</div>
									<div className="col-span-2 text-right">
										{transfer.meetGreet}
									</div>
									<div className="col-span-2 text-right">
										€{transfer.meetGreetCost}
									</div>
									<div className="col-span-5 text-right">
										€{transfer.meetGreet * transfer.meetGreetCost}
									</div>

									<div className="col-span-3">Assistance</div>
									<div className="col-span-2 text-right">
										{transfer.assistance}
									</div>
									<div className="col-span-2 text-right">
										€{transfer.assistanceCost}
									</div>
									<div className="col-span-5 text-right">
										€{transfer.assistance * transfer.assistanceCost}
									</div>

									<div className="col-span-12 font-bold text-white mt-4 text-right">
										Total Transfer Out Cost: €
										{(transfer.vehiclePrice ?? 0) *
											(transfer.vehicleCapacity ?? 0) +
											transfer.meetGreet * transfer.meetGreetCost +
											transfer.assistance * transfer.assistanceCost}
									</div>
								</div>
							</div>
						))}
					</div>
				)}
		</div>
	)
}

export default TransferOutCard
