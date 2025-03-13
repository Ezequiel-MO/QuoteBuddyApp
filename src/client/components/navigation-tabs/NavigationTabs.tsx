import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useDarkMode } from 'src/hooks'

const tabs = [
	{
		name: 'Proposed Programme',
		path: '/client',
		icon: 'mdi:view-dashboard-outline'
	},
	{ name: 'Map', path: '/client/map', icon: 'mdi:map-outline' },
	{
		name: 'Destination',
		path: '/client/destination',
		icon: 'mdi:city-variant-outline'
	}
]

const NavigationTabs: React.FC = () => {
	const [hoveredTab, setHoveredTab] = useState<string | null>(null)
	const [isDarkMode, toggleDarkMode] = useDarkMode()

	return (
		<div className="w-full flex flex-col md:flex-row items-center gap-4">
			<nav className="w-full bg-white-0/90 dark:bg-gray-800/90 rounded-lg shadow-sm overflow-x-auto">
				<ul className="flex space-x-1 p-1">
					{tabs.map((tab) => (
						<li key={tab.name} className="flex-shrink-0">
							<NavLink
								to={tab.path}
								end={true}
								onMouseEnter={() => setHoveredTab(tab.name)}
								onMouseLeave={() => setHoveredTab(null)}
								className={({ isActive }) => {
									// Base styles for all tabs
									let classes =
										'inline-flex items-center py-2 px-3 md:px-4 rounded-md text-sm font-medium transition-all duration-200 ease-in-out border border-transparent '

									if (isActive) {
										// Active tab with orange/coral background (#ea5933)
										classes +=
											'bg-[#ea5933]/20 text-[#ea5933] dark:bg-[#ea5933]/30 dark:text-[#ea5933] border-[#ea5933]/30 shadow-sm'
									} else {
										// Inactive tabs with subtle style and hover effect
										classes +=
											'text-gray-700 dark:text-gray-300 hover:bg-[#C7BAAE]/20 dark:hover:bg-[#C7BAAE]/10 hover:border-[#C7BAAE]/30'
									}

									return classes
								}}
							>
								<Icon icon={tab.icon} className="mr-2 h-5 w-5" />
								{tab.name}
							</NavLink>
						</li>
					))}
				</ul>
			</nav>

			<button
				onClick={() => toggleDarkMode()}
				className={`p-2 rounded-full text-gray-700 dark:text-gray-300 transition-colors border ${
					isDarkMode
						? 'bg-yellow-300/30 hover:bg-yellow-300/80 border-yellow-300/30'
						: 'bg-[#2c3e50]/20 hover:bg-[#2c3e50]/30 border-[#2c3e50]/30'
				}`}
				aria-label="Toggle dark mode"
			>
				<Icon
					icon={isDarkMode ? 'mdi:weather-sunny' : 'mdi:weather-night'}
					className="h-5 w-5"
				/>
			</button>
		</div>
	)
}

export default NavigationTabs
