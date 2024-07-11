import { ChangeEvent } from 'react'
import { CountryFilter } from '../../../components/atoms'
import CompanyListItem from './CompanyListItem'
import { ListHeader } from '../../../components/molecules'
import { useCompany } from '../context/CompanyContext'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import initialState from '../context/initialState'
import { usePagination } from 'src/hooks/lists/usePagination'
import { ListTable } from '@components/molecules/table/ListTable'

const CompanyList = () => {
	const { state, dispatch, handleChange } = useCompany()
	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentCompany,
		context: 'company',
		path: 'app/marketing'
	})
	const { changePage } = usePagination({ state, dispatch })

	return (
		<>
			<ListHeader
				title="Companies"
				handleClick={createNewItem}
				searchItem={state.searchTerm}
				filterList={(e: ChangeEvent<HTMLInputElement>) =>
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}
				page={state.page}
				totalPages={state.totalPages ?? 1}
				onChangePage={changePage}
			>
				<CountryFilter
					country={state.currentCompany?.country || ''}
					setCountry={(country: string) => {
						handleChange({
							target: { name: 'country', value: country }
						} as ChangeEvent<HTMLInputElement>)
					}}
				/>
			</ListHeader>

			<hr />
			<ListTable
				items={state.companies || []}
				headers="company"
				ListItemComponent={CompanyListItem}
				isLoading={
					state.companies === undefined || state.companies?.length === 0
				}
			/>
		</>
	)
}

export default CompanyList
