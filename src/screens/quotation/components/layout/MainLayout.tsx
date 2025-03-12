// src/screens/quotation/components/layout/MainLayout.tsx
import React, { useEffect, useState } from 'react'
import { useQuotation } from '../../context/QuotationContext'
import ProjectOverview from '../overview/ProjectOverview'
import { Icon } from '@iconify/react'
import Sidebar from '../Sidebar'
import ContentArea from './ContentArea'
import Footer from './Footer'
import MobileHeader from './MobileHeader'
import MapSection from '../map/MapSection'

const MainLayout: React.FC = () => {
	const {
		isSidebarOpen,
		toggleSidebar,
		currentProject,
		isOverviewExpanded,
		toggleOverview,
		isMapVisible,
		toggleMapView
	} = useQuotation()

	const [scrolled, setScrolled] = useState(false)

	// Handle scroll event to show/hide floating action buttons
	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 100)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	// Handle sidebar toggle
	const handleSidebarToggle = () => {
		toggleSidebar(!isSidebarOpen)
	}

	return (
		<div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
			{/* Mobile Header - only visible on small screens */}
			<MobileHeader
				projectTitle={currentProject?.groupName || 'Project Overview'}
				onMenuClick={handleSidebarToggle}
			/>

			{/* Main Content Area */}
			<div className="flex flex-1 relative">
				{/* Sidebar */}
				<Sidebar />

				{/* Content Overlay - only visible when sidebar is open on mobile */}
				{isSidebarOpen && (
					<div
						className="fixed inset-0 bg-black-50 bg-opacity-50 z-30 lg:hidden"
						onClick={() => toggleSidebar(false)}
					/>
				)}

				{/* Main Content */}
				<div className="flex flex-col flex-1 transition-all duration-300 ease-in-out">
					{/* Project Overview Section */}
					<div
						className={`
              transition-all duration-300 ease-in-out
              ${
								isOverviewExpanded
									? 'max-h-[800px]'
									: 'max-h-16 overflow-hidden'
							}
            `}
					>
						<div className="sticky top-0 z-20 bg-gray-50 dark:bg-gray-900 shadow-sm">
							<div className="flex items-center justify-between p-4">
								<h1 className="text-xl font-bold text-gray-800 dark:text-white-0">
									{currentProject?.groupName || 'Project Overview'}
								</h1>
								<div className="flex items-center space-x-2">
									<button
										onClick={() => toggleMapView()}
										className={`p-2 rounded-full ${
											isMapVisible
												? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300'
												: 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
										}`}
										title={isMapVisible ? 'Hide Map' : 'Show Map'}
									>
										<Icon icon="mdi:map" width={20} />
									</button>
									<button
										onClick={() => toggleOverview()}
										className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
									>
										<Icon
											icon={
												isOverviewExpanded
													? 'mdi:chevron-up'
													: 'mdi:chevron-down'
											}
											width={20}
										/>
									</button>
								</div>
							</div>
						</div>

						<ProjectOverview />
					</div>

					{/* Map View (conditionally rendered) */}
					{isMapVisible && <MapSection />}

					{/* Main Content Area */}
					<ContentArea />

					{/* Footer */}
					<Footer />
				</div>
			</div>

			{/* Floating action buttons */}
			<div
				className={`
          fixed right-4 bottom-4 flex flex-col space-y-2 transition-all duration-300
          ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
			>
				{/* Toggle Map Button */}
				<button
					onClick={() => toggleMapView()}
					className={`p-3 text-white-0 rounded-full shadow-lg transition-colors ${
						isMapVisible
							? 'bg-indigo-700 hover:bg-indigo-800'
							: 'bg-indigo-600 hover:bg-indigo-700'
					}`}
					aria-label="Toggle map view"
				>
					<Icon icon={isMapVisible ? 'mdi:map-check' : 'mdi:map'} width={24} />
				</button>

				{/* Toggle Sidebar Button */}
				<button
					onClick={handleSidebarToggle}
					className="p-3 bg-indigo-600 text-white-0 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
					aria-label="Toggle sidebar"
				>
					<Icon icon={isSidebarOpen ? 'mdi:close' : 'mdi:menu'} width={24} />
				</button>

				{/* Scroll to Top Button */}
				<button
					onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
					className="p-3 bg-indigo-600 text-white-0 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
					aria-label="Scroll to top"
				>
					<Icon icon="mdi:arrow-up" width={24} />
				</button>
			</div>
		</div>
	)
}

export default MainLayout
