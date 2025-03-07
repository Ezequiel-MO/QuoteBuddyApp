import { MeetingBreakdownRow } from '.'
// import { useBudget, useFindMeetingByHotel } from '../../../../../hooks'
import { IMeeting } from '../../../../../interfaces'
import { Icon } from '@iconify/react'

interface Props {
	pax: number
	type: 'morning' | 'afternoon' | 'full_day'
	meetings: IMeeting[]
	isOpen: boolean
	date: string
}

export const MeetingBreakdownRows = ({
	pax,
	type,
	meetings,
	isOpen,
	date
}: Props) => {
	const meeting = meetings[0]
	return (
		<tr>
			<td colSpan={6} className="p-0 bg-transparent">
				<div
					className={`transition-all duration-500 ease-in-out overflow-hidden ${
						isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
					}`}
				>
					<table className="w-full">
						<tbody className="w-full bg-cyan-800 relative">
							<tr>
								<div
									className="absolute inset-0 flex items-center justify-center opacity-35 dark:opacity-20 z-0"
									style={{ pointerEvents: 'none' }}
								>
									<Icon icon="ph:handshake-thin" width={250} />
								</div>
								<table className="w-full">
									<thead className="text-white-100 bg-zinc-700">
										<tr>
											<th align="center">Description</th>
											<th align="center">Nr. Units</th>
											<th align="center"></th>
											<th align="center">Unit Cost</th>
											<th align="center">Total Cost</th>
										</tr>
									</thead>
									<tbody className="text-white-0 bg-cyan-800 ">
										{type === 'full_day' ? (
											<>
												<MeetingBreakdownRow
													units={1}
													title="Full Day Rental Rate"
													rate={meeting?.FDRate || 0}
													keyMeetingUnit="unit"
													keyMeetingPrice="FDRate"
													date={date}
													idMeeting={meeting._id}
													type={type}
												/>
												<MeetingBreakdownRow
													units={1}
													title="Half Day Rental Rate"
													rate={meeting?.HDRate || 0}
													keyMeetingUnit="unit"
													keyMeetingPrice="FDRate"
													date={date}
													idMeeting={meeting._id}
													type={type}
												/>
												<MeetingBreakdownRow
													units={pax}
													title="Full Day Delegate Rate"
													rate={meeting?.FDDDR || 0}
													keyMeetingUnit="unit"
													keyMeetingPrice="FDDDR"
													date={date}
													idMeeting={meeting._id}
													type={type}
												/>
											</>
										) : (
											<>
												<MeetingBreakdownRow
													units={1}
													title="Full Day Rental Rate"
													rate={meeting?.FDRate || 0}
													keyMeetingUnit="unit"
													keyMeetingPrice="FDRate"
													date={date}
													idMeeting={meeting._id}
													type={type}
												/>
												<MeetingBreakdownRow
													units={1}
													title="Half Day Rental Rate"
													rate={meeting?.HDRate || 0}
													keyMeetingUnit="unit"
													keyMeetingPrice="HDRate"
													date={date}
													idMeeting={meeting._id}
													type={type}
												/>
												<MeetingBreakdownRow
													units={pax}
													title="Half Day Delegate Rate"
													rate={meeting?.HDDDR || 0}
													keyMeetingUnit="unit"
													keyMeetingPrice="HDDDR"
													date={date}
													idMeeting={meeting._id}
													type={type}
												/>
											</>
										)}
										<MeetingBreakdownRow
											units={meeting?.coffeeBreakUnits || 0}
											title="Coffee Breaks"
											rate={meeting?.coffeeBreakPrice || 0}
											keyMeetingUnit="coffeeBreakUnits"
											keyMeetingPrice="coffeeBreakPrice"
											date={date}
											idMeeting={meeting._id}
											type={type}
										/>
										<MeetingBreakdownRow
											units={meeting?.workingLunchUnits || 0}
											title="Working Lunch"
											rate={meeting?.workingLunchPrice || 0}
											keyMeetingUnit="workingLunchUnits"
											keyMeetingPrice="workingLunchPrice"
											date={date}
											idMeeting={meeting._id}
											type={type}
										/>
										<MeetingBreakdownRow
											units={meeting?.hotelDinnerUnits || 0}
											title={`Dinner @Hotel ${meeting.hotelName}`}
											rate={meeting?.hotelDinnerPrice || 0}
											keyMeetingUnit="hotelDinnerUnits"
											keyMeetingPrice="hotelDinnerPrice"
											date={date}
											idMeeting={meeting._id}
											type={type}
										/>
										<MeetingBreakdownRow
											units={1}
											title="Audio Visuals Package"
											rate={meeting?.aavvPackage || 0}
											keyMeetingUnit="unit"
											keyMeetingPrice="aavvPackage"
											date={date}
											idMeeting={meeting._id}
											type={type}
										/>
									</tbody>
								</table>
							</tr>
						</tbody>
					</table>
				</div>
			</td>
		</tr>
	)
}
