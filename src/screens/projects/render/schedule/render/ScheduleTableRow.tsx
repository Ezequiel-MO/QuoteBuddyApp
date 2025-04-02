// src/screens/projects/render/schedule/render/ScheduleTableRow.tsx
import { FC, useMemo } from 'react'
import { format, addDays, parse } from 'date-fns'
import { Icon } from '@iconify/react'
import { DayEvents } from './DayEvents'
import { DayMeals } from './DayMeals'
import { IDay } from '@interfaces/project'
import { useCurrentProject } from 'src/hooks'

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
	const { currentProject } = useCurrentProject()

	// Calculate the actual date from arrivalDay and day index
	const dateInfo = useMemo(() => {
		if (!currentProject.arrivalDay)
			return { formattedDate: null, dayOfWeek: null }

		try {
			// Parse the arrival date (assuming format 'YYYY-MM-DD')
			const arrivalDate = parse(
				currentProject.arrivalDay,
				'yyyy-MM-dd',
				new Date()
			)
			// Add the day index to get the current day's date
			const currentDate = addDays(arrivalDate, index)

			return {
				// Format the date as "MMM dd" (e.g., "Jan 15")
				formattedDate: format(currentDate, 'MMM dd'),
				// Get the day of the week (e.g., "Monday")
				dayOfWeek: format(currentDate, 'EEEE')
			}
		} catch (error) {
			console.error('Error calculating date:', error)
			return { formattedDate: null, dayOfWeek: null }
		}
	}, [currentProject.arrivalDay, index])

	// Determine if this is arrival or departure day
	const isArrivalDay = index === 0
	const isDepartureDay =
		currentProject.schedule && index === currentProject.schedule.length - 1

	return (
		<div className="py-4 px-2 hover:bg-gray-800/50 transition duration-150 ease-in-out">
			<div className="grid grid-cols-5 gap-4">
				{/* Enhanced Date Column with Day of Week */}
				<div className="flex items-center justify-center">
					<div
						className="w-36 py-3 px-4 relative bg-gradient-to-br 
                        from-gray-800 to-gray-700 rounded-lg shadow-md 
                        border border-gray-600 transform transition-all duration-300
                        hover:scale-105 hover:shadow-lg hover:border-[#ea5933]"
					>
						{/* Day label with hover effect */}
						<p className="text-white-0 font-medium mb-1 text-center text-sm uppercase tracking-wide">
							{isArrivalDay
								? 'Arrival Day'
								: isDepartureDay
								? 'Departure Day'
								: `Day ${index}`}
						</p>

						{/* Date display with highlighted styling */}
						{dateInfo.formattedDate && (
							<div className="flex justify-center items-center">
								<span className="text-[#ea5933] font-bold text-lg tracking-wide">
									{dateInfo.formattedDate}
								</span>
							</div>
						)}

						{/* Day of Week */}
						{dateInfo.dayOfWeek && (
							<p className="text-gray-300 text-xs text-center mt-1 font-medium">
								{dateInfo.dayOfWeek}
							</p>
						)}

						{/* Indicator icon based on day type */}
						<div className="absolute -right-2 -top-2">
							{isArrivalDay && (
								<span className="bg-green-900 text-green-100 p-1 rounded-full flex items-center justify-center w-6 h-6">
									<Icon icon="mdi:airplane-landing" className="w-4 h-4" />
								</span>
							)}
							{isDepartureDay && (
								<span className="bg-blue-900 text-blue-100 p-1 rounded-full flex items-center justify-center w-6 h-6">
									<Icon icon="mdi:airplane-takeoff" className="w-4 h-4" />
								</span>
							)}
							{!isArrivalDay && !isDepartureDay && (
								<span className="bg-gray-700 text-gray-300 p-1 rounded-full flex items-center justify-center w-6 h-6">
									<Icon icon="mdi:calendar-today" className="w-4 h-4" />
								</span>
							)}
						</div>
					</div>
				</div>

				{/* Rest of the components remain the same */}
				<div className="p-2">
					<DayEvents
						day={day}
						event="morningEvents"
						handleDeleteEvent={handleDeleteEvent}
						dayIndex={index}
					/>
				</div>

				<div className="p-2">
					<DayMeals
						day={day}
						event="lunch"
						handleDeleteEvent={handleDeleteEvent}
						dayIndex={index}
					/>
				</div>

				<div className="p-2">
					<DayEvents
						day={day}
						event="afternoonEvents"
						handleDeleteEvent={handleDeleteEvent}
						dayIndex={index}
					/>
				</div>

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
