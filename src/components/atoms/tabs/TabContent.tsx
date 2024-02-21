import { FC, ReactNode } from 'react'

interface TabContentProps {
	children: ReactNode
	activeTab: number
	index: number
}

export const TabContent: FC<TabContentProps> = ({
	children,
	activeTab,
	index
}) => {
	const isActive = activeTab === index + 1

	return (
		<div className={isActive ? 'block py-4' : 'hidden'} id={`tab${index + 1}`}>
			{children}
		</div>
	)
}
