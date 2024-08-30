import React, { useEffect, useRef, useState } from 'react'
import { useProject } from '@screens/projects/context/ProjectContext'
import ProjectTab from '@components/atoms/tabs/ProjectTab'

interface ScheduleMenuProps {
	multiDestination: boolean
	onPreviewClick: () => void
	onTabChange: (tab: string) => void
}

const ScheduleMenu: React.FC<ScheduleMenuProps> = ({
	multiDestination,
	onPreviewClick,
	onTabChange
}) => {
	const { state } = useProject()
	const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
	const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

	useEffect(() => {
		const updateIndicatorStyle = () => {
			const activeTab = tabRefs.current[state.selectedTab]
			if (activeTab) {
				const { offsetLeft, offsetWidth } = activeTab
				const centerLeft = offsetLeft + offsetWidth / 2 - offsetWidth / 2
				const indicatorWidth = offsetWidth

				setIndicatorStyle({
					left: centerLeft,
					width: indicatorWidth
				})
			}
		}

		updateIndicatorStyle()

		window.addEventListener('resize', updateIndicatorStyle)
		return () => window.removeEventListener('resize', updateIndicatorStyle)
	}, [state.selectedTab])

	const tabData = [
		{ tab: 'Intro Text/Gifts', icon: 'tabler:book' },
		{ tab: 'Transfers IN', icon: 'solar:bus-bold' },
		{ tab: 'Hotels', icon: 'bx:hotel' },
		{ tab: 'Meetings', icon: 'la:handshake-solid' },
		{ tab: 'Schedule', icon: 'ph:calendar' },
		{ tab: 'Transfers OUT', icon: 'solar:bus-bold' },
		{ tab: 'Preview', icon: 'mdi:print-preview', onClick: onPreviewClick }
	]

	return (
		<div className="relative flex space-x-2 my-4 bg-gray-900 p-2 overflow-x-auto whitespace-nowrap rounded-t-lg shadow-lg">
			{tabData.map(({ tab, icon, onClick }) => (
				<ProjectTab
					key={tab}
					tab={tab}
					icon={icon}
					isSelected={state.selectedTab === tab}
					onClick={onClick || (() => onTabChange(tab))}
					ref={(el) => (tabRefs.current[tab] = el)}
				/>
			))}
			{multiDestination && (
				<ProjectTab
					tab="Itinerary"
					icon="ph:car"
					isSelected={state.selectedTab === 'Itinerary'}
					onClick={() => onTabChange('Itinerary')}
					ref={(el) => (tabRefs.current['Itinerary'] = el)}
				/>
			)}
			<span
				className="absolute bottom-0 h-0.5 bg-orange-500 transition-all ease-in-out duration-300"
				style={indicatorStyle}
			></span>
		</div>
	)
}

export default ScheduleMenu
