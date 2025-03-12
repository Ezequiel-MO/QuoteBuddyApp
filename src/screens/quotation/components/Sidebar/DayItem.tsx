import React from 'react'
import { useQuotation } from '../../context/QuotationContext'
import { ProcessedDay } from '../../context/contextinterfaces'
import Icon from '../common/Icon'

interface DayItemProps {
	day: ProcessedDay
	dayIndex: number
	dayLabel: string
	isExpanded: boolean
	onToggle: () => void
}

const DayItem: React.FC<DayItemProps> = ({
	day,
	dayIndex,
	dayLabel,
	isExpanded,
	onToggle
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

	return (
		<div className="mb-2">
			<button
				onClick={onToggle}
				className="w-full flex items-center justify-between p-1 text-left text-sm transition-colors duration-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
			>
				<span className="text-gray-700 dark:text-gray-300">{dayLabel}</span>
				<Icon
					name={isExpanded ? 'chevron-up' : 'chevron-down'}
					className="text-gray-500"
					width={14}
				/>
			</button>

			{isExpanded && (
				<ul className="pl-4 mt-1 space-y-1">
					{/* Full day meeting (spans morning to afternoon) */}
					{hasFullDayMeeting && (
						<li>
							<button
								onClick={() => scrollToDay(dayIndex, 'morning')}
								className="w-full text-left p-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								Full Day Meeting
							</button>
						</li>
					)}

					{/* If not full day, show individual sections */}
					{!hasFullDayMeeting && (
						<>
							{/* Morning */}
							{hasMorningContent && (
								<li>
									<button
										onClick={() => scrollToDay(dayIndex, 'morning')}
										className="w-full text-left p-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
									>
										Morning Activities
									</button>
								</li>
							)}

							{/* Lunch */}
							{hasLunchContent && (
								<li>
									<button
										onClick={() => scrollToDay(dayIndex, 'lunch')}
										className="w-full text-left p-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
									>
										Lunch
									</button>
								</li>
							)}

							{/* Afternoon */}
							{hasAfternoonContent && (
								<li>
									<button
										onClick={() => scrollToDay(dayIndex, 'afternoon')}
										className="w-full text-left p-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
									>
										Afternoon Activities
									</button>
								</li>
							)}
						</>
					)}

					{/* Dinner (always shown separately) */}
					{hasDinnerContent && (
						<li>
							<button
								onClick={() => scrollToDay(dayIndex, 'dinner')}
								className="w-full text-left p-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
							>
								Dinner
							</button>
						</li>
					)}
				</ul>
			)}
		</div>
	)
}

export default DayItem
