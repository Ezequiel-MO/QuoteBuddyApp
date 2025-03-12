import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { useQuotation } from '../../context/QuotationContext'
import { renderEvent } from '../../utils/eventProcessors'
import { transformDates } from '../../utils/dateFormatters'

const OverviewTable: React.FC = () => {
	const { currentProject, scheduleDays, daysWithDates, scrollToDay } =
		useQuotation()

	const [viewMode, setViewMode] = useState<'detailed' | 'compact'>('detailed')

	// Get color from client company
	const clientCompany = currentProject?.clientCompany?.[0] || {}
	const colorPalette = clientCompany.colorPalette || []
	const primaryColor = colorPalette[0] || '#4F46E5' // Default to indigo if no color
	const secondaryColor = colorPalette[1] || '#8B5CF6' // Default to purple if no color

	// Icon mapping for each time of day
	const timeOfDayIcons = {
		morning: 'mdi:weather-sunset-up',
		lunch: 'mdi:food-outline',
		afternoon: 'mdi:weather-sunset-down',
		dinner: 'mdi:food'
	}

	// Define background colors for each time of day
	const timeOfDayColors = {
		morning: {
			bg: 'bg-blue-50 dark:bg-blue-900/10',
			border: 'border-blue-200 dark:border-blue-800/30',
			text: 'text-blue-800 dark:text-blue-200',
			hover: 'hover:bg-blue-100 dark:hover:bg-blue-900/20'
		},
		lunch: {
			bg: 'bg-amber-50 dark:bg-amber-900/10',
			border: 'border-amber-200 dark:border-amber-800/30',
			text: 'text-amber-800 dark:text-amber-200',
			hover: 'hover:bg-amber-100 dark:hover:bg-amber-900/20'
		},
		afternoon: {
			bg: 'bg-orange-50 dark:bg-orange-900/10',
			border: 'border-orange-200 dark:border-orange-800/30',
			text: 'text-orange-800 dark:text-orange-200',
			hover: 'hover:bg-orange-100 dark:hover:bg-orange-900/20'
		},
		dinner: {
			bg: 'bg-purple-50 dark:bg-purple-900/10',
			border: 'border-purple-200 dark:border-purple-800/30',
			text: 'text-purple-800 dark:text-purple-200',
			hover: 'hover:bg-purple-100 dark:hover:bg-purple-900/20'
		},
		fullDay: {
			bg: 'bg-indigo-50 dark:bg-indigo-900/10',
			border: 'border-indigo-200 dark:border-indigo-800/30',
			text: 'text-indigo-800 dark:text-indigo-200',
			hover: 'hover:bg-indigo-100 dark:hover:bg-indigo-900/20'
		}
	}

	// Helper function to navigate to specific day and time
	const handleCellClick = (
		dayIndex: number,
		timeOfDay: 'morning' | 'lunch' | 'afternoon' | 'dinner'
	) => {
		scrollToDay(dayIndex, timeOfDay)
	}

	return (
		<div className="overflow-hidden bg-white-0 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
			{/* Controls */}
			<div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
				<div>
					<h3 className="text-sm font-semibold text-gray-800 dark:text-white-0">
						Project Schedule
					</h3>
					<p className="text-xs text-gray-500 dark:text-gray-400">
						{currentProject?.arrivalDay && currentProject?.departureDay
							? transformDates(
									currentProject.arrivalDay,
									currentProject.departureDay
							  )
							: 'Schedule overview'}
					</p>
				</div>

				<div className="flex items-center space-x-2">
					<div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-0.5">
						<button
							onClick={() => setViewMode('detailed')}
							className={`px-3 py-1 text-xs rounded-md transition-colors ${
								viewMode === 'detailed'
									? 'bg-white-0 dark:bg-gray-600 shadow-sm text-gray-800 dark:text-white-0'
									: 'text-gray-600 dark:text-gray-300'
							}`}
						>
							Detailed
						</button>
						<button
							onClick={() => setViewMode('compact')}
							className={`px-3 py-1 text-xs rounded-md transition-colors ${
								viewMode === 'compact'
									? 'bg-white-0 dark:bg-gray-600 shadow-sm text-gray-800 dark:text-white-0'
									: 'text-gray-600 dark:text-gray-300'
							}`}
						>
							Compact
						</button>
					</div>
				</div>
			</div>

			{/* Table container with responsive design */}
			<div className="overflow-x-auto">
				<table className="w-full">
					{/* Table Header with Day and Date */}
					<thead>
						<tr className="bg-gray-50 dark:bg-gray-700">
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
						<tr className="bg-white-0 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750">
							<td className="p-2 md:p-3 border-b border-gray-200 dark:border-gray-700">
								<div className="flex items-center">
									<Icon
										icon={timeOfDayIcons.morning}
										style={{ color: primaryColor }}
										width={18}
										className="mr-1 sm:mr-2 flex-shrink-0"
									/>
									<span className="font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-300">
										Morning
									</span>
								</div>
							</td>

							{scheduleDays.map((day, dayIndex) => {
								// Check if this day has a full day meeting
								const hasFullDay =
									day.hasFullDay && day.fullDayMeetings !== null

								// If there's a full day meeting, render it with rowspan=2
								if (hasFullDay) {
									return (
										<td
											key={`morning-${dayIndex}`}
											rowSpan={2}
											className={`
                        p-1 sm:p-2 md:p-3 border-b border-gray-200 dark:border-gray-700 
                        ${timeOfDayColors.fullDay.bg} cursor-pointer transition-colors
                        ${timeOfDayColors.fullDay.hover}
                      `}
											onClick={() => handleCellClick(dayIndex, 'morning')}
										>
											<div
												className={`
                        p-1 sm:p-2 rounded-lg border 
                        ${timeOfDayColors.fullDay.border}
                      `}
											>
												<div className="text-xs sm:text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-1 truncate flex items-center">
													<Icon
														icon="mdi:calendar-clock"
														className="mr-1 flex-shrink-0"
														width={14}
													/>
													Full Day
												</div>
												<div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
													{renderEvent(day.fullDayMeetings)}
												</div>
											</div>
										</td>
									)
								}

								// Otherwise, render normal morning events
								return (
									<td
										key={`morning-${dayIndex}`}
										className={`
                      p-1 sm:p-2 md:p-3 border-b border-gray-200 dark:border-gray-700
                      ${
												day.events.morning.length > 0
													? `cursor-pointer ${timeOfDayColors.morning.hover}`
													: ''
											}
                    `}
										onClick={() =>
											day.events.morning.length > 0 &&
											handleCellClick(dayIndex, 'morning')
										}
									>
										{day.events.morning.length > 0 ? (
											<div
												className={`
                        p-1 sm:p-2 rounded-lg border 
                        ${timeOfDayColors.morning.bg} 
                        ${timeOfDayColors.morning.border}
                      `}
											>
												<span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
													{renderEvent(day.events.morning)}
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
						<tr className="bg-white-0 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750">
							<td className="p-2 md:p-3 border-b border-gray-200 dark:border-gray-700">
								<div className="flex items-center">
									<Icon
										icon={timeOfDayIcons.lunch}
										style={{ color: secondaryColor }}
										width={18}
										className="mr-1 sm:mr-2 flex-shrink-0"
									/>
									<span className="font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-300">
										Lunch
									</span>
								</div>
							</td>

							{scheduleDays.map((day, dayIndex) => {
								// Skip rendering lunch cell if there's a full day meeting
								const hasFullDay =
									day.hasFullDay && day.fullDayMeetings !== null
								if (hasFullDay) {
									return null // This cell is already covered by the full day meeting
								}

								return (
									<td
										key={`lunch-${dayIndex}`}
										className={`
                      p-1 sm:p-2 md:p-3 border-b border-gray-200 dark:border-gray-700
                      ${
												day.events.lunch.length > 0
													? `cursor-pointer ${timeOfDayColors.lunch.hover}`
													: ''
											}
                    `}
										onClick={() =>
											day.events.lunch.length > 0 &&
											handleCellClick(dayIndex, 'lunch')
										}
									>
										{day.events.lunch.length > 0 ? (
											<div
												className={`
                        p-1 sm:p-2 rounded-lg border 
                        ${timeOfDayColors.lunch.bg} 
                        ${timeOfDayColors.lunch.border}
                      `}
											>
												<span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
													{renderEvent(day.events.lunch)}
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

						{/* Afternoon Events Row */}
						<tr className="bg-white-0 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750">
							<td className="p-2 md:p-3 border-b border-gray-200 dark:border-gray-700">
								<div className="flex items-center">
									<Icon
										icon={timeOfDayIcons.afternoon}
										style={{ color: primaryColor }}
										width={18}
										className="mr-1 sm:mr-2 flex-shrink-0"
									/>
									<span className="font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-300">
										Afternoon
									</span>
								</div>
							</td>

							{scheduleDays.map((day, dayIndex) => {
								// Skip rendering afternoon cell if there's a full day meeting
								const hasFullDay =
									day.hasFullDay && day.fullDayMeetings !== null
								if (hasFullDay) {
									return null // This cell is already covered by the full day meeting
								}

								return (
									<td
										key={`afternoon-${dayIndex}`}
										className={`
                      p-1 sm:p-2 md:p-3 border-b border-gray-200 dark:border-gray-700
                      ${
												day.events.afternoon.length > 0
													? `cursor-pointer ${timeOfDayColors.afternoon.hover}`
													: ''
											}
                    `}
										onClick={() =>
											day.events.afternoon.length > 0 &&
											handleCellClick(dayIndex, 'afternoon')
										}
									>
										{day.events.afternoon.length > 0 ? (
											<div
												className={`
                        p-1 sm:p-2 rounded-lg border 
                        ${timeOfDayColors.afternoon.bg} 
                        ${timeOfDayColors.afternoon.border}
                      `}
											>
												<span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
													{renderEvent(day.events.afternoon)}
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

						{/* Dinner Row */}
						<tr className="bg-white-0 dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750">
							<td className="p-2 md:p-3 border-b border-gray-200 dark:border-gray-700">
								<div className="flex items-center">
									<Icon
										icon={timeOfDayIcons.dinner}
										style={{ color: secondaryColor }}
										width={18}
										className="mr-1 sm:mr-2 flex-shrink-0"
									/>
									<span className="font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-300">
										Dinner
									</span>
								</div>
							</td>

							{scheduleDays.map((day, dayIndex) => (
								<td
									key={`dinner-${dayIndex}`}
									className={`
                    p-1 sm:p-2 md:p-3 border-b border-gray-200 dark:border-gray-700
                    ${
											day.events.dinner.length > 0
												? `cursor-pointer ${timeOfDayColors.dinner.hover}`
												: ''
										}
                  `}
									onClick={() =>
										day.events.dinner.length > 0 &&
										handleCellClick(dayIndex, 'dinner')
									}
								>
									{day.events.dinner.length > 0 ? (
										<div
											className={`
                      p-1 sm:p-2 rounded-lg border 
                      ${timeOfDayColors.dinner.bg} 
                      ${timeOfDayColors.dinner.border}
                    `}
										>
											<span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
												{renderEvent(day.events.dinner)}
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

			{/* Table Footer with Legend */}
			{viewMode === 'detailed' && (
				<div className="p-3 border-t border-gray-200 dark:border-gray-700">
					<div className="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 gap-3">
						<div className="flex items-center">
							<div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
							<span>Morning Activity</span>
						</div>
						<div className="flex items-center">
							<div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
							<span>Lunch</span>
						</div>
						<div className="flex items-center">
							<div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
							<span>Afternoon Activity</span>
						</div>
						<div className="flex items-center">
							<div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
							<span>Dinner</span>
						</div>
						<div className="flex items-center">
							<div className="w-3 h-3 rounded-full bg-indigo-500 mr-1"></div>
							<span>Full Day Meeting</span>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default OverviewTable
