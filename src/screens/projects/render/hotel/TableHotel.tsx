import { DndContext, closestCorners } from '@dnd-kit/core'
import { TableHeaders } from 'src/ui'
import { useDragAndDropSchedule } from '../schedule/render/useDragAndDropSchedule'
import { IDay } from '@interfaces/project'
import { ScheduleTableRow } from '../schedule/render/ScheduleTableRow'

export const TableHotel: React.FC = () => {
	const { events, sensors, handleDragStart, handleDragOver, handleDragEnd } =
		useDragAndDropSchedule()
	console.log('eveents', events)
	const handleDeleteEvent = (
		dayOfEvent: string,
		timeOfEvent: string,
		eventId: string
	) => {}
	return (
		<table className="table-auto border-collapse border-2 border-white-0 text-white-0">
			<TableHeaders headers="multiHotel" />
			<DndContext
				sensors={sensors}
				collisionDetection={closestCorners}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
			>
				<tbody>
					{events?.map((day: IDay, index: number) => (
						<tr key={day._id}>
							<td>{`Hello ${day.date}`}</td>
						</tr>
					))}
				</tbody>
			</DndContext>
		</table>
	)
}
