import { useEffect, useState } from 'react'
import { useCurrentInvoice } from '../../../hooks'
import { useFilterList } from '../../../hooks/useFilterList'
import { editableDivClass, readOnlyDivClass } from '../styles'
import { useApiFetch } from 'src/hooks/fetchData'

export const CompanySelector = ({
	handleChange,
	selectedCompany,
	isEditable
}) => {
	const { data: companies, isLoading } = useApiFetch('client_companies')
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
		// Only update address and postCode if a valid company is selected
		const company = companies.find((c) => c.name === selectedCompany)
		if (company) {
			setInvoiceValue({
				name: 'address',
				value: company.address || ''
			})
			setInvoiceValue({
				name: 'postCode',
				value: company.postCode || ''
			})
		} else {
			// Reset address and postCode if no valid company is selected
			setInvoiceValue({ name: 'address', value: '' })
			setInvoiceValue({ name: 'postCode', value: '' })
		}
	}, [selectedCompany, companies, setInvoiceValue])

	const handleCompanyChange = (e) => {
		setLocalCompany(e.target.value)
		handleChange(e)
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
