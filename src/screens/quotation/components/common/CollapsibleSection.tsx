import React from 'react'
import { Icon } from '@iconify/react'

interface CollapsibleSectionProps {
	title: string
	subtitle?: string
	icon: string
	isExpanded: boolean
	onToggle: () => void
	badge?: number | string
	accentColor?: string
	children: React.ReactNode
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
	title,
	subtitle,
	icon,
	isExpanded,
	onToggle,
	badge,
	accentColor = '#4F46E5',
	children
}) => {
	return (
		<div className="mb-3 rounded-lg overflow-hidden">
			<button
				onClick={onToggle}
				className="w-full flex items-center justify-between p-3 text-left transition-colors duration-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
			>
				<div className="flex items-center">
					<div className="mr-3 relative">
						<Icon
							icon={icon}
							width={20}
							className="text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors"
						/>

						{/* Accent marker when expanded */}
						{isExpanded && (
							<div
								className="absolute -left-2 top-1/2 -translate-y-1/2 h-[70%] w-1 rounded-full opacity-70"
								style={{ backgroundColor: accentColor }}
							></div>
						)}
					</div>

					<div>
						<span
							className={`
              font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white-0 transition-colors
              ${isExpanded ? 'text-gray-900 dark:text-white-0' : ''}
            `}
						>
							{title}
						</span>

						{subtitle && (
							<p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate max-w-[170px]">
								{subtitle}
							</p>
						)}
					</div>
				</div>

				<div className="flex items-center">
					{badge !== undefined && (
						<span
							className={`
              px-2 py-0.5 rounded-full text-xs font-medium mr-2
              ${
								isExpanded
									? 'bg-opacity-90 text-white-0'
									: 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
							}
            `}
							style={isExpanded ? { backgroundColor: accentColor } : {}}
						>
							{badge}
						</span>
					)}

					<Icon
						icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}
						width={20}
						className={`
              text-gray-500 dark:text-gray-500 transition-transform duration-300
              ${isExpanded ? 'transform rotate-0' : ''}
            `}
					/>
				</div>
			</button>

			<div
				className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${
						isExpanded
							? 'max-h-[500px] opacity-100'
							: 'max-h-0 opacity-0 pointer-events-none'
					}
        `}
			>
				<div
					className="pl-3 pr-2 py-1 border-l-2 ml-6 my-1"
					style={{ borderColor: accentColor }}
				>
					{children}
				</div>
			</div>
		</div>
	)
}

export default CollapsibleSection
