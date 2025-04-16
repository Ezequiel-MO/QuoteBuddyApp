import React from 'react'
import { DisplayPlanningItem } from '../types'

interface LeftSidebarProps {
	planningItems: DisplayPlanningItem[]
	activeItem: number | string | null
	sidebarVisible: boolean
	scrollToItem: (itemId: number | string) => void
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
	planningItems,
	activeItem,
	sidebarVisible,
	scrollToItem
}) => {
	return (
		<div
			className={`fixed left-0 top-0 bottom-0 bg-gray-800 shadow-lg z-20 transition-all duration-300 w-64 pt-24 px-4 ${
				sidebarVisible ? 'translate-x-0' : '-translate-x-full'
			}`}
		>
			<h3 className="text-lg font-medium text-white-0 mb-4">Planning Items</h3>
			<ul className="space-y-2">
				{planningItems.map((item) => {
					// Get a valid ID for the item
					const itemId = item.id || item._id || `item-${Math.random()}`
					// Only use the ID for scrolling if it's a string or number
					const handleClick = () => {
						if (typeof itemId === 'string' || typeof itemId === 'number') {
							scrollToItem(itemId)
						}
					}
					return (
						<li key={`nav-${String(itemId)}`}>
							<button
								onClick={handleClick}
								className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
									activeItem === itemId
										? 'bg-[#ea5933] text-white-0'
										: 'hover:bg-gray-700 text-gray-300 hover:text-white-0'
								}`}
								title={item.title}
							>
								<div className="flex items-center">
									<span className="w-6 h-6 flex items-center justify-center bg-gray-700 rounded-full mr-2 text-cyan-300">
										{typeof itemId === 'number' || typeof itemId === 'string'
											? String(itemId).slice(0, 2)
											: '?'}
									</span>
									<span className="truncate">{item.title}</span>
								</div>
							</button>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default LeftSidebar
