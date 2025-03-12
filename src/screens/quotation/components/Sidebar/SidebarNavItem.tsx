import React from 'react'
import { Icon } from '@iconify/react'

interface SidebarNavItemProps {
	title: string
	icon: string
	isActive?: boolean
	onClick: () => void
	accentColor?: string
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({
	title,
	icon,
	isActive = false,
	onClick,
	accentColor = '#4F46E5'
}) => {
	return (
		<button
			onClick={onClick}
			className={`
        w-full flex items-center px-4 py-3 rounded-lg text-left mb-1
        transition-all duration-200 group
        ${
					isActive
						? 'text-white-0 font-medium'
						: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
				}
      `}
			style={isActive ? { backgroundColor: accentColor } : {}}
		>
			<div className="flex items-center justify-center w-6 h-6 mr-3">
				<Icon
					icon={icon}
					width={isActive ? 22 : 20}
					className={`transition-all duration-200 ${
						isActive ? 'scale-110' : 'group-hover:scale-110'
					}`}
				/>
			</div>

			<span className="text-sm flex-1">{title}</span>

			{isActive && (
				<div className="h-6 w-1 rounded-full bg-white-0 opacity-70 ml-2"></div>
			)}
		</button>
	)
}

export default SidebarNavItem
