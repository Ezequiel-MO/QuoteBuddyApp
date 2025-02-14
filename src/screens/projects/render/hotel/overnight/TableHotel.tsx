import { FC, useState, useEffect } from 'react'
import { DndContext, closestCorners, DragOverlay } from '@dnd-kit/core'
import { DragStartEvent, DragOverEvent, DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { TableHeaders } from 'src/ui'
import { useDragAndDropSchedule } from '../../schedule/render/useDragAndDropSchedule'
import { DayOvernight } from './DayOvernight'
import { useCurrentProject } from 'src/hooks'
import { EventActivate } from '../../schedule/render/card/EventActivate'
import { IDay, IProject } from '@interfaces/project'
import { IHotel } from '@interfaces/hotel'

interface ISortableData {
	sortable: {
		containerId: string | number
		index: number
		items: IHotel[]
	}
}

interface IDraggableData {
	current: ISortableData
}

interface TableHotelProps {
	onDelete: (id: string) => Promise<boolean>
}

export const TableHotel: React.FC<TableHotelProps> = ({ onDelete }) => {
	const { currentProject, dragAndDropHotelOvernight } = useCurrentProject()
	const { sensors } = useDragAndDropSchedule()

	const [project, setProject] = useState<IProject>()
	const [dragActivate, setDragActivate] = useState<any>()

	useEffect(() => {
		setProject(currentProject)
	}, [currentProject.schedule])

	const handleDragStart = (dragEvent: DragStartEvent) => {
		const { active } = dragEvent
		const { data } = active
		const currentData = data as IDraggableData
		const { containerId, index } = currentData.current.sortable
		const hotel =
			project?.schedule[containerId as number].overnight.hotels[index]
		setDragActivate(hotel)
	}

	const handleDragOver = (dragOverEvent: DragOverEvent) => {
		const { active, over } = dragOverEvent
		if (!active || !over) return
		if (active.id === over.id) return

		const activateCurrent = active.data.current as ISortableData
		const overCurrent = over.data.current as ISortableData
		const dayIndexActivate = activateCurrent?.sortable?.containerId
		const dayIndexOver = overCurrent
			? overCurrent.sortable.containerId
			: over.id

		if (dayIndexActivate === dayIndexOver) return

		setProject((prevProject) => {
			const newProject: IProject = JSON.parse(JSON.stringify(prevProject))
			const filtered = newProject.schedule[
				(dayIndexActivate as number) ?? 0
			].overnight.hotels.filter((el) => el._id !== active.id)
			let newIndexHotel = newProject.schedule[
				dayIndexOver as number
			].overnight.hotels.findIndex((el) => el._id === over.id)
			newIndexHotel = newIndexHotel >= 0 ? newIndexHotel : 0
			let sourceArray = [
				...newProject.schedule[dayIndexOver as number].overnight.hotels
			]
			const [elementHotel] = sourceArray.splice(newIndexHotel, 1)
			elementHotel && sourceArray.splice(newIndexHotel, 0, elementHotel)
			sourceArray.splice(newIndexHotel, 0, dragActivate)
			newProject.schedule[dayIndexActivate as number].overnight.hotels =
				filtered
			newProject.schedule[dayIndexOver as number].overnight.hotels = sourceArray
			return newProject
		})
	}

	const handleDragEnd = (dragEvent: DragEndEvent) => {
		const { active, over } = dragEvent
		if (!over) return

		const activateCurrent = active.data.current as ISortableData
		const overCurrent = over.data.current as ISortableData
		const dayIndexActivate = activateCurrent?.sortable?.containerId
		const dayIndexOver = overCurrent
			? overCurrent.sortable.containerId
			: over.id

		const startIndex = project?.schedule[
			dayIndexActivate as number
		].overnight.hotels.findIndex((el) => el._id === active.id)
		const overIndex = project?.schedule[
			dayIndexOver as number
		].overnight.hotels.findIndex((el) => el._id === over.id)

		const copyProject: IProject = JSON.parse(JSON.stringify(project))
		copyProject.schedule[dayIndexOver as number].overnight.hotels = arrayMove(
			copyProject.schedule[dayIndexOver as number].overnight.hotels,
			startIndex as number,
			overIndex as number
		)

		if (dayIndexActivate === dayIndexOver) {
			setProject(copyProject)
		}
		if (copyProject) {
			dragAndDropHotelOvernight({ newSchedule: copyProject.schedule })
		}
		setDragActivate('')
	}

	return (
		<table className="table-auto border-collapse border-2 border-white-0 text-white-0 w-full">
			<TableHeaders headers="multiHotel" />
			<DndContext
				sensors={sensors}
				collisionDetection={closestCorners}
				onDragStart={handleDragStart}
				onDragOver={handleDragOver}
				onDragEnd={handleDragEnd}
			>
				<tbody>
					{project?.schedule?.map((day: IDay, index: number) => (
						<tr key={day._id} className="border border-gray-600 bg-gray-800">
							<td className="px-4 py-2 bg-gray-700 border border-gray-600 text-white-0 text-sm font-medium">
								{day.date}
							</td>
							<td className="p-2 w-[350px]">
								<DayOvernight day={day} dayIndex={index} onDelete={onDelete} />
							</td>
						</tr>
					))}
				</tbody>
				<DragOverlay>
					{dragActivate && <EventActivate event={dragActivate} />}
				</DragOverlay>
			</DndContext>
		</table>
	)
}
