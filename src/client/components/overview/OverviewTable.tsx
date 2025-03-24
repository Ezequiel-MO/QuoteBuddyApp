import React, { useState, useEffect, useRef } from 'react'
import { Icon } from '@iconify/react'
import OTLogic from './OTLogic'
import { ISetting } from '@interfaces/setting'
import { useCurrentProject, useLocalStorageItem } from 'src/hooks'
import { useQuotation } from '../../context/QuotationContext'
import { Link } from 'react-scroll'
import { ReactNode } from 'react'
import { IDay } from '@interfaces/project'
import { motion, AnimatePresence } from 'framer-motion'

interface ScrollableCellProps {
	day: IDay
	section: string
	content: any[]
	children: ReactNode
}

// ScrollableCell component for event cells
const ScrollableCell = ({
	day,
	section,
	content,
	children
}: ScrollableCellProps) => {
	// Only make cells with content clickable
	if (!content || content.length === 0) {
		return <div className="h-full w-full">{children}</div>
	}

	// Use the same ID format that the sidebar uses
	const scrollId = `${day.date}-${section}`
	const [isAnimating, setIsAnimating] = useState(false)

	const handleClick = () => {
		setIsAnimating(true)
		// Reset animation state after animation completes
		setTimeout(() => setIsAnimating(false), 1000)
	}

	return (
		<Link
			to={scrollId}
			smooth={true}
			duration={1000}
			offset={-80}
			className="cursor-pointer hover:opacity-95 transition-opacity duration-200 relative group h-full w-full"
			onClick={handleClick}
		>
			<motion.div
				className="w-full h-full"
				animate={
					isAnimating ? { scale: [1, 0.9, 1.05, 1], opacity: [1, 0.8, 1] } : {}
				}
				transition={{ duration: 0.5, ease: 'easeInOut' }}
			>
				{children}
			</motion.div>
			<span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 rounded pointer-events-none transition-opacity"></span>
		</Link>
	)
}

// Color legend component
const ColorLegend = () => {
	return (
		<div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 p-4 bg-gray-100/70 dark:bg-gray-800/70 rounded-lg text-xs">
			<div className="flex items-center">
				<div className="w-4 h-4 rounded bg-blue-100 dark:bg-blue-800/30 border border-blue-200 dark:border-blue-700 mr-2"></div>
				<span className="text-gray-700 dark:text-gray-300">Full Day</span>
			</div>
			<div className="flex items-center">
				<div className="w-4 h-4 rounded bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 mr-2"></div>
				<span className="text-gray-700 dark:text-gray-300">
					Morning Activities
				</span>
			</div>
			<div className="flex items-center">
				<div className="w-4 h-4 rounded bg-yellow-50 dark:bg-yellow-800/50 border border-yellow-100 dark:border-yellow-800/60 mr-2"></div>
				<span className="text-gray-700 dark:text-gray-300">Lunch</span>
			</div>
			<div className="flex items-center">
				<div className="w-4 h-4 rounded bg-orange-50 dark:bg-orange-900/50 border border-orange-100 dark:border-orange-800/70 mr-2"></div>
				<span className="text-gray-700 dark:text-gray-300">
					Afternoon Activities
				</span>
			</div>
			<div className="flex items-center">
				<div className="w-4 h-4 rounded bg-purple-50 dark:bg-purple-900/40 border border-purple-100 dark:border-purple-800/80 mr-2"></div>
				<span className="text-gray-700 dark:text-gray-300">Dinner</span>
			</div>
			<div className="flex items-center">
				<div className="w-4 h-4 rounded bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50 mr-2"></div>
				<span className="text-gray-700 dark:text-gray-300">Transfers</span>
			</div>
		</div>
	)
}

const OverviewTable = () => {
	const { currentProject } = useCurrentProject()
	const {
		arrivalDay,
		departureDay,
		schedule,
		clientCompany,
		hideDates,
		suplementaryText
	} = currentProject
	const { fonts = [], colorPalette = [] } = clientCompany[0] || {}
	const item = useLocalStorageItem('settings', {}) as unknown as ISetting
	const secondary = item?.colorPalette?.secundary
	const tableRef = useRef(null)

	// Use context instead of local state
	const { state, dispatch } = useQuotation()

	// Get view mode from Redux state instead of local state
	const viewMode = suplementaryText ? 'detailed' : 'compact'

	// Toggle function using context
	const toggleOverviewExpanded = () => {
		dispatch({ type: 'TOGGLE_OVERVIEW' })
	}

	const iconColor = colorPalette.length > 0 ? colorPalette[2] : secondary
	const {
		transformDates,
		getDays,
		getEvents,
		renderEvent,
		getFullDayMeetingDays,
		getFullDayMeetingForDay,
		formatDate,
		hasArrivalTransfers,
		hasDepartureTransfers,
		getTransferLabel,
		generateColumnHeaders
	} = OTLogic()

	// Generate enhanced column headers with proper date formatting
	const columnHeaders = generateColumnHeaders(
		schedule,
		arrivalDay,
		departureDay
	)

	// Check if schedule is valid and has entries
	const hasValidSchedule = Array.isArray(schedule) && schedule.length > 0

	// Check if arrival day has transfers (safely)
	const arrivalHasTransfers = hasValidSchedule
		? hasArrivalTransfers(schedule[0])
		: false

	// Check if departure day has transfers (safely)
	const departureHasTransfers = hasValidSchedule
		? hasDepartureTransfers(schedule[schedule.length - 1])
		: false

	// Animation variants
	const tableVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				damping: 25,
				stiffness: 500
			}
		},
		exit: {
			opacity: 0,
			y: -20,
			transition: {
				type: 'spring',
				damping: 25,
				stiffness: 500
			}
		}
	}

	const cellVariants = {
		initial: { scale: 0.95, opacity: 0 },
		animate: {
			scale: 1,
			opacity: 1,
			transition: {
				type: 'spring',
				damping: 25,
				stiffness: 500,
				delay: 0.1
			}
		}
	}

	return (
		<motion.div
			className="bg-white-0 dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 max-w-full"
			initial="hidden"
			animate="visible"
			exit="exit"
			variants={tableVariants}
		>
			{/* Header with responsive padding, toggle option, and view mode selector */}
			<div className="p-2 sm:p-3 md:p-4 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-2">
				<h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-white-0 truncate">
					Project Schedule: {transformDates(arrivalDay, departureDay)}
				</h2>

				<div className="flex items-center space-x-2">
					{/* Expand/collapse toggle */}
					<button
						onClick={toggleOverviewExpanded}
						className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-md"
						aria-label={
							state.isOverviewExpanded ? 'Collapse table' : 'Expand table'
						}
					>
						<Icon
							icon={
								state.isOverviewExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'
							}
							width="20"
						/>
					</button>
				</div>
			</div>

			{/* Table container with responsive design */}
			<div
				className={`overflow-x-auto ${
					state.isOverviewExpanded ? '' : 'max-h-96 overflow-y-auto'
				}`}
				ref={tableRef}
			>
				<AnimatePresence mode="wait">
					<motion.div
						key={viewMode}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						<table className="w-full lg:table-fixed">
							{/* Table Header with improved column headers */}
							<thead className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
								<tr>
									{/* First column header - Schedule Items */}
									<th className="p-2 md:p-3 text-left font-bold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 bg-gray-200 dark:bg-gray-700">
										<motion.div
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.3 }}
											className="flex items-center justify-center"
										>
											<Icon
												icon="mdi:calendar-check"
												className="w-5 h-5 mr-2 text-orange-50"
											/>
											<span className="text-sm">Schedule Items</span>
										</motion.div>
									</th>

									{/* Day column headers with improved date formatting */}
									{columnHeaders.map((header, index) => (
										<th
											key={`day-header-${index}`}
											className="p-2 md:p-3 text-center font-bold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700 bg-gray-200 dark:bg-gray-700"
										>
											<motion.div
												className="flex flex-col items-center"
												initial={{ opacity: 0, y: -10 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: index * 0.05, duration: 0.3 }}
											>
												<span className="text-sm">{header.dayLabel}</span>
												<span className="text-xs text-gray-600 dark:text-gray-400">
													{header.dateLabel}
												</span>
											</motion.div>
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{state.isOverviewExpanded && (
									<>
										{/* Arrival Transfers Row - Only for first day, simplified display */}
										{arrivalHasTransfers && schedule.length > 0 && (
											<motion.tr
												className="bg-white-0 dark:bg-gray-900 hover:bg-indigo-50/20 dark:hover:bg-indigo-900/10 transition-colors"
												variants={cellVariants}
												initial="initial"
												animate="animate"
											>
												<td className="p-2 md:p-3 border-b border-gray-200 dark:border-gray-700 font-medium">
													<div className="flex items-center">
														<Icon
															icon="mdi:airplane-arrival"
															color={iconColor}
															width="18"
															className="mr-1 sm:mr-2"
														/>
														<span className="font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-300">
															Arrival
														</span>
													</div>
												</td>

												{/* Create empty cells for each day except the first one */}
												{schedule.map((day, index) => (
													<td
														key={`arrival-day-${index}`}
														className="p-1 sm:p-2 md:p-3 border-b border-gray-200 dark:border-gray-700"
													>
														{index === 0 ? (
															<ScrollableCell
																day={schedule[0]}
																section="transfers-in"
																content={schedule[0].transfer_in}
															>
																<div className="p-1 sm:p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50">
																	<span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
																		{getTransferLabel('arrival')}
																	</span>
																</div>
															</ScrollableCell>
														) : (
															<span className="text-xs sm:text-sm text-transparent">
																{/* Intentionally left empty */}
															</span>
														)}
													</td>
												))}
											</motion.tr>
										)}

										{/* Morning Events Row */}
										<motion.tr
											className="bg-white-0 dark:bg-gray-900 hover:bg-green-50/20 dark:hover:bg-green-900/10 transition-colors"
											variants={cellVariants}
											initial="initial"
											animate="animate"
										>
											<td className="p-2 md:p-3 border-b border-gray-200 dark:border-gray-700 font-medium">
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

											{getEvents(schedule, 'morningEvents').map(
												(events, dayIndex) => {
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
																<ScrollableCell
																	day={schedule[dayIndex]}
																	section="fullday-meetings"
																	content={fullDayMeeting}
																>
																	<div className="p-1 sm:p-2 rounded-lg bg-blue-100 dark:bg-blue-800/30 border border-blue-200 dark:border-blue-700">
																		<div className="text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300 mb-1 truncate">
																			Full Day
																		</div>
																		<span
																			className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 line-clamp-2"
																			dangerouslySetInnerHTML={{
																				__html: renderEvent(
																					fullDayMeeting,
																					viewMode
																				)
																			}}
																		></span>
																	</div>
																</ScrollableCell>
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
																<ScrollableCell
																	day={schedule[dayIndex]}
																	section="morning-events"
																	content={events}
																>
																	<div className="p-1 sm:p-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30">
																		<span
																			className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 line-clamp-2"
																			dangerouslySetInnerHTML={{
																				__html: renderEvent(events, viewMode)
																			}}
																		></span>
																	</div>
																</ScrollableCell>
															) : (
																<span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
																	{viewMode === 'detailed' ? 'No events' : ''}
																</span>
															)}
														</td>
													)
												}
											)}
										</motion.tr>

										{/* Lunch Row */}
										<motion.tr
											className="bg-white-0 dark:bg-gray-900 hover:bg-yellow-50/20 dark:hover:bg-yellow-900/10 transition-colors"
											variants={cellVariants}
											initial="initial"
											animate="animate"
											transition={{ delay: 0.1 }}
										>
											<td className="p-2 md:p-3 border-b border-gray-200 dark:border-gray-700 font-medium">
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

											{getEvents(schedule, 'lunch').map(
												(restaurants, dayIndex) => {
													// Skip rendering lunch cell if there's a full day meeting for this day
													const fullDayMeeting = getFullDayMeetingForDay(
														schedule,
														dayIndex
													)
													if (fullDayMeeting && fullDayMeeting.length > 0) {
														return null // This cell is already covered by the full day meeting
													}

													return (
														<td
															key={`lunch-${dayIndex}`}
															className="p-1 sm:p-2 md:p-3 border-b border-gray-200 dark:border-gray-700"
														>
															{restaurants && restaurants.length > 0 ? (
																<ScrollableCell
																	day={schedule[dayIndex]}
																	section="lunch"
																	content={restaurants}
																>
																	<div className="p-1 sm:p-2 rounded-lg bg-yellow-50 dark:bg-yellow-800/50 border border-yellow-100 dark:border-yellow-800/60">
																		<span
																			className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 line-clamp-3"
																			dangerouslySetInnerHTML={{
																				__html: renderEvent(
																					restaurants,
																					viewMode
																				)
																			}}
																		></span>
																	</div>
																</ScrollableCell>
															) : (
																<span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
																	{viewMode === 'detailed' ? 'No events' : ''}
																</span>
															)}
														</td>
													)
												}
											)}
										</motion.tr>

										{/* Afternoon Events Row */}
										<motion.tr
											className="bg-white-0 dark:bg-gray-900 hover:bg-orange-50/20 dark:hover:bg-orange-900/10 transition-colors"
											variants={cellVariants}
											initial="initial"
											animate="animate"
											transition={{ delay: 0.2 }}
										>
											<td className="p-2 md:p-3 border-b border-gray-200 dark:border-gray-700 font-medium">
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
																<ScrollableCell
																	day={schedule[dayIndex]}
																	section="afternoon-events"
																	content={events}
																>
																	<div className="p-1 sm:p-2 rounded-lg bg-orange-50 dark:bg-orange-900/50 border border-orange-100 dark:border-orange-800/70">
																		<span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
																			{renderEvent(events)}
																		</span>
																	</div>
																</ScrollableCell>
															) : (
																<span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
																	{viewMode === 'detailed' ? 'No events' : ''}
																</span>
															)}
														</td>
													)
												}
											)}
										</motion.tr>

										{/* Dinner Row */}
										<motion.tr
											className="bg-white-0 dark:bg-gray-900 hover:bg-purple-50/20 dark:hover:bg-purple-900/10 transition-colors"
											variants={cellVariants}
											initial="initial"
											animate="animate"
											transition={{ delay: 0.3 }}
										>
											<td className="p-2 md:p-3 border-b border-gray-200 dark:border-gray-700 font-medium">
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

											{getEvents(schedule, 'dinner').map(
												(restaurants, dayIndex) => (
													<td
														key={`dinner-${dayIndex}`}
														className="p-1 sm:p-2 md:p-3 border-b border-gray-200 dark:border-gray-700"
													>
														{restaurants && restaurants.length > 0 ? (
															<ScrollableCell
																day={schedule[dayIndex]}
																section="dinner"
																content={restaurants}
															>
																<div className="p-1 sm:p-2 rounded-lg bg-purple-50 dark:bg-purple-900/40 border border-purple-100 dark:border-purple-800/80">
																	<span
																		className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 line-clamp-2"
																		dangerouslySetInnerHTML={{
																			__html: renderEvent(restaurants, viewMode)
																		}}
																	></span>
																</div>
															</ScrollableCell>
														) : (
															<span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
																{viewMode === 'detailed' ? 'No events' : ''}
															</span>
														)}
													</td>
												)
											)}
										</motion.tr>

										{/* Departure Transfers Row - Only for last day, simplified display */}
										{departureHasTransfers &&
											schedule.length > 0 &&
											schedule[schedule.length - 1].transfer_out && (
												<motion.tr
													className="bg-white-0 dark:bg-gray-900 hover:bg-indigo-50/20 dark:hover:bg-indigo-900/10 transition-colors"
													variants={cellVariants}
													initial="initial"
													animate="animate"
													transition={{ delay: 0.4 }}
												>
													<td className="p-2 md:p-3 border-b border-gray-200 dark:border-gray-700 font-medium">
														<div className="flex items-center">
															<Icon
																icon="mdi:airplane-takeoff"
																color={iconColor}
																width="18"
																className="mr-1 sm:mr-2"
															/>
															<span className="font-medium text-xs sm:text-sm text-gray-700 dark:text-gray-300">
																Departure
															</span>
														</div>
													</td>

													{/* Map through each day, only show departure transfer on the last day */}
													{schedule.map((day, index) => (
														<td
															key={`departure-day-${index}`}
															className="p-1 sm:p-2 md:p-3 border-b border-gray-200 dark:border-gray-700"
														>
															{index === schedule.length - 1 ? (
																<ScrollableCell
																	day={schedule[schedule.length - 1]}
																	section="transfers-out"
																	content={
																		schedule[schedule.length - 1].transfer_out
																	}
																>
																	<div className="p-1 sm:p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50">
																		<span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
																			{getTransferLabel('departure')}
																		</span>
																	</div>
																</ScrollableCell>
															) : (
																<span className="text-xs sm:text-sm text-transparent">
																	{/* Intentionally left empty */}
																</span>
															)}
														</td>
													))}
												</motion.tr>
											)}
									</>
								)}
							</tbody>
						</table>
					</motion.div>
				</AnimatePresence>
			</div>

			{/* Color Legend */}
			<AnimatePresence>
				{state.isOverviewExpanded && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: 'auto' }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3 }}
					>
						<ColorLegend />
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}

const mealIconMap = {
	morningEvents: 'mdi:weather-sunset-up',
	lunch: 'bx:bx-restaurant',
	afternoonEvents: 'mdi:weather-sunset-down',
	dinner: 'cil:dinner'
}

export default OverviewTable
