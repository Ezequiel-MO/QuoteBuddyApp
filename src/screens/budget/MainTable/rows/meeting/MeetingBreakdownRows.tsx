import { MeetingBreakdownRow } from '.'
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
					<div className="mx-4 my-3 bg-purple-900/20 rounded-lg border border-purple-700/30 shadow-inner overflow-hidden backdrop-filter backdrop-blur-sm relative">
						{/* Background Icon */}
						<div
							className="absolute inset-0 flex items-center justify-center opacity-10"
							style={{ pointerEvents: 'none' }}
							aria-hidden="true"
						>
							<Icon icon="ph:handshake-thin" width={250} />
						</div>

						<table className="w-full">
							<thead className="bg-purple-900/40 text-white-0">
								<tr>
									<th className="py-3 px-6 text-left font-semibold tracking-wide">
										Description
									</th>
									<th className="py-3 px-4 text-center font-semibold tracking-wide">
										Nr. Units
									</th>
									<th className="py-3 px-4 text-center"></th>
									<th className="py-3 px-4 text-center font-semibold tracking-wide">
										Unit Cost
									</th>
									<th className="py-3 px-6 text-center font-semibold tracking-wide">
										Total Cost
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-purple-700/30 text-gray-300">
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
					</div>
				</div>
			</td>
		</tr>
	)
}
