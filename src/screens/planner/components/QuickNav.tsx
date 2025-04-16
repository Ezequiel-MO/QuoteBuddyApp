import React from 'react'
import { Icon } from '@iconify/react'
import { DisplayPlanningItem } from '../types'

interface QuickNavProps {
	filteredItems: DisplayPlanningItem[]
	sidebarVisible: boolean
	toggleSidebar: () => void
	scrollToItem: (itemId: number | string) => void
}

const QuickNav: React.FC<QuickNavProps> = ({
	filteredItems,
	sidebarVisible,
	toggleSidebar,
	scrollToItem
}) => {
	return (
		<div
			className={`fixed top-0 right-0 w-64 h-full bg-gray-800 text-white p-4 transform transition-transform ${
				sidebarVisible ? 'translate-x-0' : 'translate-x-full'
			}`}
		>
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-bold">Quick Nav</h2>
				<button onClick={toggleSidebar} className="text-white">
					<Icon icon="mdi:close" className="h-6 w-6" />
				</button>
			</div>
			<ul className="space-y-2">
				{filteredItems.map((item) => {
					// Get a valid ID for the item or generate one
					const itemId = item.id || item._id || `item-${Math.random()}`
					// Only use the ID for scrolling if it's a string or number
					const handleClick = () => {
						if (typeof itemId === 'string' || typeof itemId === 'number') {
							scrollToItem(itemId)
						}
					}
					return (
						<li
							key={`nav-${itemId}`}
							className="cursor-pointer hover:bg-gray-700 p-2 rounded"
							onClick={handleClick}
						>
							{item.title}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default QuickNav
