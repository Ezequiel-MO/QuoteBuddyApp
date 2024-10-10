import React from 'react'
import OverviewTable from '@screens/clientMainPage/overview/OverviewTable'
import MainClientPage from 'src/client/MainClientPage'

const ProjectOverview: React.FC = () => {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Project Overview</h1>
			<OverviewTable />
			<MainClientPage />
		</div>
	)
}

export default ProjectOverview
