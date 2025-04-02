import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../helper/toast'
import { useCurrentProject } from '../../../../../hooks'
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core'
import { EventActivate } from './card/EventActivate'
import { ScheduleTableRow } from './ScheduleTableRow'
import { useDragAndDropSchedule } from './useDragAndDropSchedule'
import { TimeOfEvent } from '@redux/features/currentProject/types'

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
		removeEventFromSchedule({
			dayIndex,
			timeOfEvent: timeOfEvent as TimeOfEvent,
			eventId
		})
		toast.success('Event Removed', toastOptions)
	}

	return (
		<div className="bg-gray-900 text-white-0 rounded-xl shadow-xl overflow-hidden border border-gray-700">
			{/* Header */}
			<div className="grid grid-cols-5 gap-4 bg-gradient-to-r from-gray-800 to-gray-700 p-4 border-b border-gray-600">
				<div className="font-semibold uppercase tracking-wider text-cyan-400">
					Days
				</div>
				<div className="font-semibold uppercase tracking-wider text-cyan-400">
					Morning Activities
				</div>
				<div className="font-semibold uppercase tracking-wider text-cyan-400">
					Lunch Options
				</div>
				<div className="font-semibold uppercase tracking-wider text-cyan-400">
					Afternoon Activities
				</div>
				<div className="font-semibold uppercase tracking-wider text-cyan-400">
					Dinner Options
				</div>
			</div>

			{/* DnD Context for drag and drop functionality */}
			<DndContext
				sensors={sensors}
				collisionDetection={closestCorners}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
			>
				<div className="divide-y divide-gray-700">
					{events?.map((day, index) => (
						<ScheduleTableRow
							key={`day-${index}`}
							day={day}
							index={index}
							handleDeleteEvent={handleDeleteEvent}
						/>
					))}
				</div>

				{/* Overlay that follows the cursor during drag */}
				<DragOverlay>
					{activeId && <EventActivate event={activeId} />}
				</DragOverlay>
			</DndContext>
		</div>
	)
}
