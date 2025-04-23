import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import DocumentsList from './DocumentsList'
import OptionsList from './OptionsList'
import { usePlannerContext } from '../context/PlannerContext'
import { IPlanningItem } from '@interfaces/planner'
import { useCanRemovePlanningItem } from '../context/PlannerPermissionsContext'
import AddPlanningOptionModal from './AddPlanningOptionModal'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { deletePlanningItem } from '@services/plannerService'
import { toast } from 'react-toastify'
import { useLoading } from '../context/LoadingContext'
import { format } from 'date-fns'
import { useAccManagerLookup } from '@hooks/useAccManagerLookup'

interface PlanningItemCardProps {
	item: IPlanningItem
}

const PlanningItemCard: React.FC<PlanningItemCardProps> = ({ item }) => {
	const { removePlanningItem, toggleItemExpanded, state } = usePlannerContext()
	const canRemovePlanningItem = useCanRemovePlanningItem()
	const [isOptionModalOpen, setIsOptionModalOpen] = useState(false)
	const { isLoading, startLoading, stopLoading } = useLoading()
	const { getAccManagerName } = useAccManagerLookup()

	// Log the createdBy field for debugging
	console.log(
		`PlanningItemCard (${item.title}): item.createdBy =`,
		item.createdBy
	)

	const planningItemId = item._id || ''
	const isDeleting = isLoading('deleteItem')

	// dnd-kit sortable setup
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({
		id: planningItemId
	})

	// Style for drag-and-drop transitions
	const style = {
		transform: CSS.Transform.toString(transform),
		opacity: isDragging ? 0.8 : 1,
		transition: isDragging
			? 'transform 200ms cubic-bezier(0.25, 1, 0.5, 1), opacity 150ms ease'
			: transition || 'transform 200ms ease, opacity 150ms ease'
	}

	const isExpanded = state.expandedItemIds.has(planningItemId)

	const handleDelete = async () => {
		console.log('Deleting item with ID:', item._id)
		if (!item?._id) {
			console.error('Cannot delete item without ID')
			return
		}

		try {
			startLoading('deleteItem')

			// Delete from database
			await deletePlanningItem(item._id)

			// After successful deletion, update Redux state
			removePlanningItem(item._id)

			toast.success('Planning item deleted successfully')
		} catch (error) {
			console.error('Error deleting planning item:', error)
			toast.error('Failed to delete planning item from database')
		} finally {
			stopLoading('deleteItem')
		}
	}

	// Get status color based on status
	const getStatusColor = () => {
		switch (item.status) {
			case 'Confirmed':
				return 'bg-green-600'
			case 'Discussing':
				return 'bg-yellow-600'
			case 'Booked':
				return 'bg-blue-600'
			case 'Proposed':
			default:
				return 'bg-gray-600'
		}
	}

	return (
		<>
			<div
				ref={setNodeRef}
				style={style}
				id={`planning-item-${planningItemId}`}
				className={`bg-gray-800 rounded-xl shadow-md overflow-hidden border mb-4 transition-all duration-200 ${
					isDragging ? 'border-cyan-100' : 'border-[#ea5933]'
				}`}
			>
				{/* Header - Always visible */}
				<div className="p-4 hover:bg-gray-750 flex items-center justify-between pr-10">
					{/* Left Side: Drag handle and content */}
					<div
						{...listeners}
						{...attributes}
						className="flex-grow flex items-center cursor-grab"
					>
						{/* Drag handle */}
						<div
							className="flex-none p-2 cursor-grab mr-2 text-gray-500 hover:text-gray-300"
							title="Drag to reorder"
						>
							<Icon icon="mdi:drag" className="h-5 w-5" />
						</div>
						{/* Title, status, and day */}
						<div className="flex-grow select-none">
							<div className="flex items-center">
								<h2 className="text-xl font-semibold text-white-0">
									{item.title}
								</h2>
								<span
									className={`ml-3 px-2 py-1 text-xs rounded-full text-white ${getStatusColor()}`}
								>
									{item.status}
								</span>
								<span className="ml-3 text-sm text-gray-400">
									Day {item.dayIndex}
								</span>
							</div>
							{!isExpanded && item.description && (
								<p className="text-gray-400 text-sm mt-1 truncate">
									{item.description}
								</p>
							)}
						</div>
					</div>
					{/* Right Side: Expand/Collapse */}
					<button
						type="button"
						onClick={() => toggleItemExpanded(planningItemId)}
						className="flex-none ml-4 flex items-center cursor-pointer px-3 py-1 rounded hover:bg-gray-700 z-10 select-none"
						title={isExpanded ? 'Collapse item' : 'Expand item'}
					>
						<span className="text-sm text-gray-500 mr-2 whitespace-nowrap">
							{isExpanded ? 'Click to collapse' : 'Click to expand'}
						</span>
						<Icon
							icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}
							className="h-5 w-5 text-gray-400"
						/>
					</button>
				</div>
			</div>

			{/* Body - Only visible when expanded */}
			{isExpanded && (
				<div className="p-4 pt-0 border-t border-gray-700">
					{/* Full description */}
					{item.description && (
						<p className="text-gray-300 my-4">{item.description}</p>
					)}

					{/* Meta information */}
					<div className="flex justify-between items-center mb-4 text-sm text-gray-400">
						<span>
							Created by{' '}
							{item.createdBy && typeof item.createdBy === 'object'
								? `${item.createdBy.firstName} ${item.createdBy.familyName}`
								: getAccManagerName(item.createdBy?.toString())}{' '}
							on{' '}
							{item.date
								? format(new Date(item.date), 'MMM d, yyyy h:mm a')
								: 'Unknown date'}
						</span>
						{canRemovePlanningItem && (
							<button
								onClick={handleDelete}
								disabled={isDeleting}
								className={`p-1 rounded-full hover:bg-red-900/30 text-red-400 transition-colors ${
									isDeleting ? 'opacity-50 cursor-not-allowed' : ''
								}`}
								title="Remove planning item"
							>
								<Icon
									icon={isDeleting ? 'mdi:loading' : 'mdi:trash-can-outline'}
									className={`h-5 w-5 ${isDeleting ? 'animate-spin' : ''}`}
								/>
							</button>
						)}
					</div>

					{/* Document upload area */}
					<DocumentsList
						documents={item.documents || []}
						planningItemId={planningItemId}
					/>

					{/* Options */}
					<OptionsList
						options={item.options || []}
						planningItemId={planningItemId}
						onAddOptionClick={() => setIsOptionModalOpen(true)}
					/>
				</div>
			)}

			{/* Option Modal */}
			{planningItemId && (
				<AddPlanningOptionModal
					isOpen={isOptionModalOpen}
					onClose={() => setIsOptionModalOpen(false)}
					planningItemId={planningItemId}
				/>
			)}
		</>
	)
}

export default PlanningItemCard
