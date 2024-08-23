import React, { useState, useEffect } from 'react'
import { useProject } from '@screens/projects/context/ProjectContext'
import { IClientCompany } from '@interfaces/clientCompany'
import { useApiFetch } from 'src/hooks/fetchData'
import { ProjectClientSelector } from './ProjectClientSelector'
import { IClient } from '@interfaces/client'
import baseAPI from 'src/axios/axiosConfig'

export const ProjectCompanySelector: React.FC = () => {
	const { state, dispatch } = useProject()
	const [filteredCompanies, setFilteredCompanies] = useState<IClientCompany[]>(
		[]
	)
	const { data: clientCompanies } =
		useApiFetch<IClientCompany[]>('client_companies')
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [companyEmployees, setCompanyEmployees] = useState<IClient[]>([])

	useEffect(() => {
		if (searchTerm === '') {
			setFilteredCompanies(clientCompanies)
		} else {
			setFilteredCompanies(
				clientCompanies.filter((company) =>
					company.name.toLowerCase().includes(searchTerm.toLowerCase())
				)
			)
		}
	}, [searchTerm, clientCompanies])

	useEffect(() => {
		if (filteredCompanies.length === 1) {
			const selectedCompany = filteredCompanies[0]
			if (selectedCompany._id) {
				fetchEmployees(selectedCompany._id)
				dispatch({
					type: 'UPDATE_PROJECT_FIELD',
					payload: {
						name: 'clientCompany',
						value: [selectedCompany._id]
					}
				})
			}
		}
	}, [filteredCompanies, dispatch])

	const fetchEmployees = async (companyId: string) => {
		try {
			const response = await baseAPI.get(
				`client_companies/${companyId}/employees`
			)

			const employees = response.data.data.data

			if (employees && Array.isArray(employees)) {
				setCompanyEmployees(employees)
			} else {
				console.error('No employees found for the selected company.')
			}
		} catch (error) {
			console.error('Failed to fetch employees:', error)
		}
	}

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedCompanyId = e.target.value
		const selectedCompany = clientCompanies.find(
			(company) => company._id === selectedCompanyId
		)
		if (selectedCompany && selectedCompany._id) {
			fetchEmployees(selectedCompany._id)
			console.log('company employees', companyEmployees)
			dispatch({
				type: 'UPDATE_PROJECT_FIELD',
				payload: {
					name: 'clientCompany',
					value: [selectedCompany._id]
				}
			})
		}
	}

	const selectedCompanyId = state.currentProject?.clientCompany?.[0] || ''

	return (
		<div className="bg-gray-700 text-white border rounded-md px-3 py-2 w-full focus:border-blue-500">
			<input
				className="w-2/5 px-2 py-1 text-base border border-solid bg-gray-700 rounded focus:text-white-0"
				type="text"
				placeholder="Search for a company..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			<select
				className="flex-1 w-3/6 py-1 px-2 border-0 rounded-md bg-gray-700 text-center cursor-pointer ml-2"
				onChange={handleSelectChange}
				value={selectedCompanyId as string}
				name="clientCompany"
			>
				<option value="" disabled>
					Select a Company
				</option>
				{filteredCompanies.map((company) => (
					<option key={company._id} value={company._id}>
						{company.name}
					</option>
				))}
			</select>

			<ProjectClientSelector employees={companyEmployees} />
		</div>
	)
}
