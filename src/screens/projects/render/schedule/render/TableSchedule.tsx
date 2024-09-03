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
		const dayOfEvent = events[dayIndex].date
		if (dayOfEvent) {
			removeEventFromSchedule({
				dayOfEvent,
				timeOfEvent,
				eventId
			})
			toast.success('Event Removed', toastOptions)
		}
	}

	return (
		<div className="p-4 bg-gray-800 text-white">
			{/* Custom Headers */}
			<div className="grid grid-cols-5 gap-4 border-b border-gray-600 pb-2 mb-4">
				<div className="font-semibold uppercase">Days</div>
				<div className="font-semibold uppercase">Morning Activities</div>
				<div className="font-semibold uppercase">Lunch Options</div>
				<div className="font-semibold uppercase">Afternoon Activities</div>
				<div className="font-semibold uppercase">Dinner Options</div>
			</div>

			<DndContext
				sensors={sensors}
				collisionDetection={closestCorners}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
			>
				<div className="grid gap-2">
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
