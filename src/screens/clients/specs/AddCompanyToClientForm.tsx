import React, { ChangeEvent, FocusEvent, useState } from 'react'
import { Button } from '@components/atoms'
import { useApiFetch } from 'src/hooks/fetchData'
import { IClientCompany } from '@interfaces/clientCompany'
import AddCompanyModal from './AccCompanyModal'

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
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [searchTerm, setSearchTerm] = useState<string>('')
	const { data: companies } = useApiFetch<IClientCompany[]>('client_companies')

	const handleClick = () => {
		setOpenModal((prev) => !prev)
	}

	const closeModal = () => {
		setOpenModal(false)
	}

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const filteredCompanies = companies.filter((company) =>
		company.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

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
						placeholder="Search..."
						value={searchTerm}
						onChange={handleSearchChange}
					/>
					<select
						id="clientCompany"
						name="clientCompany"
						value={currentCompany || ''}
						onChange={handleChange}
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
								<option key={company._id} value={company._id}>
									{company.name}
								</option>
							))
						)}
					</select>
				</div>
				<Button
					newClass="flex items-center justify-center gap-2 w-full py-2 rounded-md text-center cursor-pointer bg-slate-600 text-white hover:bg-blue-700 font-bold uppercase"
					handleClick={handleClick}
					type="button"
					icon="ic:outline-domain-add"
					widthIcon={20}
				>
					CREATE NEW COMPANY
				</Button>
			</div>
			<AddCompanyModal isOpen={openModal} onClose={closeModal} />
		</div>
	)
}
