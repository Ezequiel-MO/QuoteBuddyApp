import { ChangeEvent } from 'react'
import { ListHeader } from '../../../components/molecules'
import { useClient } from '../context/ClientContext'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import { usePagination } from 'src/hooks/lists/usePagination'
import initialState from '../context/initialState'
import { CountryFilter } from '@components/atoms'
import { ListTable } from '@components/molecules/table/ListTable'
import ClientListItem from './ClientListItem'

const ClientList = () => {
	const { state, dispatch, handleChange, isLoading } = useClient()
	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentClient,
		context: 'client',
		path: 'app/marketing'
	})
	const { changePage } = usePagination({ state, dispatch })

	return (
		<>
			<ListHeader
				title="Clients"
				handleClick={createNewItem}
				searchItem={state.searchTerm}
				placeHolderSearch="name, email or company"
				filterList={(e: ChangeEvent<HTMLInputElement>) =>
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}
				page={state.page}
				totalPages={state.totalPages ?? 1}
				onChangePage={changePage}
			>
				<CountryFilter
					country={state.currentClient?.country || ''}
					setCountry={(country: string) => {
						handleChange({
							target: { name: 'country', value: country }
						} as ChangeEvent<HTMLInputElement>)
					}}
				/>
			</ListHeader>

			<hr />
			<ListTable
				items={state.clients || []}
				headers="client"
				ListItemComponent={ClientListItem}
				isLoading={isLoading || state.clients === undefined}
				searchTerm={state.searchTerm}
			/>
		</>
	)
}

export default ClientList
