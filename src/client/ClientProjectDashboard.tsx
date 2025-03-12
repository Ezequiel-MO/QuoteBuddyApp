import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationTabs from './components/navigation-tabs/NavigationTabs'
import PDFDownloadButton from './components/pdf-download/PDFDownloadButton'
import { QuotationProvider } from './context/QuotationContext'

const ClientProjectDashboard: React.FC = () => {
	return (
		<QuotationProvider>
			<div className="min-h-screen dark:bg-black-50 bg-white-0">
				<header className="container mx-auto px-4 py-4 flex items-center justify-between">
					<NavigationTabs />
					<PDFDownloadButton />
				</header>
				<main className="container mx-auto px-4 py-6">
					<Outlet />
				</main>
			</div>
		</QuotationProvider>
	)
}

export default ClientProjectDashboard
