// src/screens/quotation/components/Sidebar/index.tsx
import React from 'react'
import { useQuotation } from '../../context/QuotationContext'
import SidebarHeader from './SidebarHeader'
import SidebarSection from './SidebarSection'
import DaysList from './DaysList'
import HotelsList from './HotelsList'
import BudgetSection from './BudgetSection'

const Sidebar: React.FC = () => {
	const {
		isSidebarOpen,
		toggleSidebar,
		expandedSections,
		toggleSection,
		scrollToSection
	} = useQuotation()

	// Handler for closing the sidebar
	const handleClose = () => {
		toggleSidebar(false)
	}

	return (
		<aside
			className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 fixed lg:static top-0 left-0 z-40 h-screen lg:h-auto 
        w-64 transition-transform duration-300 ease-in-out 
        bg-white-0 dark:bg-gray-800 shadow-lg lg:shadow-none overflow-y-auto
      `}
		>
			<SidebarHeader onClose={handleClose} />

			<div className="px-3 py-2">
				{/* Overview Section */}
				<SidebarSection
					title="Overview"
					iconName="document"
					onClick={() => scrollToSection('overview')}
				/>

				{/* Hotels Section - Collapsible */}
				<HotelsList
					isExpanded={expandedSections.hotels}
					onToggle={() => toggleSection('hotels')}
				/>

				{/* Days Section - Collapsible */}
				<DaysList
					isExpanded={expandedSections.days}
					onToggle={() => toggleSection('days')}
				/>

				{/* Budget Section - Collapsible */}
				<BudgetSection
					isExpanded={expandedSections.budget}
					onToggle={() => toggleSection('budget')}
				/>
			</div>
		</aside>
	)
}

export default Sidebar
