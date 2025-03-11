import { Icon } from '@iconify/react'
import OTLogic from './OTLogic'
import { ISetting } from '@interfaces/setting'
import { useCurrentProject, useLocalStorageItem } from 'src/hooks'
import { useState } from 'react'

const OverviewTable = () => {
	const { currentProject } = useCurrentProject()
	const { arrivalDay, departureDay, schedule, clientCompany, hideDates } =
		currentProject
	const { fonts = [], colorPalette = [] } = clientCompany[0] || {}
	const item = useLocalStorageItem('settings', {}) as unknown as ISetting
	const secondary = item?.colorPalette?.secundary
	const [isExpanded, setIsExpanded] = useState(false)

	const iconColor = colorPalette.length > 0 ? colorPalette[2] : secondary
	const {
		transformDates,
		getDays,
		getEvents,
		renderEvent,
		getFullDayMeetingDays,
		getFullDayMeetingForDay,
		formatDate
	} = OTLogic()

	// Get days with full day meetings
	const daysWithFullDayMeetings = getFullDayMeetingDays(schedule)

	// Get all days for the header with their actual dates
	const daysWithDates = !hideDates
		? getDays(arrivalDay, departureDay).map((day, index) => {
				// Calculate the date for this day of the week
				const startDate = new Date(arrivalDay)
				const currentDate = new Date(startDate)
				currentDate.setDate(startDate.getDate() + index)
				return {
					day,
					date: formatDate(currentDate.toISOString().split('T')[0])
				}
		  })
		: [{ day: 'Options', date: '' }]

	return (
		<div className="bg-white-0 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 max-w-full">
			{/* Header with responsive padding and toggle option */}
			<div className="p-2 sm:p-3 md:p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
				<h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-white-0 truncate">
					Project Schedule: {transformDates(arrivalDay, departureDay)}
				</h2>
				<button
					onClick={() => setIsExpanded(!isExpanded)}
					className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
					aria-label={isExpanded ? 'Collapse table' : 'Expand table'}
				>
					<Icon
						icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}
						width="20"
					/>
				</button>
			</div>

			{/* Table container with responsive design */}
			<div className={`overflow-x-auto ${isExpanded ? '' : 'max-h-96'}`}>
				<table className="w-full lg:table-fixed">
					{/* Table Header with Day and Date */}
					<thead>
						<tr className="bg-gray-100 dark:bg-gray-800">
							<th className="p-2 md:p-3 text-left font-medium text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 w-24 md:w-32">
								<span className="text-xs sm:text-sm">Time</span>
							</th>
							{daysWithDates.map(({ day, date }, index) => (
								<th
									key={`day-${index}`}
									className="p-2 md:p-3 text-left font-medium text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700"
								>
									<div className="flex flex-col">
										<span className="text-xs sm:text-sm font-semibold">
											{day}
										</span>
										{date && (
											<span className="text-xs text-gray-500 dark:text-gray-400">
												{date}
											</span>
										)}
									</div>
								</th>
							))}
						</tr>
					</thead>

					{/* Table Body */}
					<tbody>
						{/* Morning Events Row */}
						<tr className="bg-white-0 dark:bg-gray-900 hover:bg-indigo-100 dark:hover:bg-gray-800">
							<td className="p-2 md:p-3 border-b border-gray-200 dark:border-gray-700">
								<div className="flex items-center">
									<Icon
										icon={mealIconMap.morningEvents}
										color={iconColor}
										width="18"
										className="mr-1 sm:mr-2"
									/>
									<span className="font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-300">
										Morning
									</span>
								</div>
							</td>

							{getEvents(schedule, 'morningEvents').map((events, dayIndex) => {
								// Check if this day has a full day meeting
								const fullDayMeeting = getFullDayMeetingForDay(
									schedule,
									dayIndex
								)

								// If there's a full day meeting, render it with rowspan=2
								if (fullDayMeeting && fullDayMeeting.length > 0) {
									return (
										<td
											key={`morning-${dayIndex}`}
											rowSpan={2}
											className="p-1 sm:p-2 md:p-3 border-b border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20"
										>
											<div className="p-1 sm:p-2 rounded-lg bg-blue-100 dark:bg-blue-800/30 border border-blue-200 dark:border-blue-700">
												<div className="text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1 truncate">
													Full Day
												</div>
												<div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
													{renderEvent(fullDayMeeting)}
												</div>
											</div>
										</td>
									)
								}

								// Otherwise, render normal morning events
								return (
									<td
										key={`morning-${dayIndex}`}
										className="p-1 sm:p-2 md:p-3 border-b border-gray-200 dark:border-gray-700"
									>
										{events && events.length > 0 ? (
											<div className="p-1 sm:p-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30">
												<span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
													{renderEvent(events)}
												</span>
											</div>
										) : (
											<span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
												No events
											</span>
										)}
									</td>
								)
							})}
						</tr>

						{/* Lunch Row */}
						<tr className="bg-white-0 dark:bg-gray-900 hover:bg-indigo-100 dark:hover:bg-gray-800">
							<td className="p-2 md:p-3 border-b border-gray-200 dark:border-gray-700">
								<div className="flex items-center">
									<Icon
										icon={mealIconMap.lunch}
										color={iconColor}
										width="18"
										className="mr-1 sm:mr-2"
									/>
									<span className="font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-300">
										Lunch
									</span>
								</div>
							</td>

							{getEvents(schedule, 'lunch').map((restaurants, dayIndex) => (
								<td
									key={`lunch-${dayIndex}`}
									className="p-1 sm:p-2 md:p-3 border-b border-gray-200 dark:border-gray-700"
								>
									{restaurants && restaurants.length > 0 ? (
										<div className="p-1 sm:p-2 rounded-lg bg-yellow-50 dark:bg-yellow-800/50 border border-yellow-100 dark:border-yellow-800/60">
											<span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
												{renderEvent(restaurants)}
											</span>
										</div>
									) : (
										<span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
											No events
										</span>
									)}
								</td>
							))}
						</tr>

						{/* Afternoon Events Row */}
						<tr className="bg-white-0 dark:bg-gray-900 hover:bg-indigo-100 dark:hover:bg-gray-800">
							<td className="p-2 md:p-3 border-b border-gray-200 dark:border-gray-700">
								<div className="flex items-center">
									<Icon
										icon={mealIconMap.afternoonEvents}
										color={iconColor}
										width="18"
										className="mr-1 sm:mr-2"
									/>
									<span className="font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-300">
										Afternoon
									</span>
								</div>
							</td>

							{getEvents(schedule, 'afternoonEvents').map(
								(events, dayIndex) => {
									// Skip rendering afternoon cell if there's a full day meeting
									// (it's already covered by the morning cell with rowspan=2)
									const fullDayMeeting = getFullDayMeetingForDay(
										schedule,
										dayIndex
									)
									if (fullDayMeeting && fullDayMeeting.length > 0) {
										return null // This cell is already covered by the full day meeting
									}

									return (
										<td
											key={`afternoon-${dayIndex}`}
											className="p-1 sm:p-2 md:p-3 border-b border-gray-200 dark:border-gray-700"
										>
											{events && events.length > 0 ? (
												<div className="p-1 sm:p-2 rounded-lg bg-orange-50 dark:bg-orange-900/50 border border-orange-100 dark:border-orange-800/70">
													<span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
														{renderEvent(events)}
													</span>
												</div>
											) : (
												<span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
													No events
												</span>
											)}
										</td>
									)
								}
							)}
						</tr>

						{/* Dinner Row */}
						<tr className="bg-white-0 dark:bg-gray-900 hover:bg-indigo-100 dark:hover:bg-gray-800">
							<td className="p-2 md:p-3 border-b border-gray-200 dark:border-gray-700">
								<div className="flex items-center">
									<Icon
										icon={mealIconMap.dinner}
										color={iconColor}
										width="18"
										className="mr-1 sm:mr-2"
									/>
									<span className="font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-300">
										Dinner
									</span>
								</div>
							</td>

							{getEvents(schedule, 'dinner').map((restaurants, dayIndex) => (
								<td
									key={`dinner-${dayIndex}`}
									className="p-1 sm:p-2 md:p-3 border-b border-gray-200 dark:border-gray-700"
								>
									{restaurants && restaurants.length > 0 ? (
										<div className="p-1 sm:p-2 rounded-lg bg-purple-50 dark:bg-purple-900/40 border border-purple-100 dark:border-purple-800/80">
											<span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
												{renderEvent(restaurants)}
											</span>
										</div>
									) : (
										<span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
											No events
										</span>
									)}
								</td>
							))}
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}

const mealIconMap = {
	morningEvents: 'mdi:weather-sunset-up',
	lunch: 'bx:bx-restaurant',
	afternoonEvents: 'mdi:weather-sunset-down',
	dinner: 'cil:dinner'
}

export default OverviewTable
