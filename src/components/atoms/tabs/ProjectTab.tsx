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
			ref={ref} // Forwarding the ref here
			className={`relative flex items-center cursor-pointer px-4 py-2 transition-colors duration-200 ${
				isSelected ? 'text-orange-500' : 'text-gray-400'
			}`}
			onClick={onClick}
			aria-label={`Select ${tab} tab`}
		>
			<Icon
				icon={icon}
				width={24}
				className={`mr-2 ${isSelected ? 'text-cyan-400' : 'text-gray-500'}`}
			/>
			<span
				className={`font-semibold ${
					isSelected ? 'text-orange-500' : 'text-gray-400'
				}`}
			>
				{tab}
			</span>
		</div>
	)
)

ProjectTab.displayName = 'ProjectTab'

export default ProjectTab
