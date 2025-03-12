import React from 'react'
import Icon from '../common/Icon'

interface SidebarHeaderProps {
	onClose: () => void
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ onClose }) => {
	return (
		<div className="p-4 sticky top-0 bg-white-0 dark:bg-gray-800 z-10 shadow-sm">
			<div className="flex items-center justify-between mb-2">
				<h2 className="text-xl font-bold text-gray-800 dark:text-white-0">
					Contents
				</h2>
				<button
					onClick={onClose}
					className="lg:hidden p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
					aria-label="Close sidebar"
				>
					<Icon name="close" width={20} />
				</button>
			</div>
		</div>
	)
}

export default SidebarHeader
