import React, { useEffect, useRef, useState } from 'react'
import ProjectTab from '@components/atoms/tabs/ProjectTab'

interface ProjectTabsProps {
	tabData: { tab: string; icon: string; onClick?: () => void }[]
	selectedTab: string
	onTabChange: (tab: string) => void
}

const ProjectTabs: React.FC<ProjectTabsProps> = ({
	tabData,
	selectedTab,
	onTabChange
}) => {
	const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
	const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

	useEffect(() => {
		const updateIndicatorStyle = () => {
			const activeTab = tabRefs.current[selectedTab]
			if (activeTab) {
				const { offsetLeft, offsetWidth } = activeTab
				setIndicatorStyle({
					left: offsetLeft - 8,
					width: offsetWidth
				})
			}
		}

		updateIndicatorStyle()
		window.addEventListener('resize', updateIndicatorStyle)
		return () => window.removeEventListener('resize', updateIndicatorStyle)
	}, [selectedTab])

	return (
		<div className="relative flex space-x-2 my-4 bg-gray-900 p-2 overflow-x-auto whitespace-nowrap rounded-t-lg shadow-lg">
			{tabData.map(({ tab, icon, onClick }) => (
				<ProjectTab
					key={tab}
					tab={tab}
					icon={icon}
					isSelected={selectedTab === tab}
					onClick={onClick || (() => onTabChange(tab))}
					ref={(el) => (tabRefs.current[tab] = el)}
				/>
			))}
			<span
				className="absolute bottom-0 h-0.5 bg-orange-500 transition-all ease-in-out duration-300"
				style={indicatorStyle}
			></span>
		</div>
	)
}

export default ProjectTabs
