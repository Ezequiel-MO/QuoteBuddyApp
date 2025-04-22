import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import PlanningItemCard from './PlanningItemCard'
import { IPlanningItem } from '@interfaces/planner'
import { Icon } from '@iconify/react'

interface SortablePlanningItemCardProps {
	item: IPlanningItem
}

const SortablePlanningItemCard: React.FC<SortablePlanningItemCardProps> = ({
	item
}) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({
		id: item._id || `temp-${item.title}`, // Ensure we have a valid ID
		data: item
	})

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.4 : 1 // Make it more transparent when dragging
		// zIndex is handled by DndContext/DragOverlay now, removed from here
	} as React.CSSProperties

	const handleDragHandleClick = (e: React.MouseEvent) => {
		// Prevent the click from bubbling up to the card's expand/collapse handler
		e.stopPropagation()
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			// Conditionally apply select-none to prevent text selection while dragging
			className={`relative ${isDragging ? 'z-50 select-none' : ''}`}
			{...attributes} // Spread attributes here for the whole sortable item
		>
			{/* Drag handle - listeners are ONLY applied here */}
			<div
				{...listeners} // Only apply listeners to the handle
				onClick={handleDragHandleClick} // Stop click propagation
				className="absolute right-3 top-3 z-30 cursor-grab active:cursor-grabbing p-2 rounded 
                        bg-gray-700 hover:bg-gray-600 text-gray-400 hover:text-white-0
                        transition-colors duration-200 border border-transparent hover:border-gray-500
                        flex items-center justify-center"
				title="Drag to reorder"
			>
				<Icon icon="mdi:drag" width="20" height="20" />
			</div>

			{/* Apply visual styles during drag (ring/shadow) to the card wrapper */}
			<div
				className={`${
					isDragging ? 'ring-2 ring-[#ea5933] shadow-xl rounded-xl' : ''
				}`}
			>
				<PlanningItemCard item={item} />
			</div>
		</div>
	)
}

export default SortablePlanningItemCard
