import React, { ChangeEvent, FocusEvent, useEffect, useState } from 'react'
import { useApiFetch } from 'src/hooks/fetchData'
import { IClientCompany } from '@interfaces/clientCompany'
import { useClient } from '../context/ClientContext'
import { useCompany } from '@screens/companies/context/CompanyContext'

interface Props {
	currentCompany: string | undefined
	handleChange: (e: ChangeEvent<HTMLSelectElement>) => void
	handleBlur: (
		e: FocusEvent<HTMLInputElement | HTMLSelectElement, Element>
	) => void
}

export const AddCompanyToClientForm: React.FC<Props> = ({
	currentCompany = '',
	handleChange,
	handleBlur
}) => {
	const { state, dispatch: clientDispatch } = useClient()
	const { dispatch: companyDispatch } = useCompany()
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [searchTerm, setSearchTerm] = useState<string>('')
	const { data: companies } = useApiFetch<IClientCompany[]>('client_companies')

	const closeModal = () => {
		setOpenModal(false)
	}

	const handleSearchChange = (
		e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
	) => {
		const { value } = e.target
		setSearchTerm(value)
		handleChange(e as ChangeEvent<HTMLSelectElement>) // Ensure it's cast to the appropriate type
	}

	const filteredCompanies = companies.filter((company) =>
		company.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	useEffect(() => {
		if (filteredCompanies.length === 1) {
			const selectedCompany = filteredCompanies[0].name
			if (state.currentClient?.clientCompany !== selectedCompany) {
				clientDispatch({
					type: 'UPDATE_CLIENT_FIELD',
					payload: { name: 'clientCompany', value: selectedCompany }
				})
			}
		}
	}, [filteredCompanies, state.currentClient?.clientCompany, clientDispatch])

	return (
		<div className="mx-auto p-4 bg-slate-600 shadow-md rounded-md">
			<label
				htmlFor="clientCompany"
				className="block text-lg font-medium text-gray-300 mb-2"
			>
				Company
			</label>
			<div className="flex flex-col space-y-2">
				<div className="flex items-center bg-gray-700 text-white border rounded-md px-3 py-2 w-full focus-within:border-blue-500">
					<input
						className="w-2/5 px-2 py-1 text-base border-none bg-gray-700 rounded focus:text-white focus:outline-none"
						type="text"
						name="clientCompany"
						placeholder="Search..."
						value={searchTerm}
						onChange={handleSearchChange}
					/>
					<select
						id="clientCompany"
						name="clientCompany"
						value={currentCompany || ''}
						onChange={handleSearchChange}
						onBlur={handleBlur}
						className="flex-1 w-4/6 py-1 px-2 border-none rounded-md bg-gray-700 text-center text-white cursor-pointer ml-2 focus:outline-none"
					>
						{currentCompany && (
							<option value={currentCompany}>{currentCompany}</option>
						)}
						{searchTerm === '' ? (
							<option value="">-- Select company --</option>
						) : (
							filteredCompanies.slice(0, 6).map((company) => (
								<option key={company._id} value={company.name}>
									{company.name}
								</option>
							))
						)}
					</select>
				</div>
			</div>
		</div>
	)
}
