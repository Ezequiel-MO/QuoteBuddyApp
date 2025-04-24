import React, { useState, useEffect } from 'react'
import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import CommentItem from './CommentItem'
import { IPlanningComment } from '@interfaces/planner'
import { useCanAddComment } from '../context/PlannerPermissionsContext'
import { useCurrentPlanner } from '@hooks/redux/useCurrentPlanner'
import { useLoginRoute } from '@hooks/useLoginRoute'
import { createComment } from '@services/plannerService'

interface CommentsListProps {
	comments?: IPlanningComment[]
	planningItemId: string
	planningOptionId: string // Required, never empty
}

// Using function declaration instead of arrow function with React.FC
function CommentsList({
	comments = [],
	planningItemId,
	planningOptionId
}: CommentsListProps) {
	const [commentText, setCommentText] = useState('')
	const [localComments, setLocalComments] = useState<IPlanningComment[]>([])
	const [isSubmitting, setIsSubmitting] = useState(false)
	const { addPlanningComment } = useCurrentPlanner()
	const { authorInfo } = useLoginRoute()

	// Add debugging on initial render
	useEffect(() => {
		console.log(`CommentsList for option ${planningOptionId} rendering with:`, {
			commentsFromProps: comments,
			commentsLength: comments?.length || 0,
			planningItemId,
			planningOptionId,
			// Show up to 3 comments for debugging
			commentSamples: comments.slice(0, 3).map((c) => ({
				id: c._id,
				content: c.content,
				planningOptionId: c.planningOptionId,
				planningItemId: c.planningItemId
			}))
		})
	}, [planningOptionId, planningItemId, comments])

	// Ensure comments is always an array and update local state when props change
	useEffect(() => {
		console.log(`CommentsList - comments prop changed:`, {
			newComments: comments,
			length: comments?.length || 0
		})

		setLocalComments(Array.isArray(comments) ? comments : [])
	}, [comments])

	// RBAC permission check
	const canAddComment = useCanAddComment()

	// Determine focus ring color based on the user's role
	const focusRingColor =
		authorInfo.authorRole === 'Client' ? '[#ea5933]' : 'cyan-500'

	const handleSendComment = async () => {
		if (!commentText.trim() || isSubmitting || !planningOptionId) return

		setIsSubmitting(true)
		console.log('Sending comment:', {
			planningItemId,
			planningOptionId,
			content: commentText
		})

		try {
			const now = new Date()

			// Format date as ISO string for backend
			const formattedDate = now.toISOString()

			// Prepare comment data - always include planningOptionId
			const commentData: Partial<IPlanningComment> = {
				planningItemId,
				planningOptionId,
				authorId: authorInfo.authorId,
				authorName: authorInfo.authorName,
				authorRole: authorInfo.authorRole,
				content: commentText,
				date: formattedDate
			}

			// Server-first approach: Save to backend first
			const savedComment = await createComment(planningItemId, commentData)
			console.log('Comment saved successfully:', savedComment)

			// Then update Redux with the real MongoDB _id
			console.log('About to update Redux with comment:', {
				planningItemId,
				planningOptionId,
				commentData: savedComment,
				method: 'addPlanningComment'
			})
			addPlanningComment(planningItemId, planningOptionId, savedComment)
			console.log('Redux updated with comment')

			// Update local state for immediate UI feedback
			// Use a callback to ensure we're working with the latest state
			setLocalComments((prevComments) => {
				console.log('Updating local comments state:', {
					prevLength: prevComments.length,
					newComment: savedComment,
					currentLocalState: [savedComment, ...prevComments]
				})
				return [savedComment, ...prevComments]
			})

			// Clear the input field
			setCommentText('')
		} catch (error) {
			console.error('Failed to create comment:', error)
			toast.error('Failed to send comment. Please try again.')
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleDeleteComment = (commentId: string) => {
		// Update local state immediately for UI feedback
		setLocalComments((prevComments) =>
			prevComments.filter((comment) => comment._id !== commentId)
		)
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			handleSendComment()
		}
	}

	// Combine comments from props and local state to ensure we display
	// both previously existing comments and newly added ones
	const displayComments = React.useMemo(() => {
		// If no local comments have been added yet, just show comments from props
		if (localComments.length === 0 && comments.length > 0) {
			return comments
		}

		// Create a new array for display
		return localComments
	}, [comments, localComments])

	return (
		<div className="mt-4">
			<h4 className="text-sm font-medium text-gray-300 mb-2">
				Comments ({displayComments.length})
			</h4>
			<div className="space-y-3">
				{displayComments.map((comment: IPlanningComment) => (
					<CommentItem
						key={comment._id || `comment-${Math.random()}`}
						comment={comment}
						onDelete={handleDeleteComment}
					/>
				))}
			</div>
			{/* Only show comment input if user has permission */}
			{canAddComment && (
				<div className="mt-3">
					<textarea
						rows={3}
						placeholder="Add a comment..."
						className={`w-full px-3 py-2 border border-gray-600 rounded-t-md focus:outline-none focus:ring-1 focus:ring-${focusRingColor} bg-gray-700 text-white-0`}
						value={commentText}
						onChange={(e) => setCommentText(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
					<div className="flex justify-end bg-gray-750 border border-t-0 border-gray-600 rounded-b-md px-3 py-2">
						<button
							className={`px-4 py-1.5 bg-${
								authorInfo.authorRole === 'Client' ? '[#ea5933]' : 'cyan-500'
							} text-white-0 rounded-md hover:bg-opacity-90 flex items-center ${
								isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
							}`}
							onClick={handleSendComment}
							disabled={isSubmitting}
						>
							{isSubmitting ? (
								<>
									<Icon icon="mdi:loading" className="animate-spin mr-1" />
									Sending...
								</>
							) : (
								<>
									<Icon icon="mdi:send" className="mr-1" />
									Send
								</>
							)}
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default CommentsList
