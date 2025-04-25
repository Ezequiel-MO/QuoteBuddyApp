import React, { useState, useEffect, useMemo } from 'react'
import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import CommentItem from './CommentItem'
import { IPlanningComment } from '@interfaces/planner'
import {
	useCanAddComment,
	usePlannerPermissions
} from '../context/PlannerPermissionsContext'
import { useCurrentPlanner } from '@hooks/redux/useCurrentPlanner'
import { useLoginRoute } from '@hooks/useLoginRoute'
import { createComment } from '@services/plannerService'

interface CommentsListProps {
	comments?: IPlanningComment[]
	planningItemId: string
	planningOptionId: string // Required, never empty
}

const MAX_COMMENT_LENGTH = 1000
const MIN_COMMENT_LENGTH = 2

function CommentsList({
	comments = [],
	planningItemId,
	planningOptionId
}: CommentsListProps) {
	const [commentText, setCommentText] = useState('')
	const [localComments, setLocalComments] = useState<IPlanningComment[]>([])
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [commentError, setCommentError] = useState<string | null>(null)
	const { addPlanningComment } = useCurrentPlanner()
	const { authorInfo } = useLoginRoute()
	const { userRole } = usePlannerPermissions()
	const isClient = userRole === 'Client'

	// Function to sort comments by date, newest first
	const sortCommentsByDate = (commentsToSort: IPlanningComment[]) => {
		return [...commentsToSort].sort((a, b) => {
			const dateA = new Date(a.date).getTime()
			const dateB = new Date(b.date).getTime()
			return dateB - dateA
		})
	}

	// Update local comments when props change
	useEffect(() => {
		if (Array.isArray(comments)) {
			// Sort comments by date, newest first
			const sortedComments = sortCommentsByDate(comments)
			setLocalComments(sortedComments)
		} else {
			setLocalComments([])
		}
	}, [comments])

	// RBAC permission check
	const canAddComment = useCanAddComment()

	const handleSendComment = async () => {
		if (!commentText.trim() || isSubmitting || !planningOptionId) return

		// Validate comment length
		if (commentText.length < MIN_COMMENT_LENGTH) {
			setCommentError(
				`Comment must be at least ${MIN_COMMENT_LENGTH} characters`
			)
			return
		}

		if (commentText.length > MAX_COMMENT_LENGTH) {
			setCommentError(
				`Comment is too long (max ${MAX_COMMENT_LENGTH} characters)`
			)
			return
		}

		setIsSubmitting(true)
		setCommentError(null)

		try {
			const now = new Date()
			const formattedDate = now.toISOString()

			// Prepare comment data
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

			// Update Redux with the real MongoDB _id
			addPlanningComment(planningItemId, planningOptionId, savedComment)

			// Update local state for immediate UI feedback
			setLocalComments((prevComments) => {
				const updatedComments = [savedComment, ...prevComments]
				return sortCommentsByDate(updatedComments)
			})

			// Clear the input field
			setCommentText('')
			toast.success('Comment added successfully')
		} catch (error) {
			console.error('Failed to create comment:', error)
			toast.error('Failed to send comment. Please try again.')
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleDeleteComment = (commentId: string) => {
		// Update local state - CommentItem already handles Redux updates
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

	// Calculate character count and percentage for progress bar
	const characterCount = commentText.length
	const characterPercentage = Math.min(
		(characterCount / MAX_COMMENT_LENGTH) * 100,
		100
	)
	const isNearLimit = characterCount > MAX_COMMENT_LENGTH * 0.8

	// Determine progress bar color based on character count
	const progressBarColor = useMemo(() => {
		if (characterCount > MAX_COMMENT_LENGTH) return 'bg-red-500'
		if (characterCount > MAX_COMMENT_LENGTH * 0.8) return 'bg-yellow-500'
		return isClient ? 'bg-[#ea5933]' : 'bg-cyan-500'
	}, [characterCount, isClient])

	// Determine appropriate color scheme based on user role
	const getColorScheme = () => {
		return isClient ? 'focus:ring-[#ea5933]' : 'focus:ring-cyan-500'
	}

	const getSendButtonClasses = () => {
		const baseClasses =
			'px-4 py-1.5 rounded-md text-white flex items-center transition-colors'
		const disabledClasses = 'opacity-70 cursor-not-allowed'
		const enabledClasses = 'hover:bg-opacity-90'
		const colorClasses = isClient ? 'bg-[#ea5933]' : 'bg-cyan-600'

		return `${baseClasses} ${
			isSubmitting ? disabledClasses : enabledClasses
		} ${colorClasses}`
	}

	return (
		<div className="mt-6 bg-gray-750 p-4 rounded-lg border border-gray-700 transition-all">
			<div className="flex items-center justify-between mb-4">
				<h3 className="text-sm font-medium text-gray-300 flex items-center">
					<Icon icon="mdi:message-text" className="mr-2" />
					Comments
					{localComments.length > 0 && (
						<span className="ml-2 px-2 py-0.5 bg-gray-700 rounded-full text-xs">
							{localComments.length}
						</span>
					)}
				</h3>
			</div>

			{/* Comments input - show at top for better UX if user has permission */}
			{canAddComment && (
				<div className="mb-4">
					<div className="relative">
						<textarea
							rows={3}
							placeholder={`Add a comment as ${userRole}...`}
							className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 bg-gray-700 text-white-0 placeholder-gray-400 border-gray-600 resize-vertical ${getColorScheme()}`}
							value={commentText}
							onChange={(e) => {
								setCommentText(e.target.value)
								if (commentError) setCommentError(null)
							}}
							onKeyDown={handleKeyDown}
							disabled={isSubmitting}
						/>

						{/* Progress bar */}
						<div className="w-full h-[3px] bg-gray-700 mt-1 rounded-sm overflow-hidden">
							<div
								className={`h-full ${progressBarColor} transition-all duration-200`}
								style={{ width: `${characterPercentage}%` }}
							/>
						</div>

						{commentError && (
							<p className="text-red-400 text-xs mt-1">{commentError}</p>
						)}

						<div className="flex items-center justify-between mt-2">
							<div className="text-xs text-gray-500">
								<span
									className={`font-medium ${
										characterCount > MAX_COMMENT_LENGTH
											? 'text-red-400'
											: isNearLimit
											? 'text-yellow-400'
											: ''
									}`}
								>
									{characterCount}
								</span>
								<span>/{MAX_COMMENT_LENGTH} characters</span>
							</div>
							<button
								className={getSendButtonClasses()}
								onClick={handleSendComment}
								disabled={
									isSubmitting ||
									characterCount < MIN_COMMENT_LENGTH ||
									characterCount > MAX_COMMENT_LENGTH
								}
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
				</div>
			)}

			{/* Comments list with scrollable area */}
			<div className="max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
				{localComments.length > 0 ? (
					<div className="space-y-3">
						{localComments.map((comment: IPlanningComment) => (
							<CommentItem
								key={comment._id || `comment-${Math.random()}`}
								comment={comment}
								onDelete={handleDeleteComment}
							/>
						))}
					</div>
				) : (
					<div className="text-center py-6 bg-gray-800/50 rounded-lg border border-gray-700 border-dashed">
						<Icon
							icon="mdi:comment-text-outline"
							className="h-10 w-10 mx-auto text-gray-500 mb-2"
						/>
						<p className="text-gray-400 text-sm">No comments yet</p>
						{canAddComment && (
							<p className="text-gray-500 text-xs mt-1">
								Be the first to add a comment
							</p>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default CommentsList
