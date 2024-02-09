import { useState, useRef, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useScheduleContext } from './ScheduleContext'

interface Props {
	multiDestination: boolean
	onPreviewClick: () => void
}

type Tab =
	| 'Intro Text/Gifts'
	| 'Transfers IN'
	| 'Hotels'
	| 'Meetings'
	| 'Schedule'
	| 'Transfers OUT'
	| 'Itinerary'
	| 'Preview'

export const ScheduleMenu = ({ multiDestination, onPreviewClick }: Props) => {
	const { selectedTab, setSelectedTab } = useScheduleContext()
	const tabRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
	const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

	useEffect(() => {
		setTimeout(() => {
			const activeTab = tabRefs.current[selectedTab]
			if (activeTab) {
				const { offsetLeft, offsetWidth } = activeTab
				setIndicatorStyle({ left: offsetLeft, width: offsetWidth })
			}
		}, 0)
	}, [selectedTab])

	const renderTab = (tab: Tab, icon: string, onClick?: () => void) => (
		<div
			ref={(el) => (tabRefs.current[tab] = el)}
			className={`relative flex items-center cursor-pointer px-4 py-2 transition-colors duration-200 ${
				selectedTab === tab ? 'text-orange-500' : 'text-gray-400'
			}`}
			onClick={() => {
				if (onClick) {
					onClick()
				} else {
					setSelectedTab(tab)
				}
			}}
			aria-label={`Select ${tab} tab`}
		>
			<Icon
				icon={icon}
				width={24}
				className={`mr-2 ${
					selectedTab === tab ? 'text-cyan-400' : 'text-gray-500'
				}`}
			/>
			<span
				className={`font-semibold ${
					selectedTab === tab ? 'text-orange-500' : 'text-gray-400'
				}`}
			>
				{tab}
			</span>
		</div>
	)

	return (
		<div className="relative flex space-x-4 my-4 bg-gray-900 p-2 overflow-x-auto whitespace-nowrap">
			{renderTab('Intro Text/Gifts', 'tabler:book')}
			{renderTab('Transfers IN', 'solar:bus-bold')}
			{renderTab('Hotels', 'bx:hotel')}
			{renderTab('Meetings', 'la:handshake-solid')}
			{renderTab('Schedule', 'ph:calendar')}
			{multiDestination && renderTab('Itinerary', 'ph:car')}
			{renderTab('Transfers OUT', 'solar:bus-bold')}
			{renderTab('Preview', 'mdi:print-preview', onPreviewClick)}
			<span
				className="absolute bottom-0 h-0.5 bg-orange-500 transition-all ease-in-out duration-300"
				style={indicatorStyle}
			></span>
		</div>
	)
}
