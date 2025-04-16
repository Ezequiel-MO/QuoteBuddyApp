import React from 'react'
import { Icon } from '@iconify/react'
import CommentsList from './CommentsList'
import { Option } from '../types'

interface OptionCardProps {
	option: Option
}

const OptionCard: React.FC<OptionCardProps> = ({ option }) => {
	return (
		<div className="border border-gray-700 rounded-lg p-5 bg-gray-750">
			<div className="flex justify-between items-start mb-3">
				<h3 className="text-lg font-medium text-white-0">{option.title}</h3>
				<button
					className="p-1 rounded-full hover:bg-red-900/30 text-red-400"
					title="Remove option"
				>
					<Icon icon="mdi:trash-can-outline" className="h-5 w-5" />
				</button>
			</div>
			<p className="text-gray-300 mb-5 whitespace-pre-line">
				{option.description}
			</p>

			{/* Comments section */}
			<CommentsList comments={option.comments} />
		</div>
	)
}

export default OptionCard
