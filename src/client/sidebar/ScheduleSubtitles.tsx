import { IDay } from '@interfaces/project'
import { ScheduleDaySubtitles } from './ScheduleDaySubtitles'

interface Props {
	title: string
	menuOpen: boolean
	setMenuOpen: (value: boolean) => void
	schedule: IDay[]
}

export const ScheduleSubtitles = ({
	title,
	menuOpen,
	setMenuOpen,
	schedule
}: Props) => {
	return (
		<div
			className={`${
				menuOpen
					? 'inline-block transition-all ease-in-out duration-300'
					: 'opacity-0 h-0'
			}`}
		>
			{schedule.map(
				(day) =>
					title === day.date && (
						<ScheduleDaySubtitles
							key={day._id}
							day={day}
							menuOpen={menuOpen}
							setMenuOpen={setMenuOpen}
						/>
					)
			)}
		</div>
	)
}
