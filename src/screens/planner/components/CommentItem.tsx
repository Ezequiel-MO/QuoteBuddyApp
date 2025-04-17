import React from 'react'
import { Icon } from '@iconify/react'
import { IPlanningComment } from '@interfaces/planner'
import {
	useCanRemoveComment,
	usePlannerPermissions
} from '../context/PlannerPermissionsContext'
import { useCurrentPlanner } from '@hooks/redux/useCurrentPlanner'

interface CommentItemProps {
	comment: IPlanningComment
	onDelete?: (commentId: string) => void
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onDelete }) => {
	const { deletePlanningComment } = useCurrentPlanner()
	// Permission hooks
	const canRemoveComment = useCanRemoveComment()
	const { userRole } = usePlannerPermissions()

	// Extract values with fallbacks for undefined properties
	const authorRole = comment?.authorRole || 'Client'
	const authorName = comment?.authorName || 'Unknown'
	const date = comment?.date || ''
	const content = comment?.content || ''

	// Determine if the current user can delete this specific comment
	// AMs can delete any comment, clients can only delete their own comments
	const canDeleteThisComment =
		canRemoveComment || (userRole === 'Client' && authorRole === 'Client')

	const handleDelete = () => {
		// First update the local UI state if callback provided
		if (onDelete) {
			onDelete(comment._id)
		}

		// Then dispatch the Redux action
		deletePlanningComment(
			comment.planningItemId,
			comment.planningOptionId,
			comment._id
		)
	}

	return (
		<div
			className={`p-3 rounded-lg ${
				authorRole === 'AM'
					? 'bg-cyan-900/20 border-l-4 border-cyan-500'
					: 'bg-[#ea5933]/20 border-l-4 border-[#ea5933]'
			}`}
		>
			<div className="flex justify-between mb-1">
				<span
					className={`text-sm font-medium ${
						authorRole === 'AM' ? 'text-cyan-400' : 'text-[#ea5933]'
					}`}
				>
					{authorName} ({authorRole})
				</span>
				<div className="flex items-center">
					<span className="text-xs text-gray-400 mr-2">{date}</span>
					{canDeleteThisComment && (
						<button
							className="p-1 rounded-full hover:bg-red-900/30 text-red-400"
							title="Remove comment"
							onClick={handleDelete}
						>
							<Icon icon="mdi:trash-can-outline" className="h-4 w-4" />
						</button>
					)}
				</div>
			</div>
			<p className="text-sm text-gray-300 mt-1 whitespace-pre-line">
				{content}
			</p>
		</div>
	)
}

export default CommentItem
