import React, { useEffect, useState, ReactNode } from 'react'
import { Icon } from '@iconify/react'
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import MainContent from '../components/layout/MainContent'
import { useQuotation } from '../context/QuotationContext'
import { useActiveSection } from '../hooks/useActiveSection'
import ChatWidget from '../components/chat/ChatWidget'
import ScrollProgressIndicator from '../components/navigation/ScrollProgressIndicator'
import Footer from '../components/layout/Footer'
import NavigationTabs from '../../client/components/navigation-tabs/NavigationTabs'

// Define all section IDs for tracking active section
const SECTION_IDS = ['hotels_id', 'schedule_id', 'budget_id', 'destination_id']

// Add children prop to component interface
interface QuotationDashboardProps {
	children?: ReactNode
}

const QuotationDashboard: React.FC<QuotationDashboardProps> = ({
	children
}) => {
	const { state, dispatch } = useQuotation()
	const [isLoading, setIsLoading] = useState(true)

	// Track active section during scrolling
	useActiveSection(SECTION_IDS)

	// Simulate loading state for smooth transitions
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 800)

		return () => clearTimeout(timer)
	}, [])

	// Handle keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Toggle sidebar with Alt+S
			if (e.altKey && e.key === 's') {
				dispatch({ type: 'TOGGLE_SIDEBAR' })
			}

			// Toggle overview with Alt+O
			if (e.altKey && e.key === 'o') {
				dispatch({ type: 'TOGGLE_OVERVIEW' })
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [dispatch])

	// Handle sidebar toggle button
	const toggleSidebar = () => {
		dispatch({ type: 'TOGGLE_SIDEBAR' })
	}

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen w-full bg-slate-100 dark:bg-gray-900">
				<div className="text-center">
					<div className="animate-spin mb-4">
						<Icon icon="line-md:loading-twotone-loop" width={48} height={48} />
					</div>
					<h2 className="text-xl font-semibold dark:text-white-0">
						Loading your quotation...
					</h2>
				</div>
			</div>
		)
	}

	return (
		<div className="flex flex-col min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
			<Header />
			<div className="flex flex-1 w-full relative">
				{/* Mobile sidebar toggle */}
				<button
					aria-label="Toggle sidebar"
					className="fixed z-50 bottom-24 left-4 md:hidden bg-cyan-500 hover:bg-cyan-600 text-white-0 p-3 rounded-full shadow-lg"
					onClick={toggleSidebar}
				>
					<Icon
						icon={state.isSidebarOpen ? 'mdi:close' : 'mdi:menu'}
						width={24}
						height={24}
					/>
				</button>

				{/* Sidebar */}
				<div
					className={`
            ${
							state.isSidebarOpen
								? 'translate-x-0'
								: '-translate-x-full md:translate-x-0'
						} 
            fixed md:sticky z-40 top-0 left-0 h-full md:w-64 lg:w-72 
            overflow-y-auto bg-white-0 dark:bg-gray-800 shadow-lg
            transition-transform duration-300 ease-in-out
          `}
					style={{ height: 'calc(100vh - 64px)', top: '64px' }}
				>
					<Sidebar />
				</div>

				{/* Main content */}
				<div className="flex-1 transition-all duration-300 ease-in-out">
					{/* Conditionally render either the children or MainContent */}
					{children || <MainContent />}
				</div>

				{/* Scroll progress indicator */}
				<ScrollProgressIndicator sections={SECTION_IDS} />
			</div>

			<Footer />

			{/* Chat widget */}
			<ChatWidget />
		</div>
	)
}

export default QuotationDashboard
