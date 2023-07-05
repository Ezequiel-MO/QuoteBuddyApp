import { useEffect, useState } from 'react'
import { useCurrentInvoice, useGetCompanies } from '../../../hooks'
import { useFilterList } from '../../../hooks/useFilterList'
import { editableDivClass, readOnlyDivClass } from '../styles'

export const CompanySelector = ({
	handleChange,
	selectedCompany,
	isEditable
}) => {
	const { companies, isLoading } = useGetCompanies()
	const [localCompany, setLocalCompany] = useState('')
	const { setInvoiceValue } = useCurrentInvoice()

	const filterFunction = (company, term) =>
		company.name.toLowerCase().includes(term.toLowerCase())

	const {
		filteredData: filteredCompanies,
		searchTerm,
		filterList,
		setData
	} = useFilterList(companies, filterFunction)

	useEffect(() => {
		setData(companies)
	}, [companies, setData])

	useEffect(() => {
		if (localCompany) {
			const company = companies.find((company) => company.name === localCompany)
			setInvoiceValue({ name: 'address', value: company?.address })
		}
	}, [localCompany])

	const handleCompanyChange = (e) => {
		handleChange(e)
		setLocalCompany(e.target.value)
	}

	if (isLoading) {
		return (
			<p className="text-center text-xl text-orange-500">
				Loading companies...
			</p>
		)
	}

	return (
		<div className={isEditable ? editableDivClass : readOnlyDivClass}>
			<div className={isEditable ? 'whitespace-nowrap' : 'font-medium text-lg'}>
				COMPANY:
			</div>
			{isEditable ? (
				<>
					<input
						id="company-search"
						type="text"
						placeholder="Search company"
						value={searchTerm}
						onChange={filterList}
						className="ml-2 flex-1 rounded-md border border-gray-300 px-2"
					/>
					<select
						name="company"
						value={selectedCompany}
						onChange={handleCompanyChange}
						className="ml-2 w-1/2 rounded-md border border-gray-300 px-2 cursor-pointer"
					>
						<option value="">Select a Company </option>
						{filteredCompanies.map((company, index) => (
							<option key={index} value={company.name}>
								{company.name}
							</option>
						))}
					</select>
				</>
			) : (
				<p
					className={
						isEditable ? 'ml-2 text-gray-700' : 'ml-2 text-lg text-right'
					}
				>
					{selectedCompany}
				</p>
			)}
		</div>
	)
}
