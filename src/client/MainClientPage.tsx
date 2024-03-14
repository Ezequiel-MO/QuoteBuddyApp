import React, { useState } from 'react'
import TopBar from './TopBar'
import Sidebar from './sidebar/Sidebar'
import MainContent from './MainContent'
import { Icon } from '@iconify/react'

const MainClientPage: React.FC = () => {
	const [isSidebarVisible, setIsSidebarVisible] = useState(false)

	return (
		<div className="relative min-h-screen flex flex-col">
			<TopBar />
			{/* Increase margin-top for the button to move it higher */}
			<button
				className="absolute z-30 mt-[74px] ml-4 md:hidden" // Adjust this value as needed to avoid overlap
				onClick={() => setIsSidebarVisible(!isSidebarVisible)}
			>
				<Icon icon="uiw:menu" width="32" height="32" />
			</button>
			<div className="flex flex-1 w-full">
				{/* Position the sidebar lower when it's visible on smaller screens */}
				<div
					className={`${
						isSidebarVisible ? 'fixed top-[calc(74px+152px)]' : 'hidden' // Adjust these values based on the icon's size and desired spacing
					} md:block md:static md:w-64 z-20 bg-white dark:bg-gray-800 h-full transition-transform duration-300 ease-in-out md:sticky md:top-[64px]`}
				>
					<Sidebar />
				</div>
				<div className="flex-grow p-5 overflow-y-auto">
					<MainContent />
				</div>
			</div>
		</div>
	)
}

export default MainClientPage
