import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CountryListItem from './CountryListItem'
import { TableHeaders } from '../../../ui'
import { useFilterList } from '../../../hooks'
import { Spinner } from '../../../components/atoms'
import { ListHeader } from '../../../components/molecules'
import { useFetchCountries } from 'src/hooks/fetchData/useFetchCountries'
import { listStyles } from 'src/constants/listStyles'
import { ICountry } from '@interfaces/country'

const CountryList: React.FC = () => {
	const navigate = useNavigate()
	const [country] = useState<ICountry>({} as ICountry)
	const { countries, setCountries, isLoading } = useFetchCountries()

	useEffect(() => {
		setFoundCountries(countries)
	}, [countries])

	const filterFunction = (data: ICountry, value: string) =>
		data.name.toLowerCase().includes(value.toLowerCase())

	const {
		filteredData: foundCountries,
		searchTerm: searchItem,
		filterList,
		setData: setFoundCountries
	} = useFilterList<ICountry>(countries, filterFunction)

	const navigateToCountrySpecs = useCallback(
		(country: ICountry) => {
			navigate('/app/country/specs', { state: { country } })
		},
		[navigate]
	)

	return (
		<>
			<ListHeader
				title="Countries"
				handleClick={() => navigateToCountrySpecs(country)}
				searchItem={searchItem}
				filterList={filterList}
			/>
			<hr />
			<div className="flex-1 m-4 flex-col">
				{isLoading ? (
					<Spinner />
				) : (
					<table className={listStyles.table}>
						<TableHeaders headers="country" />
						{foundCountries?.map((item) => (
							<CountryListItem
								key={item._id}
								country={item}
								countries={countries}
								setCountries={setCountries}
								handleNavigate={navigateToCountrySpecs}
							/>
						))}
					</table>
				)}
			</div>
		</>
	)
}

export default CountryList
