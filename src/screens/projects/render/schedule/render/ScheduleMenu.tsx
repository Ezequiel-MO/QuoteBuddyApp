import React from 'react'
import { useProject } from '@screens/projects/context/ProjectContext'
import ProjectTabs from './tabs/ProjectTabs'
import { useProjectTabData } from './tabs/useProjectTabData'

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
	const tabData = useProjectTabData({ multiDestination, onPreviewClick })

	return (
		<div className="bg-gray-800 text-white-0 p-2 rounded-md shadow-md">
			<ProjectTabs
				tabData={tabData}
				selectedTab={state.selectedTab}
				onTabChange={onTabChange}
			/>
		</div>
	)
}

export default ScheduleMenu
