import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../helper/toast'
import { useCurrentProject } from '../../../../../hooks'
import { TableHeaders } from '../../../../../ui'
import { DayEvents } from "./DayEvents"
import { DragDropContext } from '@hello-pangea/dnd';

export const TableSchedule = () => {
	const { currentProject, removeEventFromSchedule } = useCurrentProject()

	const handleDeleteEvent = (dayOfEvent, timeOfEvent, eventId) => {
		removeEventFromSchedule({ dayOfEvent, timeOfEvent, eventId })
		toast.success('Event Removed', toastOptions)
	}

	const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const itemsCopy = [...items];
        const [reorderedItem] = itemsCopy.splice(result.source.index, 1);
        itemsCopy.splice(result.destination.index, 0, reorderedItem);
        setItems(itemsCopy);
    };

	console.log(currentProject.schedule[1]["morningEvents"])

	return (
		// <DragDropContext onDragEnd={handleOnDragEnd} >

			<table className="table-auto border-collapse border border-white-50 text-white-50">
				<TableHeaders headers="projectBase" />
				<tbody>
					{currentProject['schedule']?.map((day, index) => (
						<tr key={day._id} className="border border-white-100">
							<td>{day.date}</td>
							<td>
								<DayEvents
									day={day}
									event="morningEvents"
									handleDeleteEvent={handleDeleteEvent}
									dayIndex={index}
								/>
							</td>
							<td>
								<DayEvents
									day={day}
									event="lunch"
									handleDeleteEvent={handleDeleteEvent}
									dayIndex={index}
								/>
							</td>
							<td>
								<DayEvents
									day={day}
									event="afternoonEvents"
									handleDeleteEvent={handleDeleteEvent}
									dayIndex={index}
								/>
							</td>
							<td>
								<DayEvents
									day={day}
									event="dinner"
									handleDeleteEvent={handleDeleteEvent}
									dayIndex={index}
								/>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		// </DragDropContext>
	)
}

