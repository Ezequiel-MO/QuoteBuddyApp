import { ScheduleItem } from './ScheduleItem'

export const ScheduleList = ({ schedule }) => {
	return (
		<ol className="border-l-2 border-camel-50">
			{schedule?.map((day, index) => (
				<ScheduleItem key={day._id} day={day} index={index} />
			))}
		</ol>
	)
}
