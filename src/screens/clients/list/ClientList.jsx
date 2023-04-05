import { useEffect, useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { CountryFilter, TableHeaders } from '../../../ui'
import ClientListItem from './ClientListItem'
import { useGetClients, useGetDocumentLength } from '../../../hooks'
import { Spinner } from '../../../components/atoms'
import { ListHeader } from '../../../components/molecules'

const ClientList = () => {
	const navigate = useNavigate()
	const [client] = useState({})
	const [page, setPage] = useState(1)
	const [country, setCountry] = useState('')
	const [searchItem, setSearchItem] = useState('')
	const { clients, setClients, isLoading } = useGetClients({
		country: country,
		page: page
	})
	const valuesRute = [
		{ name: 'country', value: country === 'none' ? undefined : country }
	]
	const filterOptions = ['country']
	const { results } = useGetDocumentLength('clients', valuesRute, filterOptions)
	const [foundClients, setFoundClients] = useState([])
	const [totalPages, setTotalPages] = useState(page ?? 1)

	useEffect(() => {
		setFoundClients(clients)
		setTotalPages(results)
	}, [clients, results])

	const filterList = useCallback(
		(e) => {
			setSearchItem(e.target.value)
			const result = clients.filter(
				(data) =>
					data.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
					data.familyName.toLowerCase().includes(e.target.value.toLowerCase())
			)
			setFoundClients(result)
			if (searchItem === '') {
				setFoundClients(clients)
			}
		},
		[clients, searchItem]
	)

	const onChangePage = (direction) => {
		if (direction === 'prev' && page > 1) {
			setPage(page === 1 ? page : page - 1)
		} else if (direction === 'next' && page < totalPages) {
			setPage(page === totalPages ? page : page + 1)
		}
	}

	useMemo(() => {
		setPage(1)
	}, [country])

	const handleClick = () => {
		navigate('/app/client/specs', { state: { client } })
	}

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
