import React from 'react'
import { useQuotation } from '@screens/quotation/context/QuotationContext'
import CollapsibleSection from '../common/CollapsibleSection'
import DayItem from './DayItem'

interface DaysListProps {
	isExpanded: boolean
	onToggle: () => void
}

const DaysList: React.FC<DaysListProps> = ({ isExpanded, onToggle }) => {
	const { scheduleDays, expandedDays, toggleDay } = useQuotation()

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

	return (
		<CollapsibleSection
			title="Schedule"
			iconName="calendar"
			isExpanded={isExpanded}
			onToggle={onToggle}
		>
			<div className="space-y-1">
				{scheduleDays.map((day, index) => (
					<DayItem
						key={`day-${index}`}
						day={day}
						dayIndex={index}
						dayLabel={getDayLabel(index, scheduleDays.length)}
						isExpanded={expandedDays[index] || false}
						onToggle={() => toggleDay(index)}
					/>
				))}
			</div>
		</CollapsibleSection>
	)
}

export default DaysList
