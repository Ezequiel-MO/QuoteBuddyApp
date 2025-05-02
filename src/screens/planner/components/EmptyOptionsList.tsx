import { Icon } from '@iconify/react'

const EmptyOptionsList: React.FC<{
	onAddOptionClick: () => void
	canAddOption: boolean
}> = ({ onAddOptionClick, canAddOption }) => (
	<div className="py-8 text-center bg-gray-750 rounded-lg border border-gray-700 transition-all hover:border-gray-600">
		<Icon
			icon="mdi:ballot-outline"
			className="h-12 w-12 mx-auto text-gray-500 mb-3"
		/>
		<p className="text-gray-400 mb-2">No options available.</p>

		{canAddOption && (
			<button
				onClick={onAddOptionClick}
				className="mt-4 px-5 py-2.5 bg-gray-700 hover:bg-gray-600 text-white-0 rounded-md transition-colors inline-flex items-center gap-2 shadow-md hover:shadow-lg"
			>
				<Icon icon="mdi:plus" />
				Add First Option
			</button>
		)}
	</div>
)

export default EmptyOptionsList
