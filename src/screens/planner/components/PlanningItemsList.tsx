import React from 'react'
import PlanningItemCard from './PlanningItemCard'
import { DisplayPlanningItem } from '../types'

interface PlanningItemsListProps {
	filteredItems: DisplayPlanningItem[]
}

const PlanningItemsList: React.FC<PlanningItemsListProps> = ({
	filteredItems
}) => {
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
