import Sidebar from './sidebar/Sidebar'
import SidebarToggle from './sidebar/SidebarToggle'
import MainContent from './MainContent'
import Footer from './Footer'
import ChatWidget from './components/chat-widget/ChatWidget'
import { useQuotation } from './context/QuotationContext'
import ScrollToTop from './components/navigation-tabs/ScrollToTop'

const MainClientPage = () => {
	const { state } = useQuotation()

	return (
		<div className="min-h-screen bg-gray-300 dark:bg-gray-900 transition-colors duration-300">
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
