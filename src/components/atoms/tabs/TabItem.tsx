// src/components/atoms/tabs/TabItem.tsx

import { ISetting } from '@interfaces/setting'
import React /*, { useEffect }*/ from 'react'
import { tabStyles } from 'src/constants/tabStyles'
import { useCurrentProject, useLocalStorageItem } from 'src/hooks'

type TabListItem = {
	_id: string
	name: string
}

type TabItemProps = {
	tabListItem: TabListItem
	type: string
	index: number
	activeTab: number
	setActiveTab: (index: number) => void
}

export const TabItem: React.FC<TabItemProps> = ({
	tabListItem,
	type,
	index,
	activeTab,
	setActiveTab
}) => {
	const isActive = activeTab === index + 1
	const { currentProject } = useCurrentProject()
	const { clientCompany, hasExternalCorporateImage } = currentProject
	const item = useLocalStorageItem('settings', {}) as unknown as ISetting
	const primary = item?.colorPalette?.primary || '#ea5933'

	const colorPalette = hasExternalCorporateImage
		? clientCompany[0].colorPalette[0]
		: primary

	return (
		<li id={tabListItem._id}>
			<a
				className={`${tabStyles.tabClasses} ${
					isActive ? tabStyles.activeClasses : tabStyles.inactiveClasses
				}`}
				style={{ backgroundColor: isActive ? colorPalette : undefined }}
				onClick={(e) => {
					e.preventDefault()
					setActiveTab(index + 1)
				}}
				href={`#tab${index + 1}`}
				role="tablist"
			>
				{tabListItem.name}
			</a>
		</li>
	)
}

export default TabItem
