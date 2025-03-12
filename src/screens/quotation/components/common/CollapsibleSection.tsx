import React from 'react'
import Icon from './Icon'

interface CollapsibleSectionProps {
	title: string
	iconName: string
	isExpanded: boolean
	onToggle: () => void
	children: React.ReactNode
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
	title,
	iconName,
	isExpanded,
	onToggle,
	children
}) => {
	return (
		<div className="mb-2">
			<button
				onClick={onToggle}
				className="w-full flex items-center justify-between p-2 text-left transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
			>
				<div className="flex items-center">
					<Icon
						name={iconName}
						className="mr-2 text-gray-600 dark:text-gray-400"
						width={18}
					/>
					<span className="font-medium text-gray-700 dark:text-gray-300">
						{title}
					</span>
				</div>
				<Icon
					name={isExpanded ? 'chevron-up' : 'chevron-down'}
					className="text-gray-500 dark:text-gray-500"
					width={16}
				/>
			</button>

			<div
				className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
        `}
			>
				<div className="pl-7 pr-2 py-1">{children}</div>
			</div>
		</div>
	)
}

export default CollapsibleSection
