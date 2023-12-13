import { FC, useState, useEffect } from "react"
import { DndContext, closestCorners, DragOverlay } from '@dnd-kit/core'
import {
	DragStartEvent,
	DragOverEvent,
	DragEndEvent,
	Active,
	DroppableContainer
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { TableHeaders } from 'src/ui'
import { useDragAndDropSchedule } from '../../schedule/render/useDragAndDropSchedule'
import { DayOvernight } from "./DayOvernight"
import { useCurrentProject } from 'src/hooks'
import { EventActivate } from '../../schedule/render/card/EventActivate'
import { IDay, IProject } from '@interfaces/project'
import { IHotel } from "@interfaces/hotel"

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


	//handle para seleccionar el hotel que va hacer el drag
	const handleDragStart = (dragEvent: DragStartEvent) => {
		const { active } = dragEvent
		const { id, data } = active
		const currentData = data as IDraggableData
		const { containerId, index } = currentData.current.sortable
		const hotel = project?.schedule[containerId as number].overnight.hotels[index]
		setDragActivate(hotel)
	}

	//handle para mover el "hotel" en otro array
	const handleDragOver = (dragOverEvent: DragOverEvent) => {
		const { active, over } = dragOverEvent
		if (!active || !over) {
			return
		}
		if (active.id === over.id) {
			return
		}
		const activateCurrent = active.data.current as ISortableData
		const overCurrent = over.data.current as ISortableData
		const dayIndexActivate = activateCurrent?.sortable?.containerId
		const dayIndexOver = overCurrent ? overCurrent.sortable.containerId : over.id
		if (dayIndexActivate === dayIndexOver) {
			return
		}
		setProject((prevProject) => {
			const newProyect: IProject = JSON.parse(JSON.stringify(prevProject))
			const hotelsOvernightFilter = newProyect.schedule[dayIndexActivate as number ?? 0].overnight.hotels.filter(
				el => el._id !== active.id
			)
			let newIndexHotel = newProyect.schedule[dayIndexOver as number].overnight.hotels.findIndex(
				(el) => el._id === over.id
			)
			newIndexHotel = newIndexHotel >= 0 ? newIndexHotel : 0
			let sourceArray = [...newProyect.schedule[dayIndexOver as number].overnight.hotels]
			const [elementHotel] = sourceArray.splice(newIndexHotel, 1)
			elementHotel && sourceArray.splice(newIndexHotel, 0, elementHotel)
			sourceArray.splice(newIndexHotel, 0, dragActivate)
			newProyect.schedule[dayIndexActivate as number].overnight.hotels = hotelsOvernightFilter
			newProyect.schedule[dayIndexOver as number].overnight.hotels = sourceArray
			return newProyect
		})
	}

	//handle para cambiar de lugar el "hotel" en el mismo array
	const handleDragEnd = (dragEvent: DragEndEvent) => {
		const { active, over } = dragEvent
		if (!over) {
			return
		}
		const activateCurrent = active.data.current as ISortableData
		const overCurrent = over.data.current as ISortableData
		const dayIndexActivate = activateCurrent?.sortable?.containerId
		const dayIndexOver = overCurrent ? overCurrent.sortable.containerId : over.id
		const startIndex = project?.schedule[dayIndexActivate as number].overnight.hotels.findIndex(
			el => el._id === active.id
		)
		const overIndex = project?.schedule[dayIndexOver as number].overnight.hotels.findIndex(
			el => el._id === over.id
		)
		const copyProyect: IProject = JSON.parse(JSON.stringify(project))
		copyProyect.schedule[dayIndexOver as number].overnight.hotels = arrayMove(
			copyProyect.schedule[dayIndexOver as number].overnight.hotels,
			startIndex as number,
			overIndex as number
		)
		if (dayIndexActivate === dayIndexOver) {
			setProject(copyProyect)
		}
		if (copyProyect) {
			dragAndDropHotelOvernight({ newSchedule: copyProyect.schedule })
		}
		setDragActivate("")
	}

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
					{project?.schedule?.map((day: IDay, index: number) => (
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
				<DragOverlay>
					{
						dragActivate && <EventActivate event={dragActivate} />
					}
				</DragOverlay>
			</DndContext>
		</table>
	)
}
