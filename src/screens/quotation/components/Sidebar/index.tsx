// src/screens/quotation/components/Sidebar/index.tsx
import React, { useEffect, useState } from 'react'
import { useQuotation } from '../../context/QuotationContext'
import SidebarHeader from './SidebarHeader'
import DaysList from './DaysList'
import HotelsList from './HotelsList'
import BudgetSection from './BudgetSection'
import MapNavigation from './MapNavigation'

import { Icon } from '@iconify/react'
import SidebarNavItem from './SidebarNavItem'

const Sidebar: React.FC = () => {
	const {
		isSidebarOpen,
		toggleSidebar,
		expandedSections,
		toggleSection,
		scrollToSection,
		activeSection,
		currentProject,
		isMapVisible,
		toggleMapView
	} = useQuotation()

	const [offsetY, setOffsetY] = useState(0)

	// Handle scroll events for visual effects
	useEffect(() => {
		const handleScroll = () => {
			setOffsetY(window.pageYOffset)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Get color palette from current project
	const clientCompany = currentProject?.clientCompany?.[0] || {}
	const colorPalette = clientCompany.colorPalette || []
	const primaryColor = colorPalette[0] || '#4F46E5' // Default to indigo if no color provided

	return (
		<aside
			className={`
        fixed top-0 left-0 z-40 h-screen w-64 lg:w-72
        bg-white-0 dark:bg-gray-800 shadow-lg 
        transition-transform duration-300 ease-in-out
        ${
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
				}
        overflow-hidden flex flex-col
      `}
		>
			<SidebarHeader onClose={() => toggleSidebar(false)} />

			{/* Navigation Menu */}
			<nav className="flex-1 px-3 py-3 overflow-y-auto scroll-smooth">
				{/* Main Sections */}
				<div className="mb-6">
					<SidebarNavItem
						title="Overview"
						icon="mdi:information-outline"
						isActive={activeSection === 'overview'}
						onClick={() => scrollToSection('overview')}
						accentColor={primaryColor}
					/>

					<SidebarNavItem
						title="Schedule"
						icon="mdi:calendar-outline"
						isActive={activeSection === 'schedule'}
						onClick={() => scrollToSection('schedule')}
						accentColor={primaryColor}
					/>

					<SidebarNavItem
						title="Accommodation"
						icon="mdi:bed-outline"
						isActive={activeSection === 'accommodation'}
						onClick={() => scrollToSection('accommodation')}
						accentColor={primaryColor}
					/>

					<SidebarNavItem
						title="Transfers"
						icon="mdi:bus"
						isActive={activeSection === 'transfers'}
						onClick={() => scrollToSection('transfers')}
						accentColor={primaryColor}
					/>

					<SidebarNavItem
						title="Budget"
						icon="mdi:currency-usd"
						isActive={activeSection === 'budget'}
						onClick={() => scrollToSection('budget')}
						accentColor={primaryColor}
					/>

					<SidebarNavItem
						title="Map View"
						icon="mdi:map"
						isActive={isMapVisible}
						onClick={() => toggleMapView()}
						accentColor={primaryColor}
					/>
				</div>

				{/* Divider */}
				<div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

				{/* Expandable Sections */}
				<div className="space-y-2">
					{/* Days Section - Collapsible */}
					<DaysList
						isExpanded={expandedSections.days}
						onToggle={() => toggleSection('days')}
						accentColor={primaryColor}
					/>

					{/* Hotels Section - Collapsible */}
					<HotelsList
						isExpanded={expandedSections.hotels}
						onToggle={() => toggleSection('hotels')}
						accentColor={primaryColor}
					/>

					{/* Budget Section - Collapsible */}
					<BudgetSection
						isExpanded={expandedSections.budget}
						onToggle={() => toggleSection('budget')}
						accentColor={primaryColor}
					/>

					{/* Map Navigation Section */}
					<MapNavigation
						isExpanded={expandedSections.map}
						onToggle={() => toggleSection('map')}
						accentColor={primaryColor}
					/>
				</div>
			</nav>

			{/* Bottom Actions */}
			<div className="p-4 border-t border-gray-200 dark:border-gray-700">
				<button
					className="w-full flex items-center justify-center px-4 py-2 rounded-md text-white-0 text-sm font-medium transition-colors"
					style={{ backgroundColor: primaryColor }}
				>
					<Icon icon="mdi:download" className="mr-2" width={16} />
					Download PDF
				</button>

				<div className="mt-4 text-center">
					<button
						className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center justify-center mx-auto"
						onClick={() => toggleSidebar(false)}
					>
						<Icon icon="mdi:chevron-left" className="mr-1" width={16} />
						<span className="lg:hidden">Close Menu</span>
					</button>
				</div>
			</div>
		</aside>
	)
}

export default Sidebar
