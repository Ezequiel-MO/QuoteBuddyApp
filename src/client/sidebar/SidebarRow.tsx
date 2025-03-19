import { useEffect, useState } from 'react'
import { Link } from 'react-scroll'
import { Icon } from '@iconify/react'
import { useCurrentProject } from 'src/hooks'
import { IProject, IDay } from '@interfaces/project'
import { SidebarSubtitles } from './SidebarSubtitles'
import { months } from 'src/constants/dates'

interface Props {
	iconText: string
	title: string
	isScheduleDay?: boolean
	dayIndex?: number
	targetId?: string
}

export const SidebarRow = ({
	iconText,
	title,
	isScheduleDay = false,
	dayIndex,
	targetId
}: Props) => {
	const [menuOpen, setMenuOpen] = useState(false)
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { schedule } = currentProject
	const { colorPalette = [] } = currentProject.clientCompany?.[0] || {}
	const [isActive, setIsActive] = useState(false)
	const [formattedDate, setFormattedDate] = useState<string>('')

	// Format the title for better display
	const formattedTitle = title?.replace(/^\w/, (c: string) => c.toUpperCase())

	// Format date for display (to avoid "Day 2: Day 2" redundancy)
	useEffect(() => {
		if (isScheduleDay && dayIndex !== undefined && title) {
			// Check if the title is just a day number or contains an actual date
			const isDayNumber = /^day\s*\d+$/i.test(title)

			if (isDayNumber || title.toLowerCase().includes('day')) {
				try {
					// Try to format the date from the actual schedule date
					const day = schedule[dayIndex] as IDay
					if (day && day.date) {
						const dateParts = day.date.split('-')
						if (dateParts.length === 3) {
							const monthName = months[parseInt(dateParts[1]) - 1]
							const dayNum = parseInt(dateParts[2])
							setFormattedDate(`${monthName} ${dayNum}`)
						} else {
							setFormattedDate('')
						}
					}
				} catch (err) {
					setFormattedDate('')
				}
			}
		}
	}, [isScheduleDay, dayIndex, title, schedule])

	// Determine the correct target ID
	const scrollTargetId = targetId || `${title}_id`

	// Show active state based on scroll position
	useEffect(() => {
		if (!isScheduleDay && !targetId) return

		const handleScroll = () => {
			const element = document.getElementById(scrollTargetId)
			if (element) {
				const rect = element.getBoundingClientRect()
				setIsActive(rect.top <= 100 && rect.bottom >= 100)
			}
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [isScheduleDay, scrollTargetId, targetId])

	return (
		<div className="relative group">
			<Link
				to={scrollTargetId}
				spy={true}
				smooth={true}
				duration={500}
				offset={-100}
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
				<div className="flex-shrink-0 text-gray-500 group-hover:text-orange-50">
					<Icon
						icon={iconText}
						className={`w-5 h-5 ${isActive ? 'text-orange-50' : ''}`}
					/>
				</div>

				<span
					className={`
          ml-3 text-sm font-medium
          ${
						isActive
							? 'text-orange-50 dark:text-orange-50'
							: 'text-gray-700 dark:text-gray-300 group-hover:text-orange-50 dark:group-hover:text-orange-50'
					}
        `}
				>
					{isScheduleDay && dayIndex !== undefined
						? formattedDate
							? `Day ${dayIndex + 1}: ${formattedDate}`
							: `Day ${dayIndex + 1}`
						: formattedTitle}
				</span>

				{isScheduleDay && schedule && dayIndex !== undefined && (
					<Icon
						icon={menuOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'}
						className="ml-auto h-4 w-4 text-gray-500 group-hover:text-orange-50"
					/>
				)}
			</Link>

			{isScheduleDay && schedule && dayIndex !== undefined && (
				<div
					className={`pl-8 overflow-hidden transition-all duration-200 ease-in-out
          ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}
				>
					<SidebarSubtitles
						title={title}
						menuOpen={menuOpen}
						setMenuOpen={setMenuOpen}
						schedule={schedule}
					/>
				</div>
			)}
		</div>
	)
}
