import { RenderSchedule } from '../../../render/schedule/render/RenderSchedule'
import { ScheduleList } from './ScheduleList'
import { useCurrentProject } from '../../../../../hooks'

export const ScheduleBuilder = () => {
	const { currentProject } = useCurrentProject()
	const { schedule } = currentProject

	return (
		<div className="container p-10 flex justify-around">
			<ScheduleList schedule={schedule} />
			<RenderSchedule />
		</div>
	)
}
