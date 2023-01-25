import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableHeaders, SearchInput } from '../../../ui'
import AccManagerListItem from './AccManagerListItem'
import { useGetAccManagers } from '../../../hooks'
import { Pagination, Spinner } from '../../../components/atoms'

const AccManagerList = () => {
	//set state for pagination

	const navigate = useNavigate()
	const [accManager] = useState({})
	const [searchItem, setSearchItem] = useState('')
	const [page, setPage] = useState(1)
	const { isLoading, results, accManagers, setAccManagers } =
		useGetAccManagers(page)
	const [foundAccManagers, setFoundAccManagers] = useState([])
	const [totalPages, setTotalPages] = useState(page ?? 1)

	useEffect(() => {
		setFoundAccManagers(accManagers)
		setTotalPages(results)
	}, [accManagers])

	const filterList = (e) => {
		setSearchItem(e.target.value)
		const result = accManagers.filter(
			(data) =>
				data.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
				data.familyName.toLowerCase().includes(e.target.value.toLowerCase())
		)
		setFoundAccManagers(result)
		if (searchItem === '') {
			setFoundAccManagers(clients)
		}
	}

	const onChangePage = (direction) => {
		if (direction === 'prev' && page > 1) {
			setPage(page - 1)
		} else if (direction === 'next' && page < totalPages) {
			setPage(page + 1)
		}
	}

	const accManagerList = foundAccManagers?.map((accManager) => (
		<AccManagerListItem
			key={accManager._id}
			accManager={accManager}
			accManagers={accManagers}
			setAccManagers={setAccManagers}
		/>
	))

	return (
		<>
			<div className="flex flex-col sm:flex-row sm:items-end items-start sm:space-x-6 mr-8 ml-8 relative">
				<div className="flex flex-col w-full">
					<h1 className="text-2xl">Account Managers List</h1>
					<div className="flex flex-row justify-start items-center mb-1">
						<button
							onClick={() =>
								navigate('/app/accManager/specs', { state: { accManager } })
							}
							className="mr-5 focus:scale-110 hover:animate-pulse bg-transparent hover:bg-orange-50 text-white-100 uppercase font-semibold hover:text-black-50 py-2 px-4 border border-orange-50 hover:border-transparent rounded"
						>
							Create New Account Manager
						</button>
						<SearchInput searchItem={searchItem} filterList={filterList} />
						<div className="absolute right-10 top-[12px]">
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

			<div className="flex-1 m-4 flex-col">
				{isLoading ? (
					<Spinner />
				) : (
					<table className="w-full p-5">
						<TableHeaders headers="accManager" />
						{accManagerList}
					</table>
				)}
			</div>
		</>
	)
}

export default AccManagerList
