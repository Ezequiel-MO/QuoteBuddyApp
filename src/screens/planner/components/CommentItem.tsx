import React, { useState } from 'react'
import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import { IPlanningComment } from '@interfaces/planner'
import {
	useCanRemoveComment,
	usePlannerPermissions
} from '../context/PlannerPermissionsContext'
import { useCurrentPlanner } from '@hooks/redux/useCurrentPlanner'
import { deleteComment } from '@services/plannerService'

interface CommentItemProps {
	comment: IPlanningComment
	onDelete?: (commentId: string) => void
}

// Format date as "DD/MM/YYYY HH:MM"
const formatDate = (dateString: string): string => {
	try {
		const date = new Date(dateString)
		if (isNaN(date.getTime())) {
			return dateString // Return original string if invalid date
		}

		// Format differently based on how old the comment is
		const now = new Date()
		const diffMs = now.getTime() - date.getTime()
		const diffMins = Math.floor(diffMs / 60000)
		const diffHours = Math.floor(diffMins / 60)
		const diffDays = Math.floor(diffHours / 24)

		// Just now (less than 1 minute ago)
		if (diffMins < 1) return 'Just now'

		// Minutes ago (less than 1 hour ago)
		if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`

		// Hours ago (less than 1 day ago)
		if (diffHours < 24)
			return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`

		// Days ago (less than 7 days ago)
		if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`

		// Otherwise, display full date
		const day = date.getDate().toString().padStart(2, '0')
		const month = (date.getMonth() + 1).toString().padStart(2, '0')
		const year = date.getFullYear()
		const hours = date.getHours().toString().padStart(2, '0')
		const minutes = date.getMinutes().toString().padStart(2, '0')

		return `${day}/${month}/${year} ${hours}:${minutes}`
	} catch (error) {
		console.error('Error formatting date:', error)
		return dateString // Fallback to original string
	}
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onDelete }) => {
	const [isDeleting, setIsDeleting] = useState(false)
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
	const { deletePlanningComment } = useCurrentPlanner()
	// Permission hooks
	const canRemoveComment = useCanRemoveComment()
	const { userRole } = usePlannerPermissions()

	// Extract values with fallbacks for undefined properties
	const authorRole = comment?.authorRole || 'Client'
	const authorName = comment?.authorName || 'Unknown'
	const dateString = comment?.date || ''
	const formattedDate = formatDate(dateString)
	const content = comment?.content || ''
	const isClientComment = authorRole === 'Client'

	// Determine if the current user can delete this specific comment
	// AMs can delete any comment, clients can only delete their own comments
	const canDeleteThisComment =
		canRemoveComment || (userRole === 'Client' && authorRole === 'Client')

	const handleDelete = async () => {
		if (isDeleting) return

		setIsDeleting(true)

		try {
			// Server-first approach: Delete from the server first
			await deleteComment(comment._id)

			// Then update the local UI state if callback provided
			if (onDelete) {
				onDelete(comment._id)
			}

			// Then update Redux state
			deletePlanningComment(
				comment.planningItemId,
				comment.planningOptionId,
				comment._id
			)

			toast.success('Comment deleted successfully')
		} catch (error) {
			console.error('Failed to delete comment:', error)
			toast.error('Failed to delete comment. Please try again.')
		} finally {
			setIsDeleting(false)
			setShowDeleteConfirm(false)
		}
	}

	return (
		<div
			className={`rounded-lg transition-colors ${
				isClientComment
					? 'bg-[#ea5933]/10 border border-[#ea5933]/30'
					: 'bg-cyan-900/10 border border-cyan-900/30'
			}`}
		>
			<div className="p-3">
				<div className="flex justify-between items-start mb-2">
					<div className="flex items-center">
						<div
							className={`w-8 h-8 rounded-full mr-2 flex items-center justify-center ${
								isClientComment ? 'bg-[#ea5933]/20' : 'bg-cyan-900/20'
							}`}
						>
							<Icon
								icon={isClientComment ? 'mdi:account' : 'mdi:account-tie'}
								className={`h-5 w-5 ${
									isClientComment ? 'text-[#ea5933]' : 'text-cyan-400'
								}`}
							/>
						</div>
						<div>
							<span
								className={`text-sm font-medium ${
									isClientComment ? 'text-[#ea5933]' : 'text-cyan-400'
								}`}
							>
								{authorName}
							</span>
							<div className="flex items-center mt-0.5">
								<span
									className={`text-xs px-1.5 py-0.5 rounded-full ${
										isClientComment
											? 'bg-[#ea5933]/20 text-[#ea5933]'
											: 'bg-cyan-900/20 text-cyan-400'
									}`}
								>
									{authorRole}
								</span>
								<span className="text-xs text-gray-400 ml-2">
									{formattedDate}
								</span>
							</div>
						</div>
					</div>

					{/* Delete button and confirmation */}
					{canDeleteThisComment && (
						<div className="flex items-center">
							{showDeleteConfirm ? (
								<div className="flex items-center gap-1">
									<button
										className="p-1 rounded text-xs text-gray-400 hover:text-gray-300"
										onClick={() => setShowDeleteConfirm(false)}
										disabled={isDeleting}
									>
										Cancel
									</button>
									<button
										className={`p-1 rounded text-xs bg-red-500/20 text-red-400 hover:bg-red-500/30 ${
											isDeleting ? 'opacity-50 cursor-not-allowed' : ''
										}`}
										onClick={handleDelete}
										disabled={isDeleting}
									>
										{isDeleting ? (
											<span className="flex items-center">
												<Icon
													icon="mdi:loading"
													className="h-3 w-3 animate-spin mr-1"
												/>
												Deleting...
											</span>
										) : (
											'Confirm'
										)}
									</button>
								</div>
							) : (
								<button
									className="p-1 rounded-full hover:bg-red-900/30 text-red-400"
									title="Remove comment"
									onClick={() => setShowDeleteConfirm(true)}
								>
									<Icon icon="mdi:trash-can-outline" className="h-4 w-4" />
								</button>
							)}
						</div>
					)}
				</div>

				{/* Comment content with better whitespace handling */}
				<div className="mt-1 pl-10">
					<p className="text-sm text-gray-300 whitespace-pre-line break-words">
						{content}
					</p>
				</div>
			</div>
		</div>
	)
}

export default CommentItem
