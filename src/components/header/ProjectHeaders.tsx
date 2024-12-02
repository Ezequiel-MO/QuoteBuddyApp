import React, { useState } from 'react'
import { IProject } from '@interfaces/project'
import { useCurrentProject } from 'src/hooks'
import { Icon } from '@iconify/react'
import { useProject } from '@screens/projects/context/ProjectContext'
import { useNavigate } from 'react-router-dom'

const ProjectHeaders: React.FC = () => {
	const { dispatch } = useProject()
	const { currentProject } = useCurrentProject() as { currentProject: IProject }
	const navigate = useNavigate()
	const [isEmailCopied, setIsEmailCopied] = useState(false)

	// Function to handle copying email
	const handleCopyEmail = async (email: string) => {
		try {
			await navigator.clipboard.writeText(email)
			setIsEmailCopied(true)
			setTimeout(() => {
				setIsEmailCopied(false)
			}, 2000)
		} catch (err) {
			console.error('Failed to copy email:', err)
		}
	}

	const handleNavigateToProjectSpecs = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: true
		})
		dispatch({
			type: 'SET_PROJECT',
			payload: currentProject
		})
		navigate('/app/project/specs')
	}

	return (
		<div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-4 overflow-x-auto">
			{/* Grid layout for headers and content */}
			<div className="grid grid-cols-12 gap-2 text-left text-gray-100">
				{/* Header Row */}
				<div className="font-semibold py-2 px-3 bg-gray-900 rounded-tl-lg col-span-2 text-sm md:text-base lg:text-lg">
					Code
				</div>
				<div className="font-semibold py-2 px-3 bg-gray-900 col-span-3 text-sm md:text-base lg:text-lg">
					Client Email
				</div>
				<div className="font-semibold py-2 px-3 bg-gray-900 col-span-2 text-sm md:text-base lg:text-lg">
					Arrival Day
				</div>
				<div className="font-semibold py-2 px-3 bg-gray-900 col-span-2 text-sm md:text-base lg:text-lg">
					Dept. Day
				</div>
				<div className="font-semibold py-2 px-3 bg-gray-900 col-span-2 text-sm md:text-base lg:text-lg">
					Gr. Location
				</div>
				<div className="font-semibold py-2 px-3 bg-gray-900 rounded-tr-lg col-span-1 text-sm md:text-base lg:text-lg">
					Nr. Pax
				</div>

				{/* Content Row */}
				{/* Code */}
				<div
					className="py-2 px-3 bg-gray-800 transition-colors duration-150 rounded-bl-lg col-span-2 truncate hover:text-blue-500 hover:underline cursor-pointer"
					tabIndex={0}
					aria-label={`Code: ${currentProject?.code}`}
					onClick={handleNavigateToProjectSpecs}
				>
					{currentProject?.code}
				</div>

				{/* Client Email with Tooltip and Copy Button */}
				<div
					className="relative py-2 px-3 bg-gray-800 hover:bg-gray-700 transition-colors duration-150 col-span-3 truncate group"
					tabIndex={0}
					aria-label={`Client Acc Manager: ${currentProject.clientAccManager[0]?.email}`}
				>
					{/* Email Text and Copy Button Container */}
					<div className="flex items-center justify-between">
						{/* Email Text */}
						<span
							className="truncate"
							title={currentProject.clientAccManager[0]?.email}
						>
							{currentProject.clientAccManager[0]?.email}
						</span>

						{/* Copy Button */}
						<button
							onClick={(e) => {
								e.stopPropagation() // Prevent triggering the main copy handler
								handleCopyEmail(currentProject.clientAccManager[0]?.email)
							}}
							className="p-1 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition duration-300 ease-in-out focus:outline-none"
							aria-label="Copy Client Email"
						>
							<Icon
								icon={isEmailCopied ? 'akar-icons:check' : 'mdi:content-copy'}
								color={isEmailCopied ? 'green' : 'white'}
								width="16"
								height="16"
							/>
						</button>
					</div>

					{/* Tooltip */}
					{isEmailCopied && (
						<div className="absolute left-0 top-full mt-1 w-max bg-green-500 text-white text-xs py-1 px-2 rounded z-10">
							<Icon
								icon="akar-icons:check"
								color="white"
								width="16"
								height="16"
							/>
							<span className="ml-1">Email Copied</span>
						</div>
					)}
				</div>

				{/* Arrival Day */}
				<div
					className="py-2 px-3 bg-gray-800 hover:bg-gray-700 transition-colors duration-150 col-span-2 truncate"
					tabIndex={0}
					aria-label={`Arrival Day: ${currentProject.arrivalDay}`}
				>
					{currentProject.arrivalDay}
				</div>

				{/* Departure Day */}
				<div
					className="py-2 px-3 bg-gray-800 hover:bg-gray-700 transition-colors duration-150 col-span-2 truncate"
					tabIndex={0}
					aria-label={`Departure Day: ${currentProject.departureDay}`}
				>
					{currentProject.departureDay}
				</div>

				{/* Group Location */}
				<div
					className="py-2 px-3 bg-gray-800 hover:bg-gray-700 transition-colors duration-150 col-span-2 truncate"
					tabIndex={0}
					aria-label={`Group Location: ${currentProject.groupLocation}`}
				>
					{currentProject.groupLocation}
				</div>

				{/* Number of Pax */}
				<div
					className="py-2 px-3 bg-gray-800 hover:bg-gray-700 transition-colors duration-150 rounded-br-lg col-span-1 truncate"
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
