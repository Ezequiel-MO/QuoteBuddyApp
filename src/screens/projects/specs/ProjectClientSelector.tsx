import { ChangeEvent, FC, useEffect, useState } from 'react'
import { IClient } from '@interfaces/client'
import { useCurrentProject } from 'src/hooks'
import baseAPI from 'src/axios/axiosConfig' // Assuming you use this API config for fetching

interface ProjectClientSelectorProps {
	handleChange: (name: string, value: string | string[]) => void
}

export const ProjectClientSelector: FC<ProjectClientSelectorProps> = ({
	handleChange
}) => {
	const { currentProject } = useCurrentProject()
	const [employees, setEmployees] = useState<IClient[]>([]) // Store employees
	const [selectedEmployee, setSelectedEmployee] = useState<string>('') // Store selected employee

	const companyId = currentProject?.clientCompany[0] as unknown as string // Get company ID

	// Fetch employees based on selected company
	useEffect(() => {
		if (companyId) {
			fetchEmployees(companyId)
		}
	}, [companyId])

	const fetchEmployees = async (companyId: string) => {
		try {
			const response = await baseAPI.get(
				`client_companies/${companyId}/employees`
			)
			setEmployees(response.data.data.data) // Assuming response format
		} catch (error) {
			console.error('Failed to fetch employees:', error)
		}
	}

	const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const selectedClientId = e.target.value
		setSelectedEmployee(selectedClientId)
		handleChange('clientAccManager', [selectedClientId]) // Dispatch selected client ID to redux
	}

	return (
		<div className="bg-gray-700 text-white border rounded-md px-3 py-2 w-full">
			<select
				className="w-full px-3 py-2 border rounded-md bg-gray-700 text-white"
				value={selectedEmployee}
				onChange={handleSelectChange}
			>
				<option value="" disabled>
					Select a Client
				</option>
				{employees?.length === 0 ? (
					<option value="">No employees available</option>
				) : (
					employees?.map((employee) => (
						<option key={employee._id} value={employee._id}>
							{employee.firstName} {employee.familyName}
						</option>
					))
				)}
			</select>
		</div>
	)
}
