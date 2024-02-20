import { IProject } from '@interfaces/project'
import { checkDayIsEmpty } from 'src/helper/checkEmptyDay'
import { useCurrentProject } from 'src/hooks'
import { ScheduleDay } from './ScheduleDay'

const Schedule = () => {
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const { schedule, suplementaryText, arrivalDay } = currentProject
	return (
		<div>
			{schedule?.map((day, index) => {
				if (!checkDayIsEmpty(day)) {
					return (
						<ScheduleDay
							key={day._id}
							day={day}
							index={index}
							suplementaryText={suplementaryText}
							arrivalDay={arrivalDay}
						/>
					)
				}
			})}
		</div>
	)
}

export default Schedule
