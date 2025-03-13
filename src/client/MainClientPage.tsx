import React from 'react'
import Sidebar from './sidebar/Sidebar'
import MainContent from './MainContent'
import Footer from './Footer'
import ChatWidget from './components/chat-widget/ChatWidget'

import SidebarToggle from './sidebar/SidebarToggle'

const MainClientPage: React.FC = () => {
	return (
		<div className="relative min-h-screen flex flex-col">
			<h1 className="text-xl font-bold mb-1">Table Of Contents</h1>
			<SidebarToggle />
			<div className="flex flex-1 w-full">
				<div className="fixed top-[calc(74px+152px)] md:block md:w-64 z-20 bg-white-0 dark:bg-gray-800 h-full transition-transform duration-300 ease-in-out md:sticky md:top-[64px]">
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
