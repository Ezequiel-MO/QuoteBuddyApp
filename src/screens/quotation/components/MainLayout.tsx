import { useQuotation } from '../context/QuotationContext'
import Sidebar from './Sidebar/indext'

const MainLayout = () => {
	const { isSidebarOpen } = useQuotation()

	return (
		<div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
			{/* Mobile Header - only visible on small screens */}
			{/* <MobileHeader /> */}

			{/* Main Content Area */}
			<div className="flex flex-1 overflow-hidden">
				{/* Sidebar - position depends on screen size and state */}
				<Sidebar />

				{/* Content Area */}
				{/* <ContentArea /> */}
			</div>
		</div>
	)
}

export default MainLayout
