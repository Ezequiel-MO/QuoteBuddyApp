import { DndContext, closestCorners } from '@dnd-kit/core'
import { TableHeaders } from 'src/ui'
import { useDragAndDropSchedule } from '../../schedule/render/useDragAndDropSchedule'
import { DayOvernight } from "./DayOvernight"
import { IDay } from '@interfaces/project'

interface TableHotelProps {
	onDelete: (id: string) => Promise<boolean>
}

export const TableHotel: React.FC<TableHotelProps> = ({ onDelete }) => {

	const { events, activeId, sensors, handleDragStart, handleDragOver, handleDragEnd } = useDragAndDropSchedule()

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
						<tr key={day._id} className="border border-gray-600 bg-gray-800">
							<td className="px-4 py-2 text-white-0 text-sm font-medium bg-gray-700 border border-gray-600">
								{day.date}
							</td>
							<td className="p-2 w-[350px]" >
								<DayOvernight day={day} dayIndex={index} onDelete={onDelete} />
							</td>
						</tr>
					))}
				</tbody>
			</DndContext>
		</table>
	)
}
