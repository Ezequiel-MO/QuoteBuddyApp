import { ChangeEvent } from 'react'
import CountryListItem from './CountryListItem'
import { ListHeader } from '../../../components/molecules'
import { useCountry } from '../context/CountriesContext'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import initialState from '../context/initialState'
import { usePagination } from 'src/hooks/lists/usePagination'
import { ListTable } from '@components/molecules/table/ListTable'

const CountryList: React.FC = () => {
	const { state, dispatch } = useCountry()
	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentCountry,
		context: 'country'
	})
	const { changePage } = usePagination({ state, dispatch })

	return (
		<>
			<ListHeader
				title="Countries"
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
				items={state.countries || []}
				headers="country"
				ListItemComponent={CountryListItem}
				isLoading={
					state.countries === undefined || state.countries?.length === 0
				}
			/>
		</>
	)
}

export default CountryList
