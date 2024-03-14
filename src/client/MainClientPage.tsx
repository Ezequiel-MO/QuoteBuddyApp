import React from 'react'
import TopBar from './TopBar'
import Sidebar from './sidebar/Sidebar'
import MainContent from './MainContent'

const MainClientPage: React.FC = () => {
	return (
		<div className="min-h-screen flex flex-col">
			<TopBar />
			<div className="flex flex-1">
				<Sidebar />
				<MainContent />
			</div>
		</div>
	)
}

export default MainClientPage
