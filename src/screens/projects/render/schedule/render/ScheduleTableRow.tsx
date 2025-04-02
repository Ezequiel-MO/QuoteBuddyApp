import { FC } from 'react'
import { DayEvents } from './DayEvents'
import { DayMeals } from './DayMeals'
import { IDay } from '@interfaces/project'

interface ScheduleTableRowProps {
	day: IDay
	index: number
	handleDeleteEvent: (
		dayIndex: number,
		timeOfEvent: string,
		eventId: string
	) => void
}

export const ScheduleTableRow: FC<ScheduleTableRowProps> = ({
	day,
	index,
	handleDeleteEvent
}) => {
	return (
		<div className="py-4 px-2 hover:bg-gray-800/50 transition duration-150 ease-in-out">
			<div className="grid grid-cols-5 gap-4">
				{/* Date Column */}
				<div className="flex items-center justify-center">
					<div className="px-4 py-3 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg shadow-md border border-gray-600 w-full text-center">
						<p className="text-white-0 font-medium">{day.date}</p>
					</div>
				</div>

				{/* Morning Events */}
				<div className="p-2">
					<DayEvents
						day={day}
						event="morningEvents"
						handleDeleteEvent={handleDeleteEvent}
						dayIndex={index}
					/>
				</div>

				{/* Lunch */}
				<div className="p-2">
					<DayMeals
						day={day}
						event="lunch"
						handleDeleteEvent={handleDeleteEvent}
						dayIndex={index}
					/>
				</div>

				{/* Afternoon Events */}
				<div className="p-2">
					<DayEvents
						day={day}
						event="afternoonEvents"
						handleDeleteEvent={handleDeleteEvent}
						dayIndex={index}
					/>
				</div>

				{/* Dinner */}
				<div className="p-2">
					<DayMeals
						day={day}
						event="dinner"
						handleDeleteEvent={handleDeleteEvent}
						dayIndex={index}
					/>
				</div>
			</div>
		</div>
	)
}
