import React from 'react'
import { Icon } from '@iconify/react'
import OptionCard from './OptionCard'
import { IPlanningOption } from '@interfaces/planner'

interface OptionsListProps {
	options: IPlanningOption[]
	planningItemId?: string
	onAddOptionClick: () => void
}

const OptionsList: React.FC<OptionsListProps> = ({
	options,
	onAddOptionClick
}) => {
	return (
		<div className="mt-6 space-y-6">
			{options.map((option) => (
				<OptionCard key={option._id} option={option} />
			))}

			{/* Add option button */}
			<button
				onClick={onAddOptionClick}
				className="w-full py-3 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 flex items-center justify-center hover:border-[#ea5933] hover:text-[#ea5933] transition-colors"
			>
				<Icon icon="mdi:plus" className="mr-2" />
				Add Another Option
			</button>
		</div>
	)
}

export default OptionsList
