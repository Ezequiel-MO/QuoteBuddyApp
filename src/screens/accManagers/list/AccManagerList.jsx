import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableHeaders } from '../../../ui'
import AccManagerListItem from './AccManagerListItem'
import { useGetAccManagers, useGetDocumentLength } from '../../../hooks'
import { Spinner } from '../../../components/atoms'
import { AccManagerListHeader } from './AccManagerListHeader'

const AccManagerList = () => {
	const navigate = useNavigate()
	const [accManager] = useState({})
	const [searchItem, setSearchItem] = useState('')
	const [page, setPage] = useState(1)
	const { isLoading, accManagers, setAccManagers } = useGetAccManagers(page)
	const { results } = useGetDocumentLength('accManagers')
	const [foundAccManagers, setFoundAccManagers] = useState([])
	const [totalPages, setTotalPages] = useState(page ?? 1)

	useEffect(() => {
		setFoundAccManagers(accManagers)
		setTotalPages(results)
	}, [accManagers, results])

	const filterList = (e) => {
		setSearchItem(e.target.value)
		const result = accManagers.filter(
			(data) =>
				data.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
				data.familyName.toLowerCase().includes(e.target.value.toLowerCase())
		)
		setFoundAccManagers(result)
		if (searchItem === '') {
			setFoundAccManagers(accManagers)
		}
	}

	const onChangePage = (direction) => {
		if (direction === 'prev' && page > 1) {
			setPage(page - 1)
		} else if (direction === 'next' && page < totalPages) {
			setPage(page + 1)
		}
	}

	const handleClick = () => {
		navigate('/app/accManager/specs', { state: { accManager } })
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
			<AccManagerListHeader
				handleClick={handleClick}
				searchItem={searchItem}
				filterList={filterList}
				page={page}
				totalPages={totalPages}
				onChangePage={onChangePage}
			/>

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
