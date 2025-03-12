import React from 'react'
import { Icon } from '@iconify/react'

interface MobileHeaderProps {
	projectTitle: string
	onMenuClick: () => void
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
	projectTitle,
	onMenuClick
}) => {
	return (
		<header className="sticky top-0 lg:hidden z-40 bg-white-0 dark:bg-gray-800 shadow-md">
			<div className="flex items-center justify-between p-4">
				<div className="flex items-center">
					<button
						onClick={onMenuClick}
						className="p-2 mr-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
						aria-label="Toggle sidebar"
					>
						<Icon icon="mdi:menu" width={24} />
					</button>

					<h1 className="text-lg font-semibold truncate text-gray-800 dark:text-white-0 max-w-[200px]">
						{projectTitle}
					</h1>
				</div>

				<div className="flex items-center space-x-2">
					<button
						className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
						aria-label="Search"
					>
						<Icon icon="mdi:magnify" width={22} />
					</button>

					<button
						className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
						aria-label="Download PDF"
					>
						<Icon icon="mdi:file-pdf-box" width={22} />
					</button>
				</div>
			</div>

			{/* Progress indicator */}
			<div className="h-1 bg-gray-200 dark:bg-gray-700">
				<div
					className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300"
					style={{ width: '35%' }} // Dynamic based on scroll position
				/>
			</div>
		</header>
	)
}

export default MobileHeader
