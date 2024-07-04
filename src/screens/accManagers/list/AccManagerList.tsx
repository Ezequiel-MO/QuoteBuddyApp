import { ChangeEvent } from 'react'
import AccManagerListItem from './AccManagerListItem'
import { ListHeader } from '../../../components/molecules'
import { useAccManager } from '../context/AccManagersContext'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import initialState from '../context/initialState'
import { usePagination } from 'src/hooks/lists/usePagination'
import { ListTable } from '@components/molecules/table/ListTable'

const AccManagerList = () => {
	const { state, dispatch } = useAccManager()
	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentAccManager,
		context: 'accManager'
	})
	const { changePage } = usePagination({ state, dispatch })

	return (
		<>
			<ListHeader
				title="Acc Managers"
				handleClick={createNewItem}
				searchItem={state.searchTerm}
				filterList={(e: ChangeEvent<HTMLInputElement>) =>
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}
				page={state.page}
				totalPages={state.totalPages ?? 1}
				onChangePage={changePage}
			/>

			<hr />

			<ListTable
				items={state.accManagers || []}
				headers="accManager"
				ListItemComponent={AccManagerListItem}
				isLoading={
					state.currentAccManager === undefined ||
					state.accManagers?.length === 0
				}
			/>
		</>
	)
}

export default AccManagerList
