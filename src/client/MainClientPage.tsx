import React, { useState, useEffect } from 'react'
import Sidebar from './sidebar/Sidebar'
import SidebarToggle from './sidebar/SidebarToggle'
import MainContent from './MainContent'
import Footer from './Footer'
import ChatWidget from './components/chat-widget/ChatWidget'
import NavigationTabs from './components/navigation-tabs/NavigationTabs'
import { useQuotation } from './context/QuotationContext'

const MainClientPage = () => {
	const { state } = useQuotation()
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768)
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
			{/* Main content area with sidebar */}
			<div className="relative flex">
				{/* Sidebar toggle button - fixed position */}
				<SidebarToggle />
				{/* Sidebar - conditionally rendered */}
				<Sidebar />

				{/* Main content - adjusts width based on sidebar state */}
				<main
					className={`
          flex-grow min-h-screen transition-all duration-300 ease-in-out
          ${state.isSidebarOpen ? 'md:ml-64' : 'ml-0'}
        `}
				>
					<div className="container mx-auto px-4 py-6">
						<MainContent />
						<Footer />
					</div>

					{/* Chat widget - fixed position */}
					<ChatWidget />
				</main>
			</div>
		</div>
	)
}

export default MainClientPage
