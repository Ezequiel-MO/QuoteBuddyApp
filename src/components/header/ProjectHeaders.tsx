import React from 'react'
import { IProject } from '@interfaces/project'
import { useCurrentProject } from 'src/hooks'

const ProjectHeaders: React.FC = () => {
	const { currentProject } = useCurrentProject() as { currentProject: IProject }

	return (
		<div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6">
			{/* Unified grid layout for headers and content */}
			<div className="grid grid-cols-6 gap-2 text-left text-gray-100">
				{/* Header Row */}
				<div className="font-bold py-2 px-3 bg-gray-900 rounded-tl-lg">
					Code
				</div>
				<div className="font-bold py-2 px-3 bg-gray-900">Arrival Day</div>
				<div className="font-bold py-2 px-3 bg-gray-900">Departure Day</div>
				<div className="font-bold py-2 px-3 bg-gray-900">Group Name</div>
				<div className="font-bold py-2 px-3 bg-gray-900">Group Location</div>
				<div className="font-bold py-2 px-3 bg-gray-900 rounded-tr-lg">
					Number of Pax
				</div>

				{/* Content Row with Hover Effect and Accessibility Improvements */}
				<div
					className="py-2 px-3 bg-gray-800 hover:bg-gray-700 transition-colors duration-150 rounded-bl-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					tabIndex={0}
					aria-label={`Code: ${currentProject.code}`}
				>
					{currentProject.code}
				</div>
				<div
					className="py-2 px-3 bg-gray-800 hover:bg-gray-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
					tabIndex={0}
					aria-label={`Arrival Day: ${currentProject.arrivalDay}`}
				>
					{currentProject.arrivalDay}
				</div>
				<div
					className="py-2 px-3 bg-gray-800 hover:bg-gray-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
					tabIndex={0}
					aria-label={`Departure Day: ${currentProject.departureDay}`}
				>
					{currentProject.departureDay}
				</div>
				<div
					className="py-2 px-3 bg-gray-800 hover:bg-gray-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
					tabIndex={0}
					aria-label={`Group Name: ${currentProject.groupName}`}
				>
					{currentProject.groupName}
				</div>
				<div
					className="py-2 px-3 bg-gray-800 hover:bg-gray-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
					tabIndex={0}
					aria-label={`Group Location: ${currentProject.groupLocation}`}
				>
					{currentProject.groupLocation}
				</div>
				<div
					className="py-2 px-3 bg-gray-800 hover:bg-gray-700 transition-colors duration-150 rounded-br-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					tabIndex={0}
					aria-label={`Number of Pax: ${currentProject.nrPax}`}
				>
					{currentProject.nrPax}
				</div>
			</div>
		</div>
	)
}

export default React.memo(ProjectHeaders)
