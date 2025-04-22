import React from 'react'
import { Icon } from '@iconify/react'
import { usePlannerContext } from '../context/PlannerContext'

const EmptyState: React.FC = () => {
	const { state } = usePlannerContext()
	const hasSearchTerm = state.searchTerm.length > 0

	return (
		<div className="flex flex-col items-center justify-center p-10 bg-gray-800 rounded-xl border border-gray-700">
			<Icon
				icon={hasSearchTerm ? 'mdi:search-off' : 'mdi:calendar-blank'}
				className="h-16 w-16 text-gray-600 mb-4"
			/>
			<h3 className="text-xl font-medium text-gray-300 mb-2">
				{hasSearchTerm ? 'No matching planning items' : 'No planning items yet'}
			</h3>
			<p className="text-gray-500 text-center max-w-md">
				{hasSearchTerm
					? `No items found matching "${state.searchTerm}". Try a different search term or clear the search.`
					: 'Add your first planning item using the button in the header to get started.'}
			</p>
		</div>
	)
}

export default EmptyState
