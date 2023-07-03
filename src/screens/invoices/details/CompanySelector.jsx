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
		return (
			<p className="text-center text-xl text-blue-500">Loading companies...</p>
		)
	}

	return (
		<div className="my-1 w-[700px] font-bold text-lg flex justify-between items-center bg-gray-200 p-4 rounded-md">
			COMPANY:
			{isEditable ? (
				<>
					<input
						id="company-search"
						type="text"
						placeholder="Search company"
						value={searchTerm}
						onChange={filterList}
						className="ml-2 flex-1 rounded-md border border-gray-300 p-2"
					/>
					<select
						name="company"
						value={selectedCompany}
						onChange={handleChange}
						className="ml-2 w-1/2 rounded-md border border-gray-300 p-2"
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
