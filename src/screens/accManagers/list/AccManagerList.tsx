import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableHeaders } from '../../../ui'
import AccManagerListItem from './AccManagerListItem'
import {
	useFilterList,
	useGetDocumentLength,
	usePagination
} from '../../../hooks'
import { Spinner } from '../../../components/atoms'
import { ListHeader } from '../../../components/molecules'
import { useFetchAccManagers } from 'src/hooks/fetchData/useFetchAccManagers'
import { listStyles } from 'src/constants/listStyles'
import { IAccManager } from '@interfaces/accManager'

const AccManagerList = () => {
	const navigate = useNavigate()
	const [accManager] = useState({} as IAccManager)
	const [totalPages, setTotalPages] = useState(1)
	const { page, onChangePage } = usePagination(1, totalPages)
	const { isLoading, accManagers, setAccManagers } = useFetchAccManagers({
		page
	})
	const { results } = useGetDocumentLength('accManagers')

	const filterFunction = (data: IAccManager, value: string) =>
		data.firstName.toLowerCase().includes(value.toLowerCase()) ||
		data.familyName.toLowerCase().includes(value.toLowerCase())

	const {
		filteredData: foundAccManagers,
		searchTerm: searchItem,
		filterList,
		setData: setFoundAccManagers
	} = useFilterList(accManagers, filterFunction)

	useEffect(() => {
		if (accManagers.length > 0) {
			setFoundAccManagers(accManagers)
			setTotalPages(results)
		}
	}, [accManagers, results, setFoundAccManagers])

	const navigateToAccManagerSpecs = useCallback(
		(accManager: IAccManager) => {
			navigate('/app/accManager/specs', { state: { accManager } })
		},
		[navigate]
	)

	return (
		<>
			<ListHeader
				title="Acc Managers"
				handleClick={() => navigateToAccManagerSpecs(accManager)}
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
					<table className={listStyles.table}>
						<TableHeaders headers="accManager" />
						{foundAccManagers?.map((accManager) => (
							<AccManagerListItem
								key={accManager._id}
								accManager={accManager}
								accManagers={accManagers}
								setAccManagers={setAccManagers}
								handleNavigate={navigateToAccManagerSpecs}
							/>
						))}
					</table>
				)}
			</div>
		</>
	)
}

export default AccManagerList
