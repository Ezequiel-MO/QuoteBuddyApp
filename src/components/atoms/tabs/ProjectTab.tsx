import React from 'react'
import { Icon } from '@iconify/react'

interface ProjectTabProps {
	tab: string
	icon: string
	isSelected: boolean
	onClick: () => void
}

const ProjectTab = React.forwardRef<HTMLDivElement, ProjectTabProps>(
	({ tab, icon, isSelected, onClick }, ref) => (
		<div
			ref={ref}
			className={`relative flex items-center cursor-pointer px-6 py-2 transition-colors duration-200 rounded-t-lg ${
				isSelected ? 'bg-gray-800 text-orange-500' : 'bg-gray-700 text-gray-400'
			} ${
				isSelected
					? 'border-t-2 border-l-2 border-r-2 border-orange-500'
					: 'border-b-2 border-gray-700'
			} hover:bg-gray-800 hover:text-cyan-400`}
			onClick={onClick}
			aria-label={`Select ${tab} tab`}
		>
			<Icon
				icon={icon}
				width={24}
				className={`mr-2 ${isSelected ? 'text-orange-500' : 'text-gray-500'}`}
			/>
			<span className="font-semibold">{tab}</span>
		</div>
	)
)

ProjectTab.displayName = 'ProjectTab'

export default ProjectTab
