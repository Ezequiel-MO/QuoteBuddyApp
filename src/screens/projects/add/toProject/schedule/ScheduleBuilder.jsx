import { ScheduleProvider } from '@screens/projects/render/schedule/render/ScheduleContext'
import { RenderSchedule } from '../../../render/schedule/render/RenderSchedule'

export const ScheduleBuilder = () => {
	return (
		<div className="p-10 bg-gray-800 rounded-lg overflow-auto">
			<ScheduleProvider>
				<RenderSchedule />
			</ScheduleProvider>
		</div>
	)
}
