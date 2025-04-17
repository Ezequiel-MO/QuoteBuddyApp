import React from 'react'
import { Icon } from '@iconify/react'
import { IPlanningComment } from '@interfaces/planner'

interface CommentItemProps {
	comment: IPlanningComment
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
	// Extract values with fallbacks for undefined properties
	const authorRole = comment?.authorRole || 'Client'
	const authorName = comment?.authorName || 'Unknown'
	const date = comment?.date || ''
	const content = comment?.content || ''

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
					<button
						className="p-1 rounded-full hover:bg-red-900/30 text-red-400"
						title="Remove comment"
					>
						<Icon icon="mdi:trash-can-outline" className="h-4 w-4" />
					</button>
				</div>
			</div>
			<p className="text-sm text-gray-300 mt-1 whitespace-pre-line">
				{content}
			</p>
		</div>
	)
}

export default CommentItem
