import React from 'react'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'

interface ViewModeToggleProps {
	viewMode: 'detailed' | 'compact'
	onViewModeChange: (mode: 'detailed' | 'compact') => void
	className?: string
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
	viewMode,
	onViewModeChange,
	className = ''
}) => {
	return (
		<div className={`flex items-center ${className}`}>
			<span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2 hidden sm:inline">
				View Mode:
			</span>
			<div className="flex rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 shadow-sm">
				<motion.button
					onClick={() => onViewModeChange('compact')}
					className={`px-3 py-1.5 text-xs font-medium transition-colors flex items-center ${
						viewMode === 'compact'
							? 'bg-orange-50 text-white-0'
							: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
					}`}
					whileHover={{ scale: viewMode !== 'compact' ? 1.05 : 1 }}
					whileTap={{ scale: 0.95 }}
					aria-label="Switch to compact view"
				>
					<Icon icon="mdi:view-compact-outline" className="mr-1.5" />
					<span>Compact</span>
				</motion.button>
				<motion.button
					onClick={() => onViewModeChange('detailed')}
					className={`px-3 py-1.5 text-xs font-medium transition-colors flex items-center ${
						viewMode === 'detailed'
							? 'bg-orange-50 text-white-0'
							: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
					}`}
					whileHover={{ scale: viewMode !== 'detailed' ? 1.05 : 1 }}
					whileTap={{ scale: 0.95 }}
					aria-label="Switch to detailed view"
				>
					<Icon icon="mdi:view-agenda-outline" className="mr-1.5" />
					<span>Detailed</span>
				</motion.button>
			</div>
		</div>
	)
}

export default ViewModeToggle
