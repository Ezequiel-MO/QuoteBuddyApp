import React, { useState, useCallback } from 'react'
import { usePlannerContext } from '../context/PlannerContext'
import EmptyState from './EmptyState'
import SortablePlanningItemCard from './SortablePlanningItemCard'
import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
	DragStartEvent,
	DragOverlay
} from '@dnd-kit/core'
import {
	SortableContext,
	arrayMove,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import PlanningItemCard from './PlanningItemCard'

const PlannerContent: React.FC = () => {
	const { state, dispatch } = usePlannerContext()
	const { filteredItems } = state

	// Local state to track sorted items
	const [items, setItems] = useState(filteredItems)
	const [activeId, setActiveId] = useState<string | null>(null)

	// Update local items when filteredItems change
	React.useEffect(() => {
		setItems(filteredItems)
	}, [filteredItems])

	// Set up sensors for mouse/touch and keyboard with lower activation constraints
	const sensors = useSensors(
		useSensor(PointerSensor, {
			// Lower activation threshold for easier dragging
			activationConstraint: {
				distance: 5, // Reduced from 8
				tolerance: 5
			}
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates
		})
	)

	// Track active item during drag
	const handleDragStart = useCallback((event: DragStartEvent) => {
		setActiveId(event.active.id as string)
		// Add a body class to prevent scrolling when dragging
		document.body.classList.add('dragging')
	}, [])

	// Handle drag end and reorder items
	const handleDragEnd = useCallback(
		(event: DragEndEvent) => {
			const { active, over } = event
			setActiveId(null)
			document.body.classList.remove('dragging')

			if (over && active.id !== over.id) {
				setItems((currentItems) => {
					const oldIndex = currentItems.findIndex(
						(item) => item._id === active.id
					)
					const newIndex = currentItems.findIndex(
						(item) => item._id === over.id
					)

					// Only proceed if we found both indices
					if (oldIndex !== -1 && newIndex !== -1) {
						// Create new array with reordered items
						const newItems = arrayMove(currentItems, oldIndex, newIndex)

						// Update the filtered items in the context
						dispatch({ type: 'SET_FILTERED_ITEMS', payload: newItems })

						// Also update display items to maintain the order when filters change
						const allItems = [...state.displayItems]
						const allItemsOldIndex = allItems.findIndex(
							(item) => item._id === active.id
						)
						const allItemsNewIndex = allItems.findIndex(
							(item) => item._id === over.id
						)

						if (allItemsOldIndex !== -1 && allItemsNewIndex !== -1) {
							const reorderedAllItems = arrayMove(
								allItems,
								allItemsOldIndex,
								allItemsNewIndex
							)
							dispatch({
								type: 'SET_DISPLAY_ITEMS',
								payload: reorderedAllItems
							})
						}

						return newItems
					}
					return currentItems
				})
			}
		},
		[dispatch, state.displayItems]
	)

	// Handle drag cancel
	const handleDragCancel = useCallback(() => {
		setActiveId(null)
		document.body.classList.remove('dragging')
	}, [])

	// Find the active item
	const activeItem = activeId
		? items.find((item) => item._id === activeId)
		: null

	// Generate sortable item IDs ensuring they are strings and valid
	const itemIds = items
		.map((item) => item._id || `temp-${item.title}`)
		.filter(Boolean)

	return (
		<div className="mt-6">
			{filteredItems.length > 0 ? (
				<>
					<div className="mb-4 pb-2 border-b border-gray-700">
						<h2 className="text-lg text-gray-300">
							{filteredItems.length} Planning{' '}
							{filteredItems.length === 1 ? 'Item' : 'Items'}
						</h2>
						<p className="text-sm text-gray-500 mt-1">
							Click on an item to expand and view details • Drag items to
							reorder
						</p>
					</div>

					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragStart={handleDragStart}
						onDragEnd={handleDragEnd}
						onDragCancel={handleDragCancel}
						modifiers={[restrictToVerticalAxis]}
					>
						<SortableContext
							items={itemIds}
							strategy={verticalListSortingStrategy}
						>
							<div className="space-y-4">
								{items.map((item) => (
									<SortablePlanningItemCard key={item._id} item={item} />
								))}
							</div>
						</SortableContext>

						{/* Drag overlay provides visual feedback during dragging */}
						<DragOverlay adjustScale={true}>
							{activeItem ? (
								<div className="opacity-80 w-full pointer-events-none">
									<PlanningItemCard item={activeItem} />
								</div>
							) : null}
						</DragOverlay>
					</DndContext>
				</>
			) : (
				<EmptyState />
			)}
		</div>
	)
}

export default PlannerContent
