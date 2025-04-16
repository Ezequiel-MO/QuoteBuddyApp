import React from 'react'
import { Icon } from '@iconify/react'
import CommentItem from './CommentItem'
import { Comment } from '../types'

interface CommentsListProps {
	comments?: Comment[]
}

const CommentsList: React.FC<CommentsListProps> = ({ comments = [] }) => {
	return (
		<div className="mt-4">
			<h4 className="text-sm font-medium text-gray-300 mb-2">
				Comments ({comments.length})
			</h4>
			<div className="space-y-3">
				{comments.map((comment) => (
					<CommentItem key={comment.id} comment={comment} />
				))}
			</div>
			{/* Add comment input */}
			<div className="mt-3">
				<textarea
					rows={3}
					placeholder="Add a comment..."
					className="w-full px-3 py-2 border border-gray-600 rounded-t-md focus:outline-none focus:ring-1 focus:ring-[#ea5933] bg-gray-700 text-white-0"
				/>
				<div className="flex justify-end bg-gray-750 border border-t-0 border-gray-600 rounded-b-md px-3 py-2">
					<button className="px-4 py-1.5 bg-[#ea5933] text-white-0 rounded-md hover:bg-opacity-90 flex items-center">
						<Icon icon="mdi:send" className="mr-1" />
						Send
					</button>
				</div>
			</div>
		</div>
	)
}

export default CommentsList
