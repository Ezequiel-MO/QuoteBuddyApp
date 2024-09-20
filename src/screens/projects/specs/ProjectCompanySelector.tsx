import { ChangeEvent, useEffect, useState, FC } from 'react'
import { IClientCompany } from '@interfaces/clientCompany'
import { useApiFetch } from 'src/hooks/fetchData'

interface ProjectCompanySelectorProps {
	companyValue: string // The currently selected company name (string)
	handleChange: (name: string, value: string | string[]) => void // Function to handle the change in selection
}

export const ProjectCompanySelector: FC<ProjectCompanySelectorProps> = ({
	companyValue,
	handleChange
}) => {
	const { data: clientCompanies } =
		useApiFetch<IClientCompany[]>('client_companies')
	const [search, setSearch] = useState<string>('') // Search term
	const [filteredCompanies, setFilteredCompanies] = useState<IClientCompany[]>(
		[]
	)

	// Filter companies based on the search input
	useEffect(() => {
		if (search === '') {
			setFilteredCompanies([])
		} else if (clientCompanies) {
			const filtered = clientCompanies.filter((company) =>
				company.name.toLowerCase().includes(search.toLowerCase())
			)
			setFilteredCompanies(filtered)
		}
	}, [search, clientCompanies])

	// Auto-select the company if only one match is found
	useEffect(() => {
		if (filteredCompanies.length === 1) {
			handleChange('clientCompany', [filteredCompanies[0]._id || ''])
		} else if (!search && !companyValue) {
			handleChange('clientCompany', [])
		}
	}, [search, filteredCompanies.length])

	// Handle the search input
	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value)
	}

	// Handle the dropdown selection
	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const selectedCompanyId = event.target.value
		const selectedCompany = clientCompanies?.find(
			(company) => company._id === selectedCompanyId
		)
		if (selectedCompany) {
			setSearch(selectedCompany.name) // Update the search input to match the selected company name
			handleChange('clientCompany', [selectedCompany._id || '']) // Ensure it's a string
		}
	}

	return (
		<div className="bg-gray-700 text-white border rounded-md px-3 py-2 w-full focus:border-blue-500">
			<input
				className="w-2/5 px-2 py-1 text-base border border-solid bg-gray-700 rounded focus:text-white"
				type="text"
				placeholder="Search for a company..."
				value={search}
				onChange={handleSearch}
			/>
			<select
				name="clientCompany"
				value={companyValue || ''} // Ensure companyValue is a string, fallback to an empty string
				className="flex-1 w-3/6 py-1 px-2 border-0 rounded-md bg-gray-700 text-center cursor-pointer ml-2"
				onChange={handleSelectChange}
			>
				<option value="" disabled>
					Select a company
				</option>
				{filteredCompanies.length === 0 && (
					<option value="">No company found</option>
				)}
				{filteredCompanies.map((company) => (
					<option key={company._id} value={company._id || ''}>
						{company.name}
					</option>
				))}
			</select>
		</div>
	)
}
