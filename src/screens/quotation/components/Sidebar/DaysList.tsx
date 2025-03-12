import React from 'react'
import { useQuotation } from '../../context/QuotationContext'
import CollapsibleSection from '../common/CollapsibleSection'
import DayItem from './DayItem'
import { transformDates } from '../../utils/dateFormatters'
import { Icon } from '@iconify/react'

interface DaysListProps {
	isExpanded: boolean
	onToggle: () => void
	accentColor?: string
}

const DaysList: React.FC<DaysListProps> = ({
	isExpanded,
	onToggle,
	accentColor = '#4F46E5'
}) => {
	const { scheduleDays, expandedDays, toggleDay, currentProject, activeDay } =
		useQuotation()

	// Return early if no schedule days
	if (!scheduleDays || scheduleDays.length === 0) {
		return null
	}

	// Create day names
	const getDayLabel = (index: number, total: number) => {
		if (index === 0) return 'Arrival Day'
		if (index === total - 1) return 'Departure Day'
		return `Day ${index + 1}`
	}

	// Get project date range for display
	const dateRange =
		currentProject?.arrivalDay && currentProject?.departureDay
			? transformDates(currentProject.arrivalDay, currentProject.departureDay)
			: 'Project Schedule'

	return (
		<CollapsibleSection
			title="Daily Schedule"
			subtitle={dateRange}
			icon="mdi:calendar-multiple"
			isExpanded={isExpanded}
			onToggle={onToggle}
			accentColor={accentColor}
			badge={scheduleDays.length}
		>
			<div className="space-y-1 pl-1 mt-1">
				{scheduleDays.map((day, index) => (
					<DayItem
						key={`day-${index}`}
						day={day}
						dayIndex={index}
						dayLabel={getDayLabel(index, scheduleDays.length)}
						isExpanded={expandedDays[index] || false}
						isActive={activeDay?.dayIndex === index}
						onToggle={() => toggleDay(index)}
						accentColor={accentColor}
					/>
				))}

				{/* Show all/collapse all buttons */}
				<div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
					<button
						onClick={() =>
							scheduleDays.forEach((_, i) =>
								expandedDays[i] ? toggleDay(i) : null
							)
						}
						className="flex items-center text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 px-2 py-1 rounded"
					>
						<Icon icon="mdi:chevron-up" className="mr-1" width={14} />
						Collapse All
					</button>

					<button
						onClick={() =>
							scheduleDays.forEach((_, i) =>
								!expandedDays[i] ? toggleDay(i) : null
							)
						}
						className="flex items-center text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 px-2 py-1 rounded"
					>
						<Icon icon="mdi:chevron-down" className="mr-1" width={14} />
						Expand All
					</button>
				</div>
			</div>
		</CollapsibleSection>
	)
}

export default DaysList
