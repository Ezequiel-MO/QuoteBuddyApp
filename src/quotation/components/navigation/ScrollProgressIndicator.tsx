import React, { useEffect, useState } from 'react'
import { useQuotation } from '../../context/QuotationContext'
import { useScrollToSection } from '../../hooks/useScrollToSection'
import { Icon } from '@iconify/react'

interface ScrollProgressIndicatorProps {
	sections: string[]
}

const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = ({
	sections
}) => {
	const { state } = useQuotation()
	const scrollToSection = useScrollToSection()
	const [showIndicator, setShowIndicator] = useState(false)
	const [scrollProgress, setScrollProgress] = useState(0)

	// Calculate total scroll progress
	useEffect(() => {
		const handleScroll = () => {
			const windowHeight = window.innerHeight
			const documentHeight = document.documentElement.scrollHeight
			const scrollTop = window.scrollY

			// Calculate overall scroll percentage
			const scrollPercentage =
				(scrollTop / (documentHeight - windowHeight)) * 100
			setScrollProgress(Math.min(100, Math.max(0, scrollPercentage)))

			// Show indicator only after scrolling down a bit
			setShowIndicator(scrollTop > 200)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Get icon based on section ID
	const getSectionIcon = (sectionId: string) => {
		if (sectionId.includes('hotels')) return 'bx:hotel'
		if (sectionId.includes('budget')) return 'ri:money-euro-circle-line'
		if (sectionId.includes('destination')) return 'mdi:map-marker'
		return 'bx:calendar' // Default to calendar for schedule/dates
	}

	// Get section name from ID
	const getSectionName = (sectionId: string) => {
		if (sectionId.includes('hotels')) return 'Hotels'
		if (sectionId.includes('budget')) return 'Budget'
		if (sectionId.includes('destination')) return 'Destination'
		if (sectionId.includes('-')) {
			// Handle subsections (like morning-events)
			const parts = sectionId.split('-')
			if (parts.length >= 2) {
				const subsection = parts[parts.length - 1]
				return subsection.charAt(0).toUpperCase() + subsection.slice(1)
			}
		}

		// Try to format date for schedule days
		try {
			return new Date(sectionId).toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric'
			})
		} catch (e) {
			return sectionId // Fallback
		}
	}

	if (!showIndicator) {
		return null
	}

	return (
		<div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-30 hidden lg:block">
			<div className="flex flex-col items-center space-y-2">
				{/* Main progress indicator */}
				<div className="w-1 h-40 bg-gray-200 dark:bg-gray-700 rounded-full relative">
					<div
						className="absolute bottom-0 left-0 right-0 bg-cyan-500 rounded-full transition-all duration-300 ease-out"
						style={{ height: `${scrollProgress}%` }}
					/>
				</div>

				{/* Section indicators */}
				<div className="space-y-3 mt-2">
					{sections
						.filter((id) => !id.includes('-')) // Only show main sections, not subsections
						.map((sectionId, index) => {
							const isActive = state.activeSection === sectionId
							const progress = state.sectionProgress[sectionId] || 0

							return (
								<div
									key={sectionId}
									className="group relative"
									onClick={() => scrollToSection(sectionId)}
								>
									{/* Tooltip */}
									<div className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
										<div className="bg-gray-800 text-white-0 px-2 py-1 text-xs rounded shadow">
											{getSectionName(sectionId)}
										</div>
									</div>

									{/* Indicator dot */}
									<div
										className={`
                      w-3 h-3 rounded-full cursor-pointer transition-all duration-300
                      flex items-center justify-center
                      ${
												isActive
													? 'bg-cyan-500 ring-2 ring-cyan-200 dark:ring-cyan-900/50'
													: 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
											}
                    `}
									>
										{isActive && progress >= 100 && (
											<Icon
												icon="mdi:check"
												className="text-white-0"
												width="10"
												height="10"
											/>
										)}
									</div>
								</div>
							)
						})}
				</div>

				{/* Back to top button */}
				<button
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					className="mt-3 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
					aria-label="Back to top"
				>
					<Icon
						icon="mdi:arrow-up"
						className="text-gray-700 dark:text-gray-300"
						width="16"
						height="16"
					/>
				</button>
			</div>
		</div>
	)
}

export default ScrollProgressIndicator
