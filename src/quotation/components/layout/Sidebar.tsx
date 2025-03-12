import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { useQuotation } from '../../context/QuotationContext'
import { useScrollToSection } from '../../hooks/useScrollToSection'
import { useBreakpoint } from '../../hooks/useMediaQuery'
import { useCurrentProject } from 'src/hooks'
import { checkDayIsEmpty } from 'src/helper/checkEmptyDay'
import { IProject } from '@interfaces/project'

const Sidebar: React.FC = () => {
	const { state } = useQuotation()
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const {
		hotels,
		schedule,
		budget,
		multiDestination,
		hideDates,
		clientCompany
	} = currentProject
	const { colorPalette = [] } = clientCompany[0] || {}
	const scrollToSection = useScrollToSection()
	const { isMobile } = useBreakpoint()

	// Expanded/collapsed state for each date in the schedule
	const [expandedDates, setExpandedDates] = useState<{
		[key: string]: boolean
	}>({})

	// Toggle expanded state for a date
	const toggleDateExpanded = (date: string) => {
		setExpandedDates((prev) => ({
			...prev,
			[date]: !prev[date]
		}))
	}

	// Get primary color from palette or use default
	const primaryColor = colorPalette.length > 0 ? colorPalette[2] : '#ea5933'

	// Handle section click
	const handleSectionClick = (sectionId: string) => {
		scrollToSection(`${sectionId}_id`)

		// On mobile, close sidebar after selection
		if (isMobile) {
			// We would dispatch here, but this doesn't directly touch context state
			// Just rely on the parent component to handle this via click propagation
		}
	}

	return (
		<div className="sticky top-0 h-full overflow-y-auto py-4 px-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
			{/* Sidebar Header */}
			<div className="px-4 mb-6">
				<h2 className="text-lg font-bold text-gray-800 dark:text-white-0">
					Project Sections
				</h2>
				<p className="text-sm text-gray-500 dark:text-gray-400">
					Navigate through your quotation
				</p>
			</div>

			{/* Sidebar Content */}
			<div className="space-y-1">
				{/* Hotels Section */}
				{hotels && hotels.length > 0 && !multiDestination && (
					<SidebarItem
						icon="bx:hotel"
						title="Hotels"
						sectionId="hotels"
						isActive={state.activeSection === 'hotels_id'}
						progress={state.sectionProgress['hotels_id'] || 0}
						onClick={() => handleSectionClick('hotels')}
						iconColor={primaryColor}
					/>
				)}

				{/* Schedule Days */}
				{!hideDates ? (
					schedule?.map((day, index) => {
						const dayIsEmpty = checkDayIsEmpty(day)
						if (!dayIsEmpty || (dayIsEmpty && multiDestination)) {
							// Format date for display
							const formattedDate = new Date(day.date).toLocaleDateString(
								'en-US',
								{
									weekday: 'short',
									month: 'short',
									day: 'numeric'
								}
							)

							const isExpanded = expandedDates[day.date] || false
							const isActive = state.activeSection === `${day.date}_id`

							return (
								<div key={index} className="space-y-0.5">
									<SidebarItem
										icon="bx:calendar"
										title={formattedDate}
										sectionId={day.date}
										isActive={isActive}
										progress={state.sectionProgress[`${day.date}_id`] || 0}
										onClick={() => handleSectionClick(day.date)}
										iconColor={primaryColor}
										hasSubitems={true}
										isExpanded={isExpanded}
										onToggleExpanded={() => toggleDateExpanded(day.date)}
									/>

									{/* Subitems for this day */}
									{isExpanded && (
										<div className="ml-8 mt-1 space-y-0.5">
											{day.morningEvents.events.length > 0 && (
												<SidebarSubitem
													title="Morning Events"
													sectionId={`${day.date}-morning-events`}
													isActive={
														state.activeSection ===
														`${day.date}-morning-events_id`
													}
													onClick={() =>
														handleSectionClick(`${day.date}-morning-events`)
													}
												/>
											)}

											{day.lunch.restaurants.length > 0 && (
												<SidebarSubitem
													title="Lunch"
													sectionId={`${day.date}-lunch`}
													isActive={
														state.activeSection === `${day.date}-lunch_id`
													}
													onClick={() =>
														handleSectionClick(`${day.date}-lunch`)
													}
												/>
											)}

											{day.afternoonEvents.events.length > 0 && (
												<SidebarSubitem
													title="Afternoon Events"
													sectionId={`${day.date}-afternoon-events`}
													isActive={
														state.activeSection ===
														`${day.date}-afternoon-events_id`
													}
													onClick={() =>
														handleSectionClick(`${day.date}-afternoon-events`)
													}
												/>
											)}

											{day.dinner.restaurants.length > 0 && (
												<SidebarSubitem
													title="Dinner"
													sectionId={`${day.date}-dinner`}
													isActive={
														state.activeSection === `${day.date}-dinner_id`
													}
													onClick={() =>
														handleSectionClick(`${day.date}-dinner`)
													}
												/>
											)}
										</div>
									)}
								</div>
							)
						}
						return null
					})
				) : (
					<SidebarItem
						icon="bx:calendar"
						title="Offer"
						sectionId="offer"
						isActive={state.activeSection === 'offer_id'}
						progress={state.sectionProgress['offer_id'] || 0}
						onClick={() => handleSectionClick('offer')}
						iconColor={primaryColor}
					/>
				)}

				{/* Budget Section */}
				{(currentProject.budget === 'budget' ||
					currentProject.budget === 'budgetAsPdf') && (
					<SidebarItem
						icon="ri:money-euro-circle-line"
						title="Budget"
						sectionId="budget"
						isActive={state.activeSection === 'budget_id'}
						progress={state.sectionProgress['budget_id'] || 0}
						onClick={() => handleSectionClick('budget')}
						iconColor={primaryColor}
					/>
				)}

				{/* Destination Section */}
				<SidebarItem
					icon="mdi:map-marker"
					title="Destination"
					sectionId="destination"
					isActive={state.activeSection === 'destination_id'}
					progress={state.sectionProgress['destination_id'] || 0}
					onClick={() => handleSectionClick('destination')}
					iconColor={primaryColor}
				/>
			</div>
		</div>
	)
}

// Sidebar main item component
interface SidebarItemProps {
	icon: string
	title: string
	sectionId: string
	isActive: boolean
	progress: number
	onClick: () => void
	iconColor: string
	hasSubitems?: boolean
	isExpanded?: boolean
	onToggleExpanded?: () => void
}

const SidebarItem: React.FC<SidebarItemProps> = ({
	icon,
	title,
	sectionId,
	isActive,
	progress,
	onClick,
	iconColor,
	hasSubitems = false,
	isExpanded = false,
	onToggleExpanded
}) => {
	return (
		<div className="relative">
			{/* Progress indicator */}
			{progress > 0 && (
				<div
					className="absolute left-0 top-0 bottom-0 bg-cyan-100 dark:bg-cyan-900/30 rounded-l-md z-0"
					style={{ width: `${progress}%`, maxWidth: '100%' }}
				/>
			)}

			<div
				onClick={onClick}
				className={`
          relative z-10 flex items-center justify-between px-4 py-2 rounded-md cursor-pointer
          group transition-all duration-200 
          ${
						isActive
							? 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-800 dark:text-cyan-200 font-medium'
							: 'hover:bg-gray-100 dark:hover:bg-gray-700/50'
					}
        `}
			>
				<div className="flex items-center space-x-3">
					<Icon
						icon={icon}
						className="flex-shrink-0"
						color={isActive ? iconColor : 'currentColor'}
						width="22"
						height="22"
					/>
					<span
						className={`transition-colors duration-200 text-sm ${
							isActive ? '' : 'text-gray-700 dark:text-gray-300'
						}`}
					>
						{title}
					</span>
				</div>

				{hasSubitems && onToggleExpanded && (
					<button
						onClick={(e) => {
							e.stopPropagation()
							onToggleExpanded()
						}}
						className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
					>
						<Icon
							icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}
							className="text-gray-500 dark:text-gray-400"
							width="16"
							height="16"
						/>
					</button>
				)}
			</div>
		</div>
	)
}

// Sidebar subitem component
interface SidebarSubitemProps {
	title: string
	sectionId: string
	isActive: boolean
	onClick: () => void
}

const SidebarSubitem: React.FC<SidebarSubitemProps> = ({
	title,
	sectionId,
	isActive,
	onClick
}) => {
	return (
		<div
			onClick={onClick}
			className={`
        flex items-center px-3 py-1.5 rounded-md cursor-pointer 
        transition-all duration-200 
        ${
					isActive
						? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 font-medium'
						: 'hover:bg-gray-50 dark:hover:bg-gray-700/30 text-gray-600 dark:text-gray-400'
				}
      `}
		>
			<div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 mr-2" />
			<span className="text-xs">{title}</span>
		</div>
	)
}

export default Sidebar
