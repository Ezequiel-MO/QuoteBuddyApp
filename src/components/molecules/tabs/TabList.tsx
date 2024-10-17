// src/components/molecules/tabs/TabList.tsx

import { TabItem } from '@components/atoms/tabs/TabItem'
import './styles.css'
import React, { useEffect, useRef, useState } from 'react'

type TabListItemType = {
	_id: string
	name: string
}

type TabListProps = {
	tabListItems: TabListItemType[]
	type: string
	activeTab: number
	setActiveTab: (index: number) => void
	onTabClick: (id: string) => void
}

export const TabList: React.FC<TabListProps> = ({
	tabListItems,
	type,
	activeTab,
	setActiveTab,
	onTabClick
}) => {
	const ref = useRef<HTMLUListElement>(null)

	const [indicatorStyles, setIndicatorStyles] = useState<{
		left: string
		width: string
	}>({
		left: '0px',
		width: '0px'
	})

	useEffect(() => {
		if (ref.current) {
			const nodes = ref.current.childNodes
			const activeIndex = activeTab - 1
			if (nodes[activeIndex]) {
				const element = nodes[activeIndex] as HTMLElement
				setIndicatorStyles({
					left: `${element.offsetLeft}px`,
					width: `${element.offsetWidth}px`
				})
			}
		}
	}, [activeTab])

	return (
		<ul
			className="flex flex-wrap gap-1 md:gap-2 py-4 tab-list relative"
			ref={ref}
		>
			{tabListItems.map((tabListItem, index) => (
				<div key={tabListItem._id} onClick={() => onTabClick(tabListItem._id)}>
					<TabItem
						tabListItem={tabListItem}
						type={type}
						index={index}
						activeTab={activeTab}
						setActiveTab={setActiveTab}
					/>
				</div>
			))}
			<span
				style={{
					...indicatorStyles,
					position: 'absolute',
					bottom: '0',
					height: '4px',
					backgroundColor: '#ea5933'
				}}
				className="transition-all ease-in-out duration-300"
			></span>
		</ul>
	)
}

export default TabList
