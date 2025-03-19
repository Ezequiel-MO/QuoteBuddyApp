import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useDarkMode } from 'src/hooks'
import { motion } from 'framer-motion' // Consider adding framer-motion for animations

const tabs = [
	{
		name: 'Proposed Programme',
		path: '/client',
		icon: 'mdi:view-dashboard-outline'
	},
	{
		name: 'Map',
		path: '/client/map',
		icon: 'mdi:map-outline'
	},
	{
		name: 'Destination',
		path: '/client/destination',
		icon: 'mdi:city-variant-outline'
	}
]

const NavigationTabs = () => {
	const [isDarkMode, toggleDarkMode] = useDarkMode()
	const location = useLocation()
	const [activeTab, setActiveTab] = useState('')
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
	const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 500)
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	// Update active tab based on current location
	useEffect(() => {
		const currentPath = location.pathname
		const active = tabs.find(
			(tab) =>
				currentPath === tab.path || currentPath.startsWith(`${tab.path}/`)
		)
		setActiveTab(active?.path || tabs[0].path)
	}, [location])

	// Handle resize for responsive design
	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768)
			setIsSmallScreen(window.innerWidth < 500)
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	return (
		<div className="w-full">
			{isSmallScreen ? (
				// Mobile dropdown menu
				<div className="relative">
					<button
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="w-full flex items-center justify-between p-2 bg-white-0/95 dark:bg-gray-800/95 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
					>
						<div className="flex items-center">
							<Icon
								icon={
									tabs.find((tab) => tab.path === activeTab)?.icon ||
									'mdi:view-dashboard-outline'
								}
								className="h-5 w-5 text-orange-50 mr-2"
							/>
							<span className="text-sm font-medium text-gray-800 dark:text-white-0">
								{tabs.find((tab) => tab.path === activeTab)?.name ||
									'Navigation'}
							</span>
						</div>
						<Icon
							icon={
								isMenuOpen ? 'heroicons:chevron-up' : 'heroicons:chevron-down'
							}
							className="h-5 w-5 text-gray-600 dark:text-gray-300"
						/>
					</button>

					{isMenuOpen && (
						<div className="absolute top-full left-0 right-0 mt-1 bg-white-0/95 dark:bg-gray-800/95 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-50">
							{tabs.map((tab) => (
								<NavLink
									key={tab.name}
									to={tab.path}
									end={true}
									className={({ isActive }) => `
                    flex items-center px-4 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0
                    ${
											isActive
												? 'text-orange-50 font-medium'
												: 'text-gray-700 dark:text-gray-300'
										}
                  `}
									onClick={() => setIsMenuOpen(false)}
								>
									<Icon icon={tab.icon} className="h-5 w-5 mr-3" />
									<span>{tab.name}</span>
								</NavLink>
							))}
						</div>
					)}
				</div>
			) : (
				// Standard navigation for larger screens
				<div className="flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300">
					<nav className="w-full bg-white-0/95 dark:bg-gray-800/95 rounded-xl shadow-md backdrop-blur-sm overflow-hidden border border-gray-100 dark:border-gray-700">
						<ul className="flex items-center p-1">
							{tabs.map((tab) => (
								<li key={tab.name} className="flex-1">
									<NavLink
										to={tab.path}
										end={true}
										className={({ isActive }) => `
                      relative flex ${
												isMobile ? 'flex-col' : 'flex-row'
											} items-center justify-center md:justify-start 
                      py-2 px-2 md:py-3 md:px-4 rounded-lg text-sm font-medium 
                      transition-all duration-300 ease-in-out
                      ${
												isActive
													? 'text-orange-50 dark:text-orange-50'
													: 'text-gray-700 dark:text-gray-300 hover:text-orange-50 dark:hover:text-orange-50'
											}
                    `}
									>
										{({ isActive }) => (
											<>
												{isActive && (
													<div className="absolute inset-0 bg-orange-50/10 dark:bg-orange-50/20 rounded-lg" />
												)}
												<Icon
													icon={tab.icon}
													className={`
                          ${isMobile ? 'mb-1' : 'mr-2'} h-5 w-5 z-10
                          ${isActive ? 'text-orange-50' : ''}
                        `}
												/>
												<span className="z-10 text-center md:text-left whitespace-nowrap">
													{isMobile ? tab.name.split(' ')[0] : tab.name}
												</span>
											</>
										)}
									</NavLink>
								</li>
							))}
						</ul>
					</nav>

					<button
						onClick={() => toggleDarkMode()}
						className={`
              p-2.5 rounded-full transition-all duration-300 ease-in-out shadow-md
              flex items-center justify-center
              border border-gray-200 dark:border-gray-700
              ${
								isDarkMode
									? 'bg-orange-50/10 hover:bg-orange-50/20 text-yellow-300'
									: 'bg-white-0 hover:bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
							}
            `}
						aria-label={
							isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
						}
					>
						<Icon
							icon={
								isDarkMode
									? 'heroicons:sun-20-solid'
									: 'heroicons:moon-20-solid'
							}
							className="h-5 w-5"
						/>
					</button>
				</div>
			)}
		</div>
	)
}

export default NavigationTabs
