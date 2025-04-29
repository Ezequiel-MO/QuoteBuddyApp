import Sidebar from './sidebar/Sidebar'
import SidebarToggle from './sidebar/SidebarToggle'
import MainContent from './MainContent'
import Footer from './Footer'
import ChatWidget from './components/chat-widget/ChatWidget'
import ScrollToTop from './components/navigation-tabs/ScrollToTop'

const MainClientPage = () => {
	return (
		<div className="min-h-screen bg-gray-300 dark:bg-gray-900 transition-colors duration-300">
			{/* Main content area with sidebar */}
			<div className="relative flex">
				{/* Sidebar toggle button - only visible when sidebar is hidden */}
				<SidebarToggle />

				{/* Hover-activated Sidebar */}
				<Sidebar />

				{/* Main content - always takes full width for better space utilization */}
				<main className="flex-grow min-h-screen">
					<div className="container mx-auto px-4 py-6">
						<MainContent />
						<Footer />
					</div>

					{/* Both components stacked in the right corner:
              - ScrollToTop positioned above the ChatWidget
              - ChatWidget anchored at the bottom right */}
					<ScrollToTop
						showAfterHeight={300}
						animation="fade"
						size="medium"
						hideOnMobile={true}
					/>
					<ChatWidget />
				</main>
			</div>
		</div>
	)
}

export default MainClientPage
