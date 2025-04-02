import { toast } from 'react-toastify'
import { toastOptions } from '../../../../../helper/toast'
import { useCurrentProject } from '../../../../../hooks'
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core'
import { EventActivate } from './card/EventActivate'
import { ScheduleTableRow } from './ScheduleTableRow'
import { useDragAndDropSchedule } from './useDragAndDropSchedule'
import { TimeOfEvent } from '@redux/features/currentProject/types'
import { Icon } from '@iconify/react'

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
			{/* Header with Icons */}
			<div className="grid grid-cols-5 gap-4 bg-gradient-to-r from-gray-800 to-gray-700 p-4 border-b border-gray-600">
				<div className="font-semibold uppercase tracking-wider text-cyan-400 flex items-center justify-center">
					<Icon icon="mdi:calendar" className="mr-2 text-[#ea5933]" />{' '}
					{/* Changed icon color */}
					<span>Days</span>
				</div>
				<div className="font-semibold uppercase tracking-wider text-cyan-400 flex items-center justify-center">
					<Icon icon="mdi:hiking" className="mr-2 text-[#ea5933]" />{' '}
					{/* Changed icon color */}
					<span>Morning Activities</span>
				</div>
				<div className="font-semibold uppercase tracking-wider text-cyan-400 flex items-center justify-center">
					<Icon icon="mdi:food-fork-drink" className="mr-2 text-[#ea5933]" />{' '}
					{/* Changed icon color */}
					<span>Lunch Options</span>
				</div>
				<div className="font-semibold uppercase tracking-wider text-cyan-400 flex items-center justify-center">
					<Icon icon="mdi:camera" className="mr-2 text-[#ea5933]" />{' '}
					{/* Changed icon color */}
					<span>Afternoon Activities</span>
				</div>
				<div className="font-semibold uppercase tracking-wider text-cyan-400 flex items-center justify-center">
					<Icon
						icon="mdi:silverware-fork-knife"
						className="mr-2 text-[#ea5933]"
					/>{' '}
					{/* Changed icon color */}
					<span>Dinner Options</span>
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
