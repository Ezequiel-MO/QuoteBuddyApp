import React from 'react'
import { Icon } from '@iconify/react'
import { IPlanningComment, IPlanningOption } from '@interfaces/planner'
import PopulatedOptionsList from './PopulatedOptionsList'

interface OptionsListProps {
	options: IPlanningOption[]
	itemComments: IPlanningComment[]
	onAddOptionClick: () => void
	canAddOption: boolean
}

/**
 * OptionsList component displays either a populated list of options
 * or an empty state with a call to action
 */
const OptionsList: React.FC<OptionsListProps> = ({
	options,
	itemComments,
	onAddOptionClick,
	canAddOption
}) => {
	// If there are options, show the populated list
	if (options && options.length > 0) {
		return (
			<PopulatedOptionsList
				options={options}
				itemComments={itemComments}
				onAddOptionClick={onAddOptionClick}
				canAddOption={canAddOption}
			/>
		)
	}

	// Otherwise, show the empty state
	return (
		<div className="flex flex-col items-center justify-center py-8 px-4 bg-gray-750/50 rounded-lg border border-gray-700 text-center">
			<div className="bg-gray-700/50 p-3 rounded-full mb-4">
				<Icon
					icon="mdi:format-list-bulleted"
					className="h-8 w-8 text-gray-400"
				/>
			</div>
			<h3 className="text-lg font-medium text-gray-300 mb-2">No Options Yet</h3>
			<p className="text-gray-500 mb-6 max-w-md">
				Add options to present different choices for this planning item. Each
				option can have its own details, documents, and comments.
			</p>

			{canAddOption ? (
				<button
					onClick={onAddOptionClick}
					className="px-4 py-2 bg-[#ea5933] text-white font-medium rounded-md hover:bg-[#d04d2b] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ea5933] focus:ring-offset-2 focus:ring-offset-gray-800"
				>
					<Icon icon="mdi:plus" className="mr-1.5 inline-block" />
					Add Your First Option
				</button>
			) : (
				<p className="text-sm text-gray-400 italic">
					Options will be added by your account manager
				</p>
			)}
		</div>
	)
}

export default OptionsList
