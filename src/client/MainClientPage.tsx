import React, { useState } from 'react'
import Sidebar from './sidebar/Sidebar'
import MainContent from './MainContent'
import { Icon } from '@iconify/react'
import Footer from './Footer'
import ChatWidget from './components/chat-widget/ChatWidget'
import OverviewTable from './components/overview/OverviewTable'
import { useQuotation } from './context/QuotationContext'

const MainClientPage: React.FC = () => {
	const { state, dispatch } = useQuotation()

	const toggleSidebar = () => {
		dispatch({ type: 'TOGGLE_SIDEBAR' })
	}

	return (
		<div className="relative min-h-screen flex flex-col">
			<h1 className="text-2xl font-bold mb-4">Project Overview</h1>
			<OverviewTable />
			<button
				className="fixed z-30 mt-[74px] ml-4 md:hidden"
				onClick={toggleSidebar}
			>
				<Icon icon="uiw:menu" width="32" height="32" />
			</button>
			<div className="flex flex-1 w-full">
				<div
					className={`${
						state.isSidebarOpen ? 'fixed top-[calc(74px+152px)]' : 'hidden'
					} md:block md:w-64 z-20 bg-white-0 dark:bg-gray-800 h-full transition-transform duration-300 ease-in-out md:sticky md:top-[64px]`}
				>
					<Sidebar />
				</div>

				<div className="flex-grow overflow-y-auto">
					<MainContent />
					<Footer />
				</div>
			</div>
			<ChatWidget />
		</div>
	)
}

export default MainClientPage
