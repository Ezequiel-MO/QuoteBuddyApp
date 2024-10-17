// src/components/molecules/tabs/TabbedContent.tsx

import React from 'react'
import useTabs from './useTabs'
import TabList from './TabList'
import TabContent from '@components/atoms/tabs/TabContent'

interface TabbedContentProps<T> {
	items: T[]
	renderItem: (item: T, index: number, isActive: boolean) => React.ReactNode
	type: string
}

const TabbedContent = <T extends { _id?: string; name: string }>({
	items,
	renderItem,
	type
}: TabbedContentProps<T>) => {
	const { openTab, setOpenTab, tabListItems } = useTabs(items)

	if (items.length === 0) return null

	return (
		<div>
			<TabList
				tabListItems={tabListItems}
				type={type}
				activeTab={openTab}
				setActiveTab={setOpenTab}
				onTabClick={(id: string) => console.log('Tab clicked:', id)}
			/>
			<div>
				{items.map((item, index) => {
					const isActive = openTab === index + 1
					return (
						<TabContent key={item._id ?? index} isActive={isActive}>
							{renderItem(item, index, isActive)}
						</TabContent>
					)
				})}
			</div>
		</div>
	)
}

export default TabbedContent
