import React, { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useQuotation } from '../../context/QuotationContext'
import { transformDates } from '../../utils/dateFormatters'

import { IDay } from '@interfaces/project'
import DayScheduleCard from './DayScheduleCard'

interface ScheduleSectionProps {
	schedule: IDay[]
	arrivalDay?: string
	departureDay?: string
	hideDates?: boolean
}

const ScheduleSection: React.FC<ScheduleSectionProps> = ({
	schedule,
	arrivalDay,
	departureDay,
	hideDates
}) => {
	const { currentProject, activeDay, scheduleDays, registerSectionRef } =
		useQuotation()
	const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({})
	const [view, setView] = useState<'cards' | 'list'>('cards')
	const sectionRef = useRef<HTMLDivElement>(null)

	// Get styling information from client company
	const clientCompany = currentProject?.clientCompany?.[0] || {}
	const colorPalette = clientCompany.colorPalette || []
	const primaryColor = colorPalette[0] || '#4F46E5' // Default to indigo if no color

	// Initialize with all days expanded
	useEffect(() => {
		if (scheduleDays.length > 0) {
			const expanded: Record<number, boolean> = {}
			scheduleDays.forEach((_, index) => {
				expanded[index] = true
			})
			setExpandedDays(expanded)
		}
	}, [scheduleDays])

	// Register section ref with context
	useEffect(() => {
		registerSectionRef('schedule', sectionRef.current)
	}, [registerSectionRef])

	// Toggle a specific day's expanded state
	const toggleDay = (dayIndex: number) => {
		setExpandedDays((prev) => ({
			...prev,
			[dayIndex]: !prev[dayIndex]
		}))
	}

	// Toggle all days expanded/collapsed
	const toggleAllDays = (expanded: boolean) => {
		const newState: Record<number, boolean> = {}
		scheduleDays.forEach((_, index) => {
			newState[index] = expanded
		})
		setExpandedDays(newState)
	}

	// Format the date range string
	const dateRangeString =
		arrivalDay && departureDay
			? transformDates(arrivalDay, departureDay)
			: 'Schedule overview'

	// Get day label
	const getDayLabel = (index: number, total: number) => {
		if (index === 0) return 'Arrival Day'
		if (index === total - 1) return 'Departure Day'
		return `Day ${index + 1}`
	}

	return (
		<div ref={sectionRef} className="space-y-8">
			{/* Section Heading */}
			<div className="border-b border-gray-200 dark:border-gray-700 pb-4">
				<h2 className="text-2xl font-bold text-gray-800 dark:text-white-0 flex items-center">
					<Icon icon="mdi:calendar" className="mr-2" width={24} />
					Daily Schedule
				</h2>
				<p className="text-gray-600 dark:text-gray-300 mt-1">
					{dateRangeString}
				</p>
			</div>

			{/* Controls */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-white-0 dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
				<div className="flex items-center space-x-3">
					<div className="inline-flex rounded-md shadow-sm">
						<button
							onClick={() => setView('cards')}
							className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
								view === 'cards'
									? 'text-white-0'
									: 'text-gray-700 dark:text-gray-300 bg-white-0 dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
							}`}
							style={{
								backgroundColor: view === 'cards' ? primaryColor : undefined
							}}
						>
							<Icon icon="mdi:view-module" className="mr-1" width={16} />
							Cards
						</button>
						<button
							onClick={() => setView('list')}
							className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
								view === 'list'
									? 'text-white-0'
									: 'text-gray-700 dark:text-gray-300 bg-white-0 dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
							}`}
							style={{
								backgroundColor: view === 'list' ? primaryColor : undefined
							}}
						>
							<Icon icon="mdi:view-list" className="mr-1" width={16} />
							List
						</button>
					</div>

					<div className="text-sm text-gray-500 dark:text-gray-400">
						{scheduleDays.length} days
					</div>
				</div>

				<div>
					<div className="inline-flex rounded-md shadow-sm">
						<button
							onClick={() => toggleAllDays(true)}
							className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white-0 dark:bg-gray-700 rounded-l-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
						>
							<Icon icon="mdi:chevron-down" className="mr-1" width={16} />
							Expand All
						</button>
						<button
							onClick={() => toggleAllDays(false)}
							className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white-0 dark:bg-gray-700 rounded-r-lg border-t border-b border-r border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
						>
							<Icon icon="mdi:chevron-up" className="mr-1" width={16} />
							Collapse All
						</button>
					</div>
				</div>
			</div>

			{/* Schedule Content */}
			{scheduleDays.length === 0 ? (
				<div className="bg-white-0 dark:bg-gray-800 rounded-lg p-8 text-center shadow-sm border border-gray-200 dark:border-gray-700">
					<Icon
						icon="mdi:calendar-blank"
						className="mx-auto text-gray-400 dark:text-gray-500"
						width={48}
					/>
					<h3 className="mt-4 text-lg font-medium text-gray-800 dark:text-white-0">
						No Schedule Available
					</h3>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						The schedule for this project has not been defined yet.
					</p>
				</div>
			) : (
				<div
					className={
						view === 'cards'
							? 'space-y-6'
							: 'divide-y divide-gray-200 dark:divide-gray-700'
					}
				>
					{scheduleDays.map((day, index) => (
						<div
							key={`day-${index}`}
							id={`day-${index}`}
							className={`
                ${view === 'cards' ? '' : 'py-6 first:pt-0 last:pb-0'}
                ${activeDay?.dayIndex === index ? 'scroll-mt-20' : ''}
              `}
						>
							<DayScheduleCard
								day={day}
								dayIndex={index}
								dayLabel={getDayLabel(index, scheduleDays.length)}
								isExpanded={expandedDays[index] || false}
								onToggle={() => toggleDay(index)}
								view={view}
								accentColor={primaryColor}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default ScheduleSection
