import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-scroll'
import { Icon } from '@iconify/react'
import { useCurrentProject } from 'src/hooks'
import { IProject, IDay } from '@interfaces/project'
import { SidebarSubtitles } from './SidebarSubtitles'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
	iconText: string
	title: string
	isScheduleDay?: boolean
	dayIndex?: number
	targetId?: string
}

// Month names for formatting
const MONTH_NAMES = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
]

// Day of week names
const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const SidebarRow = ({
	iconText,
	title,
	isScheduleDay = false,
	dayIndex,
	targetId
}: Props) => {
	const [menuOpen, setMenuOpen] = useState(false)
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { schedule, arrivalDay, departureDay } = currentProject
	const { colorPalette = [] } = currentProject.clientCompany?.[0] || {}
	const [isActive, setIsActive] = useState(false)
	const [formattedDate, setFormattedDate] = useState<string>('')
	const [isVisible, setIsVisible] = useState(false)
	const rowRef = useRef<HTMLDivElement>(null)

	// Format the title for better display
	const formattedTitle = title?.replace(/^\w/, (c: string) => c.toUpperCase())

	// Safely parse a date string in YYYY-MM-DD format
	const parseISODate = (dateString: string): Date | null => {
		try {
			// Validate format
			if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
				console.warn(`Date string not in YYYY-MM-DD format: ${dateString}`)
				return null
			}

			const [yearStr, monthStr, dayStr] = dateString.split('-')
			const year = parseInt(yearStr, 10)
			const month = parseInt(monthStr, 10) - 1 // JS months are 0-indexed
			const day = parseInt(dayStr, 10)

			// Basic validation
			if (month < 0 || month > 11 || day < 1 || day > 31) {
				console.warn(
					`Invalid date components: year=${year}, month=${
						month + 1
					}, day=${day}`
				)
				return null
			}

			// Create date and validate
			const date = new Date(year, month, day)
			if (
				date.getFullYear() !== year ||
				date.getMonth() !== month ||
				date.getDate() !== day
			) {
				console.warn(`Date validation failed for ${dateString}`)
				return null
			}

			return date
		} catch (error) {
			console.error(`Error parsing date: ${dateString}`, error)
			return null
		}
	}

	// Format date for display based on project's arrival day
	useEffect(() => {
		if (!isScheduleDay || dayIndex === undefined) return

		try {
			// Special cases for first and last days
			if (dayIndex === 0) {
				setFormattedDate('Arrival Day')
				return
			}

			if (dayIndex === schedule.length - 1) {
				setFormattedDate('Dept Day')
				return
			}

			// Calculate the date for this day by adding days to the arrival date
			const arrivalDate = parseISODate(arrivalDay)
			if (!arrivalDate) {
				console.warn(`Could not parse arrival day: ${arrivalDay}`)
				setFormattedDate('')
				return
			}

			// Clone the arrival date and add the day index to get the current day's date
			const currentDayDate = new Date(arrivalDate)
			currentDayDate.setDate(arrivalDate.getDate() + dayIndex)

			// Get the date parts
			const dayOfWeek = DAYS_OF_WEEK[currentDayDate.getDay()]
			const month = MONTH_NAMES[currentDayDate.getMonth()]
			const dayOfMonth = currentDayDate.getDate()
			const year = currentDayDate.getFullYear()

			// Only include year for Day 2
			if (dayIndex === 1) {
				setFormattedDate(`${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`)
			} else {
				setFormattedDate(`${dayOfWeek}, ${month} ${dayOfMonth}`)
			}
		} catch (error) {
			console.error('Error formatting date:', error)
			setFormattedDate('')
		}
	}, [isScheduleDay, dayIndex, arrivalDay, departureDay, schedule])

	// Determine the correct target ID
	const scrollTargetId = targetId || `${title}_id`

	// Show active state based on scroll position
	useEffect(() => {
		if (!isScheduleDay && !targetId) return

		const handleScroll = () => {
			const element = document.getElementById(scrollTargetId)
			if (element) {
				const rect = element.getBoundingClientRect()
				const newActive = rect.top <= 100 && rect.bottom >= 100
				setIsActive(newActive)

				// If the element becomes active, make sure the sidebar item is visible
				if (newActive && rowRef.current) {
					rowRef.current.scrollIntoView({
						behavior: 'smooth',
						block: 'nearest'
					})
				}
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [isScheduleDay, scrollTargetId, targetId])

	// Intersection Observer for entry animation
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsVisible(true)
					}
				})
			},
			{ threshold: 0.1 }
		)

		if (rowRef.current) {
			observer.observe(rowRef.current)
		}

		return () => {
			if (rowRef.current) {
				observer.unobserve(rowRef.current)
			}
		}
	}, [])

	// Animation variants
	const itemVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.3,
				type: 'spring',
				stiffness: 500,
				damping: 25
			}
		}
	}

	return (
		<motion.div
			className="relative group"
			ref={rowRef}
			initial="hidden"
			animate={isVisible ? 'visible' : 'hidden'}
			variants={itemVariants}
		>
			<Link
				to={scrollTargetId}
				spy={true}
				smooth={true}
				duration={800}
				offset={-80}
				className={`
          flex items-center w-full px-3 py-2.5 rounded-lg
          transition-all duration-200 ease-in-out
          cursor-pointer
          ${
						isActive
							? 'bg-orange-50/10 dark:bg-orange-50/20'
							: 'hover:bg-gray-100 dark:hover:bg-gray-700'
					}
        `}
				onMouseEnter={() => setMenuOpen(true)}
				onMouseLeave={() => setMenuOpen(false)}
			>
				<motion.div
					className="flex-shrink-0 text-gray-500 group-hover:text-orange-50"
					whileHover={{ scale: 1.2, rotate: 5 }}
					whileTap={{ scale: 0.9 }}
				>
					<Icon
						icon={iconText}
						className={`w-5 h-5 ${isActive ? 'text-orange-50' : ''}`}
					/>
				</motion.div>

				<motion.span
					className={`
            ml-3 text-sm font-medium
            ${
							isActive
								? 'text-orange-50 dark:text-orange-50'
								: 'text-gray-700 dark:text-gray-300 group-hover:text-orange-50 dark:group-hover:text-orange-50'
						}
          `}
					whileHover={{ x: 3 }}
					transition={{ type: 'spring', stiffness: 500 }}
				>
					{isScheduleDay && dayIndex !== undefined
						? formattedDate
							? `Day ${dayIndex + 1}: ${formattedDate}`
							: `Day ${dayIndex + 1}`
						: formattedTitle}
				</motion.span>

				{isScheduleDay && schedule && dayIndex !== undefined && (
					<motion.div
						animate={{ rotate: menuOpen ? 180 : 0 }}
						transition={{ duration: 0.3 }}
						className="ml-auto"
					>
						<Icon
							icon={'heroicons:chevron-down'}
							className="h-4 w-4 text-gray-500 group-hover:text-orange-50"
						/>
					</motion.div>
				)}
			</Link>

			{isScheduleDay && schedule && dayIndex !== undefined && (
				<AnimatePresence>
					{menuOpen && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: 'auto', opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.3 }}
							className="pl-8 overflow-hidden"
						>
							<SidebarSubtitles
								title={title}
								menuOpen={menuOpen}
								setMenuOpen={setMenuOpen}
								schedule={schedule}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			)}

			{/* Animated indicator for active item */}
			{isActive && (
				<motion.div
					className="absolute left-0 top-0 bottom-0 w-1 bg-orange-50 rounded-full"
					layoutId="activeIndicator"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3 }}
				/>
			)}
		</motion.div>
	)
}
