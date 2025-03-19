import React from 'react'
import { Outlet } from 'react-router-dom'
import NavigationTabs from './components/navigation-tabs/NavigationTabs'
import PDFDownloadButton from './components/pdf-download/PDFDownloadButton'
import PDFNotificationCenter from './components/pdf-download/PDFNotificationCenter'
import { QuotationProvider } from './context/QuotationContext'

const ClientProjectDashboard: React.FC = () => {
	return (
		<QuotationProvider>
			<div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-200 dark:from-gray-900 dark:to-gray-800">
				<header className="sticky top-0 z-40 bg-white-0 dark:bg-gray-800 shadow-md">
					<div className="container mx-auto px-4 py-3">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
							<div className="w-full sm:w-auto sm:flex-grow">
								<NavigationTabs />
							</div>
							<div className="flex items-center gap-2 justify-end">
								<PDFNotificationCenter />
								<PDFDownloadButton />
							</div>
						</div>
					</div>
				</header>
				<main className="container mx-auto px-4 py-6 flex-grow pt-12 sm:pt-16">
					<Outlet />
				</main>
			</div>
		</QuotationProvider>
	)
}

export default ClientProjectDashboard
