import React, { ChangeEvent, useEffect, useState } from 'react'
import { IClientCompany } from 'src/interfaces'
import { useApiFetch } from 'src/hooks/fetchData'

interface ProjectCompanySelectorProps {
	handleChange: (
		event: ChangeEvent<HTMLSelectElement | HTMLInputElement>
	) => void
	clientCompany: string
	name?: string
}

export const ProjectCompanySelector: React.FC<ProjectCompanySelectorProps> = ({
	handleChange,
	clientCompany,
	name = 'clientCompany'
}) => {
	const { data: clientCompanies } =
		useApiFetch<IClientCompany[]>('client_companies')

	const [search, setSearch] = useState<string>('')

	const filteredOptions = clientCompanies
		.filter((company: IClientCompany) =>
			company.name.toLowerCase().includes(search.toLowerCase())
		)
		.sort((a: IClientCompany, b: IClientCompany) => {
			if (a.name < b.name) return -1
			if (a.name > b.name) return 1
			return 0
		})

	const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value)
	}

	useEffect(() => {
		if (filteredOptions.length === 1) {
			handleChange({
				target: { name, value: filteredOptions[0].name }
			} as ChangeEvent<HTMLSelectElement>)
		} else if (!search && !clientCompany) {
			handleChange({
				target: { name, value: '' }
			} as ChangeEvent<HTMLSelectElement>)
		}
	}, [search, filteredOptions.length])

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
				name={name}
				id={name}
				value={clientCompany}
				className="flex-1 w-3/6 py-1 px-2 border-0 rounded-md bg-gray-700 text-center cursor-pointer ml-2"
				onChange={handleChange}
			>
				{!search && <option value="">Select a company</option>}
				{filteredOptions.length === 0 && (
					<option value="">No company found</option>
				)}
				{filteredOptions.map((company: IClientCompany) => (
					<option value={company.name} key={company._id}>
						{company.name}
					</option>
				))}
			</select>
		</div>
	)
}
