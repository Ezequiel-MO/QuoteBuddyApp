// TabContent.tsx
import React from 'react'

interface TabContentProps {
	isActive: boolean
	children: React.ReactNode
}

export const TabContent: React.FC<TabContentProps> = ({
	isActive,
	children
}) => {
	return (
		<div
			className={`${
				isActive
					? 'relative visible opacity-100 h-auto'
					: 'absolute invisible opacity-0 h-0 overflow-hidden'
			} w-full`}
		>
			{children}
		</div>
	)
}

export default TabContent
