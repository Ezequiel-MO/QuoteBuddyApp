import React, { useEffect, useRef, useState, useMemo } from 'react'
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
				setIndicatorStyle({
					left: offsetLeft,
					width: offsetWidth
				})
			}
		}

		updateIndicatorStyle()

		window.addEventListener('resize', updateIndicatorStyle)
		return () => window.removeEventListener('resize', updateIndicatorStyle)
	}, [state.selectedTab])

	// Memoize the tab data to avoid re-rendering unless multiDestination changes
	const tabData = useMemo(() => {
		const baseTabs = [
			{ tab: 'Intro Text/Gifts', icon: 'tabler:book' },
			{ tab: 'Transfers IN', icon: 'solar:bus-bold' },
			{ tab: 'Hotels', icon: 'bx:hotel' },
			{ tab: 'Meetings', icon: 'la:handshake-solid' },
			{ tab: 'Transfers OUT', icon: 'solar:bus-bold' },
			{ tab: 'Preview', icon: 'mdi:print-preview', onClick: onPreviewClick }
		]

		// Conditionally replace 'Schedule' with 'Itinerary'
		if (multiDestination) {
			return [
				...baseTabs.slice(0, 4), // First four tabs
				{ tab: 'Itinerary', icon: 'ph:car' }, // Replace 'Schedule' with 'Itinerary'
				...baseTabs.slice(4) // 'Transfers OUT' and 'Preview'
			]
		} else {
			return [
				...baseTabs.slice(0, 4), // First four tabs
				{ tab: 'Schedule', icon: 'ph:calendar' }, // Include 'Schedule' for non-multiDestination
				...baseTabs.slice(4) // 'Transfers OUT' and 'Preview'
			]
		}
	}, [multiDestination, onPreviewClick])

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
			<span
				className="absolute bottom-0 h-0.5 bg-orange-500 transition-all ease-in-out duration-300"
				style={indicatorStyle}
			></span>
		</div>
	)
}

export default ScheduleMenu
