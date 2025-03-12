import React from 'react'
import { useQuotation } from '../../context/QuotationContext'
import { ProcessedDay } from '../../context/contextinterfaces'
import { Icon } from '@iconify/react'

interface DayItemProps {
	day: ProcessedDay
	dayIndex: number
	dayLabel: string
	isExpanded: boolean
	isActive?: boolean
	onToggle: () => void
	accentColor?: string
}

const DayItem: React.FC<DayItemProps> = ({
	day,
	dayIndex,
	dayLabel,
	isExpanded,
	isActive = false,
	onToggle,
	accentColor = '#4F46E5'
}) => {
	const { scrollToDay } = useQuotation()

	// Check if the day has specific content
	const hasMorningContent = day.events.morning.length > 0
	const hasLunchContent = day.events.lunch.length > 0
	const hasAfternoonContent = day.events.afternoon.length > 0
	const hasDinnerContent = day.events.dinner.length > 0
	const hasFullDayMeeting = day.hasFullDay && day.fullDayMeetings !== null

	// Don't show days with no content
	const hasAnyContent =
		hasMorningContent ||
		hasLunchContent ||
		hasAfternoonContent ||
		hasDinnerContent ||
		hasFullDayMeeting

	if (!hasAnyContent) {
		return null
	}

	// Icon mapping for each time of day
	const timeOfDayIcons = {
		morning: 'mdi:weather-sunset-up',
		lunch: 'mdi:food-outline',
		afternoon: 'mdi:weather-sunset-down',
		dinner: 'mdi:food'
	}

	// Helper to generate opacity class based on content presence
	const getOpacityClass = (hasContent: boolean) =>
		hasContent ? '' : 'opacity-50'

	return (
		<div
			className={`mb-2 rounded-lg ${
				isActive ? 'bg-gray-100 dark:bg-gray-700' : ''
			}`}
		>
			<button
				onClick={onToggle}
				className={`
          w-full flex items-center justify-between p-2 text-left text-sm rounded-lg 
          hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200
          ${isActive ? 'font-medium' : 'text-gray-700 dark:text-gray-300'}
        `}
			>
				<div className="flex items-center space-x-2">
					<div
						className={`h-4 w-1 rounded-full ${
							isActive ? 'opacity-100' : 'opacity-0'
						}`}
						style={{ backgroundColor: accentColor }}
					></div>

					<div className="flex flex-col">
						<span className={isActive ? 'text-gray-900 dark:text-white-0' : ''}>
							{dayLabel}
						</span>
						<span className="text-xs text-gray-500 dark:text-gray-400">
							{day.formattedDate}
						</span>
					</div>
				</div>

				<Icon
					icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}
					className="text-gray-500"
					width={14}
				/>
			</button>

			{isExpanded && (
				<ul className="pl-7 mt-1 space-y-1 pb-1">
					{/* Full day meeting (spans morning to afternoon) */}
					{hasFullDayMeeting && (
						<li>
							<button
								onClick={() => scrollToDay(dayIndex, 'morning')}
								className="w-full flex items-center text-left p-1.5 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								<Icon
									icon="mdi:calendar-clock"
									className="mr-2 flex-shrink-0"
									width={14}
								/>
								<span className="truncate">Full Day Meeting</span>
							</button>
						</li>
					)}

					{/* If not full day, show individual sections */}
					{!hasFullDayMeeting && (
						<>
							{/* Morning */}
							<li className={getOpacityClass(hasMorningContent)}>
								<button
									onClick={() => scrollToDay(dayIndex, 'morning')}
									className={`
                    w-full flex items-center text-left p-1.5 text-xs rounded 
                    ${
											hasMorningContent
												? 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
												: 'text-gray-400 dark:text-gray-500 cursor-default'
										}
                  `}
									disabled={!hasMorningContent}
								>
									<Icon
										icon={timeOfDayIcons.morning}
										className="mr-2 flex-shrink-0"
										width={14}
									/>
									<span className="truncate">
										{hasMorningContent
											? `Morning (${day.events.morning.length})`
											: 'No Morning Activities'}
									</span>
								</button>
							</li>

							{/* Lunch */}
							<li className={getOpacityClass(hasLunchContent)}>
								<button
									onClick={() => scrollToDay(dayIndex, 'lunch')}
									className={`
                    w-full flex items-center text-left p-1.5 text-xs rounded
                    ${
											hasLunchContent
												? 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
												: 'text-gray-400 dark:text-gray-500 cursor-default'
										}
                  `}
									disabled={!hasLunchContent}
								>
									<Icon
										icon={timeOfDayIcons.lunch}
										className="mr-2 flex-shrink-0"
										width={14}
									/>
									<span className="truncate">
										{hasLunchContent
											? `Lunch (${day.events.lunch.length})`
											: 'No Lunch Plans'}
									</span>
								</button>
							</li>

							{/* Afternoon */}
							<li className={getOpacityClass(hasAfternoonContent)}>
								<button
									onClick={() => scrollToDay(dayIndex, 'afternoon')}
									className={`
                    w-full flex items-center text-left p-1.5 text-xs rounded
                    ${
											hasAfternoonContent
												? 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
												: 'text-gray-400 dark:text-gray-500 cursor-default'
										}
                  `}
									disabled={!hasAfternoonContent}
								>
									<Icon
										icon={timeOfDayIcons.afternoon}
										className="mr-2 flex-shrink-0"
										width={14}
									/>
									<span className="truncate">
										{hasAfternoonContent
											? `Afternoon (${day.events.afternoon.length})`
											: 'No Afternoon Activities'}
									</span>
								</button>
							</li>
						</>
					)}

					{/* Dinner (always shown separately) */}
					<li className={getOpacityClass(hasDinnerContent)}>
						<button
							onClick={() => scrollToDay(dayIndex, 'dinner')}
							className={`
                w-full flex items-center text-left p-1.5 text-xs rounded
                ${
									hasDinnerContent
										? 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
										: 'text-gray-400 dark:text-gray-500 cursor-default'
								}
              `}
							disabled={!hasDinnerContent}
						>
							<Icon
								icon={timeOfDayIcons.dinner}
								className="mr-2 flex-shrink-0"
								width={14}
							/>
							<span className="truncate">
								{hasDinnerContent
									? `Dinner (${day.events.dinner.length})`
									: 'No Dinner Plans'}
							</span>
						</button>
					</li>
				</ul>
			)}
		</div>
	)
}

export default DayItem
