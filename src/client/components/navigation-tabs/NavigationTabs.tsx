// src/client/components/NavigationTabs/NavigationTabs.tsx

import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const tabs = [
	/* { name: 'Original Brief', path: '/client/client-brief' }, */
	{ name: 'Proposed Programme', path: '/client' },
	{ name: 'Overview', path: '/client/overview' },
	{ name: 'Map', path: '/client/map' },
	{ name: 'Destination', path: '/client/destination' }
	/* { name: 'Gallery', path: '/client/gallery' } */
]

const NavigationTabs: React.FC = () => {
	const [hoveredTab, setHoveredTab] = useState<string | null>(null)

	return (
		<nav className="bg-slate-300 shadow p-2 rounded">
			<div className="container mx-auto px-2">
				<ul className="flex space-x-4">
					{tabs.map((tab) => (
						<li key={tab.name}>
							<NavLink
								to={tab.path}
								onMouseEnter={() => setHoveredTab(tab.name)}
								onMouseLeave={() => setHoveredTab(null)}
								className={({ isActive }) => {
									// Base classes
									let classes =
										'inline-block py-2 px-4 font-semibold border-b-8 transition-all duration-300 ease-in-out '

									if (
										isActive &&
										hoveredTab !== null &&
										hoveredTab !== tab.name
									) {
										// Active tab, but another tab is hovered
										classes += 'text-cyan-700 border-transparent'
									} else if (isActive) {
										// Active tab, no other tab is hovered
										classes += 'text-cyan-700 border-orange-500'
									} else if (hoveredTab === tab.name) {
										// Inactive tab that is hovered
										classes += 'text-gray-700 border-orange-500'
									} else {
										// Inactive tab that is not hovered
										classes += 'text-gray-700 border-transparent'
									}

									return classes
								}}
							>
								{tab.name}
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		</nav>
	)
}

export default NavigationTabs
