import { IProject } from '@interfaces/project'
import { useState } from 'react'
import { useCurrentProject } from 'src/hooks'
import { SidebarTitles } from './SidebarTitles'
import { SidebarSubtitles } from './SidebarSubtitles'

interface Props {
	iconText: string
	title: string
	isSidebarVisible: boolean
}

export const SidebarRow = ({ iconText, title, isSidebarVisible }: Props) => {
	const [menuOpen, setMenuOpen] = useState(false)
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { hotels, schedule, clientCompany } = currentProject

	const { colorPalette = [] } = clientCompany[0] || {}

	return (
		<>
			<SidebarTitles
				iconText={iconText}
				title={title}
				colorPalette={colorPalette}
				setMenuOpen={setMenuOpen}
				isSidebarVisible={isSidebarVisible}
			/>
			<SidebarSubtitles
				title={title}
				menuOpen={menuOpen}
				setMenuOpen={setMenuOpen}
				schedule={schedule}
			/>
		</>
	)
}
