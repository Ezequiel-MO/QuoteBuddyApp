import React, { useState } from 'react'
import { IProject } from '@interfaces/project'
import { Icon } from '@iconify/react'
import { toast } from 'react-toastify'
import { errorToastOptions } from '@helper/toast'
import { isValidProject } from './utils/projectValidation'

interface ProjectSelectionProps {
	projects: IProject[]
	currentProjectCode: string
	onSelectProject: (project: IProject) => void
	onCancel: () => void
}

const ProjectSelection: React.FC<ProjectSelectionProps> = ({
	projects,
	currentProjectCode,
	onSelectProject,
	onCancel
}) => {
	const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null)

	const handleProjectSelect = (project: IProject) => {
		// Validate project before selection
		if (!isValidProject(project)) {
			toast.error(
				'This project is using a legacy format and is no longer available. Please contact your account manager if you wish to enable it again.',
				errorToastOptions
			)
			return
		}

		// If valid, proceed with selection
		onSelectProject(project)
	}

	return (
		<div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
			<div className="bg-white-0 dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 mx-4">
				<div className="mb-4 flex items-center justify-between">
					<h2 className="text-xl font-bold text-gray-900 dark:text-white-0">
						Select a Project
					</h2>
					<button
						onClick={onCancel}
						className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
					>
						<Icon icon="mdi:close" width="24" height="24" />
					</button>
				</div>

				<p className="mb-4 text-gray-600 dark:text-gray-300">
					We found multiple projects associated with your account. Please select
					which one you'd like to access:
				</p>

				<div className="space-y-3 max-h-80 overflow-y-auto my-4 pr-1">
					{projects.map((project) => (
						<div
							key={project._id}
							onClick={() => handleProjectSelect(project)}
							onMouseEnter={() => setHoveredProjectId(project._id ?? null)}
							onMouseLeave={() => setHoveredProjectId(null)}
							className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${
								project.code === currentProjectCode
									? 'border-[#ea5933] bg-orange-50 dark:bg-gray-700'
									: hoveredProjectId === project._id
									? 'border-[#ea5933] bg-orange-50/30 dark:bg-gray-700/80'
									: 'border-gray-200 dark:border-gray-700'
							}`}
						>
							<div className="flex items-center justify-between">
								<div>
									<h3 className="font-medium text-gray-900 dark:text-white-0">
										{project.groupName}
									</h3>
									<p className="text-sm text-gray-600 dark:text-gray-400">
										Project Code: {project.code}
									</p>
									{project.arrivalDay && project.departureDay && (
										<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
											{new Date(project.arrivalDay).toLocaleDateString()} -{' '}
											{new Date(project.departureDay).toLocaleDateString()}
										</p>
									)}
								</div>
								<div
									className={`transition-opacity duration-200 ${
										project.code === currentProjectCode
											? 'opacity-100'
											: hoveredProjectId === project._id
											? 'opacity-60'
											: 'opacity-0'
									}`}
								>
									<Icon
										icon={
											project.code === currentProjectCode
												? 'mdi:check-circle'
												: 'mdi:arrow-right-circle'
										}
										className="text-[#ea5933]"
										width="24"
										height="24"
									/>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="flex justify-end space-x-3 mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
					<button
						onClick={onCancel}
						className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-200 transform hover:scale-105 active:scale-95"
					>
						Cancel
					</button>
					<button
						onClick={() => {
							const currentProject = projects.find(
								(p) => p.code === currentProjectCode
							)
							if (currentProject) handleProjectSelect(currentProject)
						}}
						className="px-4 py-2 text-white-0 bg-[#ea5933] rounded-md hover:bg-[#d84b2a] transition-colors duration-200 transform hover:scale-105 active:scale-95"
					>
						Continue
					</button>
				</div>
			</div>
		</div>
	)
}

export default ProjectSelection
