import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Thumbnail from '@components/molecules/Thumbnail'

interface SortableItemProps {
	id: string
	imageSrc: string
	onDelete: () => void
	isExpanded?: boolean
	onToggleExpand?: () => void
	isCaption?: boolean
}

export const SortableItem: React.FC<SortableItemProps> = ({
	id,
	imageSrc,
	onDelete,
	isExpanded,
	onToggleExpand,
	isCaption= false
}) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({ id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1
	}

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			<Thumbnail
				imageSrc={imageSrc}
				onDelete={onDelete}
				onImageUpload={() => {}}
				isExpanded={isExpanded}
				onToggleExpand={onToggleExpand}
				isCaption={isCaption}
			/>
		</div>
	)
}
