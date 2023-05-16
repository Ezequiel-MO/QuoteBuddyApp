import { useEffect } from 'react'
import { useGetCompanies } from '../../../hooks'
import { useFilterList } from '../../../hooks/useFilterList'

export const CompanySelector = ({
	handleChange,
	selectedCompany,
	isEditable
}) => {
	const { companies, isLoading } = useGetCompanies()

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

	if (isLoading) {
		return <p>Loading companies...</p>
	}

	return (
		<div className="font-bold leading-none flex">
			COMPANY:
			{isEditable ? (
				<>
					<input
						id="company-search"
						type="text"
						placeholder="Search company"
						value={searchTerm}
						onChange={filterList}
						className="search-input ml-2"
					/>
					<select
						name="company"
						value={selectedCompany}
						onChange={handleChange}
						className="company-select ml-2"
					>
						{filteredCompanies.map((company) => (
							<option key={company.id} value={company.name}>
								{company.name}
							</option>
						))}
					</select>
				</>
			) : (
				<p className="ml-2 font-normal">{selectedCompany}</p>
			)}
		</div>
	)
}
