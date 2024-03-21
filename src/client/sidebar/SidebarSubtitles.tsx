import { ScheduleSubtitles } from './ScheduleSubtitles'

import { IDay } from '@interfaces/project'

interface Props {
	title: string
	menuOpen: boolean
	setMenuOpen: (value: boolean) => void
	schedule: IDay[]
}

export const SidebarSubtitles: React.FC<Props> = ({
	title,
	menuOpen,
	setMenuOpen,
	schedule
}) => {
	return (
		<>
			<ScheduleSubtitles
				title={title}
				menuOpen={menuOpen}
				setMenuOpen={setMenuOpen}
				schedule={schedule}
			/>
		</>
	)
}
