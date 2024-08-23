import React from 'react'
import { useProject } from '@screens/projects/context/ProjectContext'
import { IClient } from '@interfaces/client'

interface ProjectClientSelectorProps {
	employees: IClient[]
}

export const ProjectClientSelector: React.FC<ProjectClientSelectorProps> = ({
	employees
}) => {
	const { state, dispatch } = useProject()
	const handleSelectClient = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedClientId = e.target.value
		dispatch({
			type: 'UPDATE_PROJECT_FIELD',
			payload: {
				name: 'clientAccManager',
				value: [selectedClientId]
			}
		})
	}

	const selectedClientId = state.currentProject?.clientAccManager?.[0] || ''

	return (
		<div className="my-4">
			<select
				className="w-full px-3 py-2 border rounded-md bg-gray-700 text-white focus:border-blue-500"
				onChange={handleSelectClient}
				value={selectedClientId as string}
				disabled={!employees.length}
			>
				<option value="" disabled>
					{employees.length ? 'Select a Client' : 'No clients available'}
				</option>
				{employees.map((employee) => (
					<option key={employee._id} value={employee._id}>
						{employee.firstName} {employee.familyName}
					</option>
				))}
			</select>

			{/* <button
				className="mt-2 p-2 bg-blue-500 text-white rounded"
				onClick={() => {
					// Placeholder for the add client button functionality
					// Open modal or perform other actions
				}}
				disabled={!employees.length}
			>
				Add Client
			</button> */}
		</div>
	)
}
