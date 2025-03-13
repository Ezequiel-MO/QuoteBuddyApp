import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationTabs from './components/navigation-tabs/NavigationTabs'
import PDFDownloadButton from './components/pdf-download/PDFDownloadButton'
import { QuotationProvider } from './context/QuotationContext'

const ClientProjectDashboard: React.FC = () => {
	return (
		<QuotationProvider>
			<div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-200 dark:from-gray-900 dark:to-gray-800">
				<header className="sticky top-0 z-40 bg-white-0 dark:bg-gray-800 shadow-md">
					<div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
						<NavigationTabs />
						<PDFDownloadButton />
					</div>
				</header>
				<main className="container mx-auto px-4 py-6 flex-grow">
					<Outlet />
				</main>
			</div>
		</QuotationProvider>
	)
}

export default ClientProjectDashboard
