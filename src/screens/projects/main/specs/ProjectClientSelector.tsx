import React, { ChangeEvent } from 'react'
import { useApiFetch } from 'src/hooks/fetchData'
import { IClient } from 'src/interfaces/client'
import { useCurrentProject } from 'src/hooks'

interface ProjectClientSelectorProps {
	handleChange: (
		event: ChangeEvent<HTMLSelectElement | HTMLInputElement>
	) => void
	selectedClient: string
	name?: string
}

export const ProjectClientSelector: React.FC<ProjectClientSelectorProps> = ({
	handleChange,
	selectedClient,
	name = 'client'
}) => {
	const { currentProject } = useCurrentProject()
	const clientCompany = currentProject.clientCompany[0]?._id || ''
	const { data: employees, isLoading } = useApiFetch<IClient[]>(
		clientCompany ? `client_companies/${clientCompany}/employees` : '',
		0,
		!!clientCompany
	)

	return (
		<div className="bg-gray-700 text-white border rounded-md px-3 py-2 w-full focus:border-blue-500">
			<label className="block text-sm font-medium text-gray-300">
				Select Client
			</label>
			<select
				name={name}
				id={name}
				value={selectedClient}
				onChange={handleChange}
				className="block w-full mt-1 text-base border border-solid bg-gray-700 rounded focus:text-white"
				disabled={!clientCompany || isLoading}
			>
				{!clientCompany && (
					<option value="">-- First select a company --</option>
				)}
				{isLoading && <option value="">Loading...</option>}
				{clientCompany && !isLoading && employees.length === 0 && (
					<option value="">No clients found</option>
				)}
				{clientCompany &&
					employees.map((client: IClient) => (
						<option key={client._id} value={client._id}>
							{`${client.firstName} ${client.familyName}`}
						</option>
					))}
			</select>

			<button
				type="button"
				className={`mt-2 px-4 py-2 bg-blue-600 text-white rounded ${
					!clientCompany ? 'opacity-50 cursor-not-allowed' : ''
				}`}
				disabled={!clientCompany}
				onClick={() => alert('Add Client functionality will be implemented.')}
			>
				Add Client
			</button>
		</div>
	)
}
