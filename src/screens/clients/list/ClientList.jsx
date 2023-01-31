import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { CountryFilter, TableHeaders, SearchInput } from '../../../ui'
import ClientListItem from './ClientListItem'
import {
	useCurrentInvoice,
	useGetClients,
	useGetDocumentLength
} from '../../../hooks'
import { Spinner, Pagination } from '../../../components/atoms'

const ClientList = () => {
	const navigate = useNavigate()
	const [client] = useState({})
	const [page, setPage] = useState(1)
	const [country, setCountry] = useState('')
	const [searchItem, setSearchItem] = useState('')
	const { clients, setClients, isLoading } = useGetClients(country , page)
	const valuesRute = [
		{ name: "country", value: country === "none" ? undefined : country }
	]
	const filterOptions = ["country"]
	const { results } = useGetDocumentLength(
		'clients',
		valuesRute,
		filterOptions
	)
	const [foundClients, setFoundClients] = useState([])
	const [totalPages, setTotalPages] = useState(page ?? 1)

	const { changePostingStatus } = useCurrentInvoice()

	useEffect(() => {
		setFoundClients(clients)
		setTotalPages(results)
	}, [clients , results])

	const filterList = (e) => {
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
	}

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
		changePostingStatus('posting')
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
			<div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mb-4 mr-8 ml-8">
				<div className="flex flex-col w-full">
					<h1 className="text-2xl">Client List</h1>
					<div className="flex flex-row justify-start items-center">
						<div>
							<CountryFilter setCountry={setCountry} country={country} />
						</div>
						<button
							onClick={handleClick}
							className="mx-5 focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
						>
							Create New Client
						</button>
						<SearchInput searchItem={searchItem} filterList={filterList} />
						<div className="absolute right-10 top-[170px]">
							<Pagination
								page={page}
								totalPages={totalPages}
								onChangePage={onChangePage}
							/>
						</div>
					</div>
				</div>
			</div>
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
