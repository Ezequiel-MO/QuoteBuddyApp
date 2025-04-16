import React from 'react'
import { Icon } from '@iconify/react'
import DocumentsList from './DocumentsList'
import { DisplayPlanningItem } from '../types'
import OptionsList from './OptionsList'
import { usePlannerContext } from '../context/PlannerContext'

interface PlanningItemCardProps {
	item: DisplayPlanningItem
}

const PlanningItemCard: React.FC<PlanningItemCardProps> = ({ item }) => {
	const { removePlanningItem } = usePlannerContext()

	const handleDelete = () => {
		console.log('Deleting item with ID:', item._id)
		if (!item._id) {
			console.error('Cannot delete item without ID')
			return
		}
		removePlanningItem(item._id)
	}

	return (
		<div
			id={`planning-item-${item._id || ''}`}
			className="bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-700"
		>
			<div className="p-6">
				<div className="flex justify-between items-start mb-4">
					<div className="flex-grow">
						<h2 className="text-xl font-semibold text-white-0">{item.title}</h2>
						<p className="text-gray-300 mt-1">{item.description}</p>
					</div>
					<div className="flex flex-col items-end">
						<div className="flex items-center mb-2">
							<span className="text-sm text-gray-400 mr-2">
								Created by {item.createdBy} on {item.date}
							</span>
							<button
								onClick={handleDelete}
								className="p-1 rounded-full hover:bg-red-900/30 text-red-400"
								title="Remove planning item"
							>
								<Icon icon="mdi:trash-can-outline" className="h-5 w-5" />
							</button>
						</div>
					</div>
				</div>

				{/* Document upload area */}
				<DocumentsList
					documents={item.documents || []}
					itemId={item._id || ''}
				/>

				{/* Options */}
				<OptionsList options={item.options || []} />
			</div>
		</div>
	)
}

export default PlanningItemCard
