import { ListHeader } from '../../../components/molecules'
import { useNotification } from '../context/NotificationContext'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import initialState from '../context/initialState'
import { usePagination } from 'src/hooks/lists/usePagination'
import { ChangeEvent } from 'react'
import { ListTable } from '@components/molecules/table/ListTable'
import { NotificationListItem } from './NotificationListItem'

export const NotificationList = () => {
	const { state, dispatch } = useNotification()
	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentNotification,
		context: 'notification'
	})
	const { changePage } = usePagination({ state, dispatch })

	return (
		<>
			<ListHeader
				title="Notifications"
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
				items={state.notifications || []}
				headers="notification"
				ListItemComponent={NotificationListItem}
				isLoading={
					state.notifications === undefined || state.notifications?.length === 0
				}
			/>
		</>
	)
}
