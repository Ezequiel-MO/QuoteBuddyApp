import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../helper/toast'
import { useCurrentProject } from '../../../../../hooks'
import { TableHeaders } from '../../../../../ui'
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core'
import { EventActivate } from './card/EventActivate'
import { ScheduleTableRow } from './ScheduleTableRow'
import { useDragAndDropSchedule } from './useDragAndDropSchedule'

export const TableSchedule = () => {
	const {
		events,
		activeId,
		sensors,
		handleDragStart,
		handleDragOver,
		handleDragEnd
	} = useDragAndDropSchedule()
	const { removeEventFromSchedule } = useCurrentProject()

	const handleDeleteEvent = (dayOfEvent, timeOfEvent, eventId) => {
		removeEventFromSchedule({ dayOfEvent, timeOfEvent, eventId })
		toast.success('Event Removed', toastOptions)
	}

	const showFullDayMeetings = events?.some(
		(event) => event.fullDayMeetings && event.fullDayMeetings.length > 0
	)

	return (
		<table className="table-auto border-collapse border-2 border-white-0 text-white-0">
			<TableHeaders
				headers="projectBase"
				showFullDayMeetings={showFullDayMeetings}
			/>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCorners}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
			>
				<tbody>
					{events?.map((day, index) => (
						<ScheduleTableRow
							key={day._id}
							day={day}
							index={index}
							handleDeleteEvent={handleDeleteEvent}
						/>
					))}
				</tbody>
				<DragOverlay>
					{activeId && <EventActivate event={activeId} key={activeId._id} />}
				</DragOverlay>
			</DndContext>
		</table>
	)
}
