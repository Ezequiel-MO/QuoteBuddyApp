import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../helper/toast'
import { useCurrentProject } from '../../../../../hooks'
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core'
import { EventActivate } from './card/EventActivate'
import { ScheduleTableRow } from './ScheduleTableRow'
import { useDragAndDropSchedule } from './useDragAndDropSchedule'

export const TableSchedule: React.FC = () => {
	const { removeEventFromSchedule } = useCurrentProject()
	const {
		events,
		activeId,
		sensors,
		handleDragStart,
		handleDragOver,
		handleDragEnd
	} = useDragAndDropSchedule()

	const handleDeleteEvent = (
		dayIndex: number,
		timeOfEvent: string,
		eventId: string
	) => {
		const dayOfEvent = events[dayIndex]
		if (dayOfEvent) {
			removeEventFromSchedule({
				dayOfEvent: 'Arrival Day',
				timeOfEvent,
				eventId
			})
			toast.success('Event Removed', toastOptions)
		}
	}

	return (
		<div className="flex flex-col p-1 bg-gray-800 text-white-0">
			{/* Custom Headers */}
			<div className="flex items-start justify-start border-b border-gray-600 pb-2 mb-4">
				<div className="flex-1 uppercase font-semibold">Days</div>
				<div className="flex-1 text-left font-semibold">Morning Activities</div>
				<div className="flex-1 text-left font-semibold">Lunch Options</div>
				<div className="flex-1 text-left font-semibold">
					Afternoon Activities
				</div>
				<div className="flex-1 text-left font-semibold">Dinner Options</div>
			</div>

			{/* DnD Context */}
			<DndContext
				sensors={sensors}
				collisionDetection={closestCorners}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
			>
				<div className="flex flex-col gap-4">
					{events?.map((day, index) => (
						<ScheduleTableRow
							key={`day-${index}`}
							day={day}
							index={index}
							handleDeleteEvent={handleDeleteEvent}
						/>
					))}
				</div>
				<DragOverlay>
					{activeId && <EventActivate event={activeId} />}
				</DragOverlay>
			</DndContext>
		</div>
	)
}
