import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableHeaders } from '../../../ui'
import { Spinner } from '../../../components/atoms'
import { useGetCompanies } from '../../../hooks'
import CompanyListItem from './CompanyListItem'
import { ListHeader } from '../../../components/molecules'

const CompanyList = () => {
	const navigate = useNavigate()
	const [company] = useState({})
	const [searchItem, setSearchItem] = useState('')
	const { companies, setCompanies, isLoading } = useGetCompanies()
	const [foundCompanies, setFoundCompanies] = useState([])

	useEffect(() => {
		setFoundCompanies(companies)
	}, [companies])

	const filterList = (event) => {
		setSearchItem(event.target.value)
		const result = companies.filter((element) =>
			element.name.toLowerCase().includes(event.target.value.toLowerCase())
		)
		setFoundCompanies(result)
		if (searchItem === ``) {
			setFoundCompanies(companies)
		}
	}

	const handleClick = () =>
		navigate('/app/company/specs', { state: { company } })

	const companyList = foundCompanies?.map((element) => (
		<CompanyListItem
			key={element._id}
			company={element}
			companies={companies}
			setCompanies={setCompanies}
		/>
	))

	return (
		<>
			<ListHeader
				title="Companies"
				handleClick={handleClick}
				searchItem={searchItem}
				filterList={filterList}
			/>
			<hr />

			<div className="flex-1 m-4 flex-col">
				{isLoading ? (
					<Spinner />
				) : (
					(companyList.length > 0 && (
						<table className="w-full p-5">
							<TableHeaders headers="company" />
							{companyList}
						</table>
					)) || <h1>This company was not found</h1>
				)}
			</div>
		</>
	)
}

export default CompanyList
