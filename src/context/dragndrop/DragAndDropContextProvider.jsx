import { DndContext, closestCenter } from '@dnd-kit/core'
import { useDragAndDrop } from './useDragAndDrop'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

export const DragAndDropContextProvider = ({
	children,
	initialItems,
	onMove
}) => {
	const { handleDragEnd, sensors, itemsState } = useDragAndDrop(
		initialItems,
		onMove
	)

	return (
		<DndContext
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
			sensors={sensors}
		>
			<SortableContext
				items={itemsState.map(({ _id }) => _id)}
				strategy={verticalListSortingStrategy}
			>
				{children(itemsState)}
			</SortableContext>
		</DndContext>
	)
}
