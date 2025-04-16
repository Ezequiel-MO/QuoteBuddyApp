import React from 'react'
import { Icon } from '@iconify/react'

interface SidebarToggleProps {
	sidebarVisible: boolean
	toggleSidebar: () => void
}

const SidebarToggle: React.FC<SidebarToggleProps> = ({
	sidebarVisible,
	toggleSidebar
}) => {
	return (
		<button
			onClick={toggleSidebar}
			className={`fixed left-0 top-20 z-30 p-2 shadow-lg transition-all duration-300 rounded-r-lg ${
				sidebarVisible
					? 'bg-gray-800 text-white-0 hover:bg-gray-700'
					: 'bg-[#ea5933] text-white-0 hover:bg-[#ea5933]/90 pl-1 pr-3'
			}`}
			title={sidebarVisible ? 'Hide sidebar' : 'Show sidebar'}
		>
			<div className="flex items-center">
				<Icon
					icon={sidebarVisible ? 'mdi:chevron-left' : 'mdi:chevron-right'}
					className="h-5 w-5"
				/>
				{!sidebarVisible && (
					<span className="ml-1 text-sm font-medium">Menu</span>
				)}
			</div>
		</button>
	)
}

export default SidebarToggle
