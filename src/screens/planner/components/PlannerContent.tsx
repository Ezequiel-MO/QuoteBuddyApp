import React from 'react'
import PlanningItemCard from './PlanningItemCard'
import { usePlannerContext } from '../context/PlannerContext'
import EmptyState from './EmptyState'

const PlannerContent: React.FC = () => {
	const { state } = usePlannerContext()
	const { filteredItems } = state

	// For better visual structure, show item count in a header
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
							Click on an item to expand and view details
						</p>
					</div>
					<div className="space-y-0">
						{' '}
						{/* Removed space-y-8 to let cards handle their own margins */}
						{filteredItems.map((item) => (
							<PlanningItemCard key={item._id} item={item} />
						))}
					</div>
				</>
			) : (
				<EmptyState />
			)}
		</div>
	)
}

export default PlannerContent
