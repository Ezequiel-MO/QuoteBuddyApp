import { IPlanningComment, IPlanningOption } from '@interfaces/planner'
import { getOptionBgColor } from '../utils/getOptionBgColor'
import OptionCard from './OptionCard'
import { Icon } from '@iconify/react'

/**
 * Component to display when options are available
 */
const PopulatedOptionsList: React.FC<{
	options: IPlanningOption[]
	itemComments: IPlanningComment[]
	onAddOptionClick: () => void
	canAddOption: boolean
}> = ({ options, itemComments, onAddOptionClick, canAddOption }) => (
	<>
		<div className="space-y-8">
			{options.map((option, index) => (
				<div
					key={option._id}
					className={`p-5 ${getOptionBgColor(index, option.vendorType)} 
			  rounded-lg border-2 hover:border-gray-500 
			  transition-all duration-300 shadow-lg hover:shadow-xl 
			  transform hover:-translate-y-1`}
				>
					<OptionCard option={option} itemComments={itemComments} />
				</div>
			))}
		</div>

		{canAddOption && (
			<button
				onClick={onAddOptionClick}
				className="w-full mt-8 py-4 border-2 border-dashed border-gray-600 rounded-lg 
			text-gray-400 flex items-center justify-center hover:border-[#ea5933] 
			hover:text-[#ea5933] transition-colors hover:bg-gray-800/50"
			>
				<Icon icon="mdi:plus" className="mr-2 h-5 w-5" />
				Add Another Option
			</button>
		)}
	</>
)

export default PopulatedOptionsList
