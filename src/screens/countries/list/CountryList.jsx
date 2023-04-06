import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CountryListItem from './CountryListItem'
import { TableHeaders } from '../../../ui'
import { useGetCountries } from '../../../hooks'
import { Spinner } from '../../../components/atoms'
import { ListHeader } from '../../../components/molecules'

const CountryList = () => {
	const navigate = useNavigate()
	const [country] = useState({})
	const [searchItem, setSearchItem] = useState('')
	const { countries, setCountries, isLoading } = useGetCountries()

	const [foundCountries, setFoundCountries] = useState([])

	useEffect(() => {
		setFoundCountries(countries)
	}, [countries])

	const filterList = (e) => {
		setSearchItem(e.target.value)
		const result = countries.filter((data) =>
			data.name.toLowerCase().includes(e.target.value.toLowerCase())
		)
		setFoundCountries(result)
		if (searchItem === '') {
			setFoundCountries(countries)
		}
	}

	const countryList = foundCountries?.map((item) => (
		<CountryListItem
			key={item._id}
			country={item}
			countries={countries}
			setCountries={setCountries}
		/>
	))

	const handleClick = () =>
		navigate('/app/country/specs', { state: { country } })

	return (
		<>
			<ListHeader
				title="Countries"
				handleClick={handleClick}
				searchItem={searchItem}
				filterList={filterList}
			/>
			<hr />
			<div className="flex-1 m-4 flex-col">
				{isLoading ? (
					<Spinner />
				) : (
					<table className="w-full p-5">
						<TableHeaders headers="country" />
						{countryList}
					</table>
				)}
			</div>
		</>
	)
}

export default CountryList
