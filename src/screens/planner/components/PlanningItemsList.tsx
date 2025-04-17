import React, { useEffect } from 'react'
import PlanningItemCard from './PlanningItemCard'
import { usePlannerContext } from '../context/PlannerContext'
import { IPlanningItem } from '@interfaces/planner'

interface PlanningItemsListProps {
	filteredItems: IPlanningItem[]
}

const PlanningItemsList: React.FC<PlanningItemsListProps> = ({
	filteredItems
}) => {
	const { dispatch } = usePlannerContext()

	useEffect(() => {
		console.log(
			'PlanningItemsList: Received filteredItems',
			filteredItems.length
		)
	}, [filteredItems])

	// If there are no items, show an empty state view
	if (filteredItems.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-20 px-4 bg-gray-800 rounded-lg shadow-lg text-center">
				<svg
					className="w-24 h-24 text-[#ea5933] mb-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={1.5}
						d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
					/>
				</svg>
				<h2 className="text-2xl font-bold text-white-0 mb-2">
					No Planning Items Yet
				</h2>
				<p className="text-gray-300 mb-8 max-w-lg">
					Start planning your project by adding accommodation, meals,
					transportation, or activities. Each item can have multiple options to
					discuss with your client.
				</p>
				<button
					onClick={() => dispatch({ type: 'TOGGLE_MODAL', payload: true })}
					className="px-6 py-3 bg-[#ea5933] text-white-0 font-medium rounded-md opacity-100 hover:opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
				>
					Add Your First Planning Item
				</button>
			</div>
		)
	}

	return (
		<div className="space-y-8">
			{filteredItems.map((item) => (
				<PlanningItemCard
					key={item._id || `item-${Math.random()}`}
					item={item}
				/>
			))}
		</div>
	)
}

export default PlanningItemsList
