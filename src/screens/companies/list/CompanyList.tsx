import { ChangeEvent } from 'react'
import { CountryFilter } from '../../../components/atoms'
import CompanyListItem from './CompanyListItem'
import { ListHeader } from '../../../components/molecules'
import { useCompany } from '../context/CompanyContext'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import initialState from '../context/initialState'
import { usePagination } from 'src/hooks/lists/usePagination'
import { ListTable } from '@components/molecules/table/ListTable'
import { calculateMarkerSize } from '../../vendor_map/map_utils/MarkerSize'

const CompanyList = () => {
	const { state, dispatch, handleChange, setForceRefresh, isLoading } =
		useCompany()
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
				onChangePage={(direction) => {
					changePage(direction)
					setForceRefresh((prev) => prev + 1)
				}}
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
				isLoading={isLoading || state.companies === undefined}
				searchTerm={state.searchTerm}
				canBeAddedToProject={false}
			/>
		</>
	)
}

export default CompanyList
