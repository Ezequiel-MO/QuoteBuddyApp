import { IProject } from '@interfaces/project'
import { useCurrentProject } from 'src/hooks'
import { SidebarRow } from './SidebarRow'
import { checkDayIsEmpty } from 'src/helper/checkEmptyDay'
import { useQuotation } from '@client/context/QuotationContext'
import { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion' // Optional: add animations

const Sidebar = () => {
	const { state } = useQuotation()
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { schedule, hotels, multiDestination, hideDates } = currentProject
	const [scrolledDown, setScrolledDown] = useState(false)

	// Add scroll detection for better UX
	useEffect(() => {
		const handleScroll = () => {
			setScrolledDown(window.scrollY > 100)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Animation variants for the sidebar
	const sidebarVariants = {
		open: { x: 0, opacity: 1 },
		closed: { x: '-100%', opacity: 0 }
	}

	return (
		<AnimatePresence>
			{state.isSidebarOpen && (
				<motion.div
					className={`
            fixed top-24 left-0 bottom-0 z-40 w-64
            transition-all duration-300 ease-in-out
            ${scrolledDown ? 'translate-y-0' : 'translate-y-0'}
            overflow-y-auto overflow-x-hidden
            backdrop-blur-sm
          `}
					initial="closed"
					animate="open"
					exit="closed"
					variants={sidebarVariants}
					transition={{ type: 'tween', duration: 0.25 }}
				>
					<div
						className="
            p-4 h-full rounded-r-xl border-r border-t border-b
            border-gray-200 dark:border-gray-700
            bg-white-0/95 dark:bg-gray-800/95
            shadow-xl
          "
					>
						<div className="sticky top-0 pt-2 pb-4 bg-white-0/80 dark:bg-gray-800/80 backdrop-blur-sm z-10 border-b border-gray-200 dark:border-gray-700">
							<h2 className="text-xl font-bold text-orange-50 flex items-center mb-2">
								<Icon icon="heroicons:bookmark" className="mr-2 h-6 w-6" />
								Navigation
							</h2>
						</div>

						<nav className="mt-4 space-y-1">
							{/* Main Sections */}
							<div className="mb-6">
								<h3 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-2 px-3">
									Main Sections
								</h3>

								{/* Hotels Section */}
								{hotels && hotels.length > 0 && !multiDestination && (
									<SidebarRow
										iconText="heroicons:building-office-2"
										title="hotels"
									/>
								)}

								{/* Budget Section */}
								{currentProject.budget === 'budget' ||
								currentProject.budget === 'budgetAsPdf' ? (
									<SidebarRow iconText="heroicons:banknotes" title="budget" />
								) : null}
							</div>

							{/* Schedule Days */}
							{!hideDates && schedule && schedule.length > 0 && (
								<div>
									<h3 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-2 px-3">
										Daily Schedule
									</h3>

									<div className="space-y-1 max-h-[50vh] overflow-y-auto pr-2 sidebar-scroll">
										{schedule?.map((day, index) => {
											const dayIsEmpty = checkDayIsEmpty(day)
											if (!dayIsEmpty || (dayIsEmpty && multiDestination)) {
												return (
													<SidebarRow
														key={index}
														iconText="heroicons:calendar-days"
														title={day.date}
														isScheduleDay={true}
														dayIndex={index}
													/>
												)
											}
											return null
										})}
									</div>
								</div>
							)}

							{/* Single offer option for hidden dates */}
							{hideDates && (
								<SidebarRow iconText="heroicons:document-text" title="Offer" />
							)}
						</nav>

						{/* Footer/Support section */}
						<div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
							<a
								href="#"
								className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-orange-50 dark:hover:text-orange-50 rounded-lg group"
							>
								<Icon
									icon="heroicons:question-mark-circle"
									className="mr-3 h-5 w-5 text-gray-500 group-hover:text-orange-50"
								/>
								Help & Support
							</a>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default Sidebar
