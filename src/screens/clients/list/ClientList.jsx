import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CountryFilter, TableHeaders } from '../../../ui'
import ClientListItem from './ClientListItem'
import {
	useFilterList,
	useGetDocumentLength,
	usePagination
} from '../../../hooks'
import { Spinner } from '../../../components/atoms'
import { ListHeader } from '../../../components/molecules'
import { useFetchClients } from 'src/hooks/fetchData/useFetchClients'

const ClientList = () => {
	const navigate = useNavigate()
	const [client] = useState({})
	const [totalPages, setTotalPages] = useState(1)
	const { page, setPage, onChangePage } = usePagination(1, totalPages)
	const [country, setCountry] = useState('')
	const { clients, setClients, isLoading } = useFetchClients({
		country,
		page
	})
	const valuesRute = [
		{ name: 'country', value: country === 'none' ? undefined : country }
	]
	const filterOptions = ['country']
	const { results } = useGetDocumentLength('clients', valuesRute, filterOptions)

	useEffect(() => {
		setFoundClients(clients)
		setTotalPages(results)
	}, [clients, results])

	const filterFunction = (data, value) =>
		data.firstName.toLowerCase().includes(value.toLowerCase()) ||
		data.familyName.toLowerCase().includes(value.toLowerCase()) ||
		data.clientCompany.toLowerCase().includes(value.toLowerCase())

	const {
		filteredData: foundClients,
		searchTerm: searchItem,
		filterList,
		setData: setFoundClients
	} = useFilterList(clients, filterFunction)

	useEffect(() => {
		setPage(1)
	}, [country, setPage])

	const handleClick = () => navigate('/app/client/specs', { state: { client } })

	const clientList = foundClients?.map((client) => (
		<ClientListItem
			key={client._id}
			client={client}
			clients={clients}
			setClients={setClients}
		/>
	))

	return (
		<>
			<ListHeader
				title="Clients"
				handleClick={handleClick}
				searchItem={searchItem}
				filterList={filterList}
				page={page}
				totalPages={totalPages}
				onChangePage={onChangePage}
			>
				<CountryFilter setCountry={setCountry} country={country} />
			</ListHeader>

			<hr />
			<div className="flex flex-row">
				{isLoading ? (
					<Spinner />
				) : (
					<table className="w-full p-5">
						<TableHeaders headers="client" />
						{clientList}
					</table>
				)}
			</div>
		</>
	)
}

export default ClientList
