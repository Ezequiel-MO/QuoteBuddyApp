import React, { useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useQuotation } from '../../context/QuotationContext'
import { ProcessedDay } from '../../context/contextinterfaces'
import { renderEvent } from '../../utils/eventProcessors'

interface DayScheduleCardProps {
	day: ProcessedDay
	dayIndex: number
	dayLabel: string
	isExpanded: boolean
	onToggle: () => void
	view: 'cards' | 'list'
	accentColor?: string
}

const DayScheduleCard: React.FC<DayScheduleCardProps> = ({
	day,
	dayIndex,
	dayLabel,
	isExpanded,
	onToggle,
	view,
	accentColor = '#4F46E5'
}) => {
	const { registerSectionRef, activeDay } = useQuotation()

	// Refs for each section
	const morningRef = useRef<HTMLDivElement>(null)
	const lunchRef = useRef<HTMLDivElement>(null)
	const afternoonRef = useRef<HTMLDivElement>(null)
	const dinnerRef = useRef<HTMLDivElement>(null)

	// Register refs with context
	useEffect(() => {
		registerSectionRef(`day-${dayIndex}-morning`, morningRef.current)
		registerSectionRef(`day-${dayIndex}-lunch`, lunchRef.current)
		registerSectionRef(`day-${dayIndex}-afternoon`, afternoonRef.current)
		registerSectionRef(`day-${dayIndex}-dinner`, dinnerRef.current)
	}, [dayIndex, registerSectionRef])

	// Check if a specific timeOfDay is active
	const isTimeOfDayActive = (
		timeOfDay: 'morning' | 'lunch' | 'afternoon' | 'dinner'
	) => activeDay?.dayIndex === dayIndex && activeDay?.timeOfDay === timeOfDay

	// Data and styling for each time of day section
	const timeOfDaySections = [
		{
			id: 'morning',
			title: 'Morning',
			icon: 'mdi:weather-sunset-up',
			events: day.events.morning,
			ref: morningRef,
			color: 'blue',
			colorClasses: {
				bg: 'bg-blue-50 dark:bg-blue-900/10',
				text: 'text-blue-800 dark:text-blue-200',
				border: 'border-blue-200 dark:border-blue-700'
			}
		},
		{
			id: 'lunch',
			title: 'Lunch',
			icon: 'mdi:food-outline',
			events: day.events.lunch,
			ref: lunchRef,
			color: 'amber',
			colorClasses: {
				bg: 'bg-amber-50 dark:bg-amber-900/10',
				text: 'text-amber-800 dark:text-amber-200',
				border: 'border-amber-200 dark:border-amber-700'
			}
		},
		{
			id: 'afternoon',
			title: 'Afternoon',
			icon: 'mdi:weather-sunset-down',
			events: day.events.afternoon,
			ref: afternoonRef,
			color: 'orange',
			colorClasses: {
				bg: 'bg-orange-50 dark:bg-orange-900/10',
				text: 'text-orange-800 dark:text-orange-200',
				border: 'border-orange-200 dark:border-orange-700'
			}
		},
		{
			id: 'dinner',
			title: 'Dinner',
			icon: 'mdi:food',
			events: day.events.dinner,
			ref: dinnerRef,
			color: 'purple',
			colorClasses: {
				bg: 'bg-purple-50 dark:bg-purple-900/10',
				text: 'text-purple-800 dark:text-purple-200',
				border: 'border-purple-200 dark:border-purple-700'
			}
		}
	]

	// Full day meeting section
	const fullDaySection =
		day.hasFullDay && day.fullDayMeetings
			? {
					id: 'fullDay',
					title: 'Full Day',
					icon: 'mdi:calendar-clock',
					events: day.fullDayMeetings,
					color: 'indigo',
					colorClasses: {
						bg: 'bg-indigo-50 dark:bg-indigo-900/10',
						text: 'text-indigo-800 dark:text-indigo-200',
						border: 'border-indigo-200 dark:border-indigo-700'
					}
			  }
			: null

	return (
		<div
			className={`
      ${
				view === 'cards'
					? 'bg-white-0 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden'
					: ''
			}
    `}
		>
			{/* Day Header */}
			<div
				className={`
          flex items-center justify-between p-4 cursor-pointer
          ${
						view === 'cards'
							? 'border-b border-gray-200 dark:border-gray-700'
							: ''
					}
          ${
						!isExpanded && view === 'list'
							? 'bg-white-0 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700'
							: ''
					}
        `}
				onClick={onToggle}
			>
				<div className="flex items-center">
					<div
						className="w-10 h-10 flex items-center justify-center rounded-full mr-3 flex-shrink-0"
						style={{ backgroundColor: `${accentColor}20` }}
					>
						<span
							className="font-semibold text-sm"
							style={{ color: accentColor }}
						>
							{dayIndex + 1}
						</span>
					</div>

					<div>
						<h3 className="font-medium text-gray-800 dark:text-white-0">
							{dayLabel}
						</h3>
						<p className="text-xs text-gray-600 dark:text-gray-400">
							{day.formattedDate}
						</p>
					</div>
				</div>

				<div className="flex items-center space-x-2">
					{/* Day stats */}
					<div className="hidden sm:flex space-x-2 mr-2">
						{timeOfDaySections.map(
							(section) =>
								section.events.length > 0 && (
									<div
										key={section.id}
										className={`
                    px-2 py-1 rounded-full text-xs font-medium
                    ${section.colorClasses.bg} ${section.colorClasses.text}
                  `}
									>
										<Icon
											icon={section.icon}
											className="inline-block mr-1"
											width={12}
										/>
										{section.events.length}
									</div>
								)
						)}
					</div>

					<Icon
						icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}
						className="text-gray-500 dark:text-gray-400"
						width={20}
					/>
				</div>
			</div>

			{/* Expanded Content */}
			<div
				className={`
        transition-all duration-300 ease-in-out overflow-hidden
        ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
      `}
			>
				<div
					className={`p-4 ${
						view === 'list'
							? 'bg-white-0 dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mt-2'
							: ''
					}`}
				>
					{/* Full Day Meeting */}
					{fullDaySection && (
						<div
							className={`
              mb-5 p-4 rounded-lg 
              ${fullDaySection.colorClasses.bg} 
              ${fullDaySection.colorClasses.border} 
              border
            `}
						>
							<div className="flex items-center mb-2">
								<Icon
									icon={fullDaySection.icon}
									className={fullDaySection.colorClasses.text}
									width={18}
								/>
								<h4
									className={`ml-2 font-semibold ${fullDaySection.colorClasses.text}`}
								>
									Full Day Meeting
								</h4>
							</div>

							<div className="text-gray-700 dark:text-gray-300">
								{renderEvent(fullDaySection.events)}
							</div>
						</div>
					)}

					{/* Time of Day Sections */}
					{!fullDaySection && (
						<div className="space-y-5">
							{timeOfDaySections.map((section) => (
								<div
									key={section.id}
									ref={section.ref}
									className={`
                    p-4 rounded-lg border
                    ${
											isTimeOfDayActive(section.id as any)
												? 'ring-2 ring-offset-2 ring-offset-white-0 dark:ring-offset-gray-900'
												: ''
										}
                    ${
											section.events.length > 0
												? `${section.colorClasses.bg} ${section.colorClasses.border}`
												: 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600'
										}
                    ${
											isTimeOfDayActive(section.id as any)
												? `ring-${section.color}-500`
												: ''
										}
                    scroll-mt-20
                  `}
								>
									<div className="flex items-center mb-2">
										<Icon
											icon={section.icon}
											className={
												section.events.length > 0
													? section.colorClasses.text
													: 'text-gray-500 dark:text-gray-400'
											}
											width={18}
										/>
										<h4
											className={`ml-2 font-semibold ${
												section.events.length > 0
													? section.colorClasses.text
													: 'text-gray-500 dark:text-gray-400'
											}`}
										>
											{section.title}
										</h4>
									</div>

									<div className="text-gray-700 dark:text-gray-300">
										{section.events.length > 0 ? (
											renderEvent(section.events)
										) : (
											<span className="text-gray-500 dark:text-gray-400 text-sm italic">
												No events scheduled
											</span>
										)}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default DayScheduleCard
