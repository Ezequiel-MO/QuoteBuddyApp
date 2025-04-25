import React, { useEffect } from 'react'
import { Icon } from '@iconify/react'
import OptionCard from './OptionCard'
import { IPlanningOption, IPlanningComment } from '@interfaces/planner'

interface OptionsListProps {
	options: IPlanningOption[]
	planningItemId: string
	itemComments: IPlanningComment[]
	onAddOptionClick: () => void
	canAddOption?: boolean // Make this prop optional for backward compatibility
}

// Function to generate alternating background colors
const getOptionBgColor = (index: number, vendorType?: string): string => {
	// Base colors to alternate between
	const baseColors = ['bg-gray-800/60', 'bg-gray-800/80', 'bg-gray-750/70']

	// Special colors for different vendor types if available
	if (vendorType) {
		switch (vendorType.toLowerCase()) {
			case 'hotel':
			case 'accommodation':
				return 'bg-blue-900/20'
			case 'restaurant':
			case 'food':
			case 'meal':
				return 'bg-amber-900/15'
			case 'transport':
			case 'transportation':
				return 'bg-emerald-900/20'
			case 'activity':
			case 'experience':
				return 'bg-purple-900/20'
			case 'guide':
				return 'bg-cyan-900/20'
			default:
				break
		}
	}

	// Fallback to alternating base colors
	return baseColors[index % baseColors.length]
}

const OptionsList: React.FC<OptionsListProps> = ({
	options,
	planningItemId,
	itemComments = [],
	onAddOptionClick,
	canAddOption = true // Default to true for backward compatibility
}) => {
	// Add debugging log when itemComments prop changes
	useEffect(() => {
		console.log('OptionsList received itemComments:', {
			planningItemId,
			itemCommentsLength: itemComments.length,
			itemComments
		})
	}, [itemComments, planningItemId])

	return (
		<div className="mt-6">
			{options.length === 0 ? (
				<div className="py-6 text-center bg-gray-750 rounded-lg border border-gray-700">
					<Icon
						icon="mdi:ballot-outline"
						className="h-10 w-10 mx-auto text-gray-500 mb-2"
					/>
					<p className="text-gray-400">No options available.</p>

					{canAddOption && (
						<button
							onClick={onAddOptionClick}
							className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white-0 rounded-md transition-colors inline-flex items-center gap-2"
						>
							<Icon icon="mdi:plus" />
							Add First Option
						</button>
					)}
				</div>
			) : (
				<>
					<div className="space-y-8">
						{options.map((option, index) => (
							<div
								key={option._id}
								className={`p-4 ${getOptionBgColor(
									index,
									option.vendorType
								)} rounded-lg border border-gray-700 hover:border-gray-600 transition-all shadow-md`}
							>
								<OptionCard option={option} itemComments={itemComments} />
							</div>
						))}
					</div>

					{/* Add option button - only shown if canAddOption is true */}
					{canAddOption && (
						<button
							onClick={onAddOptionClick}
							className="w-full mt-6 py-4 border-2 border-dashed border-gray-600 rounded-lg text-gray-400 flex items-center justify-center hover:border-[#ea5933] hover:text-[#ea5933] transition-colors"
						>
							<Icon icon="mdi:plus" className="mr-2" />
							Add Another Option
						</button>
					)}
				</>
			)}
		</div>
	)
}

export default OptionsList
