import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import DocumentsList from './DocumentsList'
import OptionsList from './OptionsList'
import { usePlannerContext } from '../context/PlannerContext'
import { IPlanningItem } from '@interfaces/planner'
import { useCanRemovePlanningItem } from '../context/PlannerPermissionsContext'
import AddPlanningOptionModal from './AddPlanningOptionModal'

interface PlanningItemCardProps {
	item: IPlanningItem
}

const PlanningItemCard: React.FC<PlanningItemCardProps> = ({ item }) => {
	const { removePlanningItem, toggleItemExpanded, state } = usePlannerContext()
	const canRemovePlanningItem = useCanRemovePlanningItem()
	const [isOptionModalOpen, setIsOptionModalOpen] = useState(false)

	const planningItemId = item._id || ''
	const isExpanded = state.expandedItemIds.has(planningItemId)

	const handleDelete = () => {
		console.log('Deleting item with ID:', item._id)
		if (!item?._id) {
			console.error('Cannot delete item without ID')
			return
		}
		removePlanningItem(item._id)
	}

	const handleToggleExpand = () => {
		if (planningItemId) {
			toggleItemExpanded(planningItemId)
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
				id={`planning-item-${planningItemId}`}
				className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700 mb-4 transition-all duration-200"
			>
				{/* Header - Always visible */}
				<div
					className="p-4 cursor-pointer hover:bg-gray-750 flex items-center justify-between pr-10"
					onClick={handleToggleExpand}
				>
					<div className="flex items-center flex-grow">
						<div className="flex-grow">
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
							{/* Show small preview of description when collapsed */}
							{!isExpanded && item.description && (
								<p className="text-gray-400 text-sm mt-1 truncate">
									{item.description}
								</p>
							)}
						</div>
						<div className="flex items-center ml-4">
							<span className="text-sm text-gray-500 mr-3">
								{isExpanded ? 'Click to collapse' : 'Click to expand'}
							</span>
							<Icon
								icon={isExpanded ? 'mdi:chevron-up' : 'mdi:chevron-down'}
								className="h-5 w-5 text-gray-400"
							/>
						</div>
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
								Created by {item.createdBy} on {item.date}
							</span>
							{canRemovePlanningItem && (
								<button
									onClick={handleDelete}
									className="p-1 rounded-full hover:bg-red-900/30 text-red-400 transition-colors"
									title="Remove planning item"
								>
									<Icon icon="mdi:trash-can-outline" className="h-5 w-5" />
								</button>
							)}
						</div>

						{/* Document upload area */}
						<DocumentsList
							documents={item.documents || []}
							itemId={planningItemId}
						/>

						{/* Options */}
						<OptionsList
							options={item.options || []}
							onAddOptionClick={() => setIsOptionModalOpen(true)}
						/>
					</div>
				)}
			</div>

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
