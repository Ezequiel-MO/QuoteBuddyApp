import React, { ChangeEvent, FocusEvent, useEffect, useState } from 'react'
import { IClientCompany } from 'src/interfaces'
import { TextInput } from '@components/atoms'
import { useApiFetch } from 'src/hooks/fetchData'

interface ProjectCompanySelectorProps {
	handleChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
	handleBlur: (e: FocusEvent<HTMLInputElement | HTMLSelectElement>) => void
	errors?: { [key: string]: string }
}

export const ProjectCompanySelector: React.FC<ProjectCompanySelectorProps> = ({
	handleChange,
	handleBlur,
	errors
}) => {
	const { data: clientCompanies } =
		useApiFetch<IClientCompany[]>('client_companies')
	const [filteredCompanies, setFilteredCompanies] = useState<IClientCompany[]>(
		[]
	)
	const [companyInput, setCompanyInput] = useState<string>('')

	useEffect(() => {
		if (companyInput === '') {
			setFilteredCompanies([])
		} else {
			const filtered = clientCompanies.filter((company) =>
				company.name.toLowerCase().includes(companyInput.toLowerCase())
			)
			setFilteredCompanies(filtered)
		}
	}, [companyInput, clientCompanies])

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCompanyInput(e.target.value)
		handleChange(e)

		// Automatically select if only one company matches
		const filtered = clientCompanies.filter((company) =>
			company.name.toLowerCase().includes(e.target.value.toLowerCase())
		)
		if (filtered.length === 1) {
			const event = {
				target: {
					name: 'clientCompany',
					value: filtered[0].name
				}
			} as ChangeEvent<HTMLInputElement>
			handleChange(event)
		}
	}

	const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setCompanyInput(e.target.value)
		handleChange(e)
	}

	return (
		<div className="bg-gray-700 text-white-0 border rounded-md px-3 py-2 w-full focus:border-blue-500">
			<TextInput
				type="text"
				label="Company Name"
				name="clientCompany"
				value={companyInput}
				handleChange={handleInputChange}
				handleBlur={handleBlur}
				errors={errors?.clientCompany}
				placeholder="Type to search..."
			/>
			<select
				name="clientCompany"
				value={companyInput}
				onChange={handleSelectChange}
				onBlur={handleBlur}
				className="bg-gray-700 text-gray-200 border border-gray-500 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
			>
				<option value="">Select a company</option>
				{filteredCompanies.map((company) => (
					<option key={company?._id} value={company.name}>
						{company.name}
					</option>
				))}
			</select>
			{errors?.clientCompany && (
				<p className="mt-2 text-sm text-red-600">{errors.clientCompany}</p>
			)}
		</div>
	)
}
