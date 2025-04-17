import React from 'react'
import { Icon } from '@iconify/react'
import CommentsList from './CommentsList'
import { useCurrentPlanner } from '@hooks/redux/useCurrentPlanner'
import { IPlanningOption } from '@interfaces/planner'
import { useCanRemoveOption } from '../context/PlannerPermissionsContext'

interface OptionCardProps {
	option: IPlanningOption
}

const OptionCard: React.FC<OptionCardProps> = ({ option }) => {
	const { deletePlanningOption } = useCurrentPlanner()
	const canRemoveOption = useCanRemoveOption()

	// Extract values with fallbacks to avoid undefined errors
	const name = option?.name || 'Unnamed Option'
	const vendorType = option?.vendorType?.toString() || 'Option'
	const planningNotes = option?.planningNotes?.toString() || ''
	const optionId = option?._id || ''
	const planningItemId = option?.planningItemId?.toString() || ''
	const comments = option?.comments || []

	// Only allow deletion if we have both IDs
	const handleDelete = () => {
		if (optionId && planningItemId && deletePlanningOption) {
			deletePlanningOption(planningItemId, optionId)
		}
	}

	return (
		<div className="border border-gray-700 rounded-lg p-5 bg-gray-750">
			<div className="flex justify-between items-start mb-3">
				<div>
					<h3 className="text-lg font-medium text-white-0">{name}</h3>
					<div className="text-sm text-gray-400 mt-1">Type: {vendorType}</div>
				</div>
				{canRemoveOption && (
					<button
						className="p-1 rounded-full hover:bg-red-900/30 text-red-400"
						title="Remove option"
						onClick={handleDelete}
					>
						<Icon icon="mdi:trash-can-outline" className="h-5 w-5" />
					</button>
				)}
			</div>
			<p className="text-gray-300 mb-5 whitespace-pre-line">{planningNotes}</p>

			{/* Comments section */}
			<CommentsList
				comments={comments}
				planningItemId={planningItemId}
				planningOptionId={optionId}
			/>
		</div>
	)
}

export default OptionCard
