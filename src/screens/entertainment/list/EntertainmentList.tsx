import { ChangeEvent } from 'react'
import { ListHeader } from '@components/molecules'
import { CityFilter } from 'src/ui'
import { EntertainmentListItem } from './EntertainmentListItem'
import { useEntertainment } from '../context/EntertainmentsContext'
import { ListTable } from '@components/molecules/table/ListTable'
import initialState from '../context/initialState'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import { usePagination } from 'src/hooks/lists/usePagination'
import { useLocation } from 'react-router-dom'


export const EntertainmentList = () => {
	const { state, dispatch, handleChange } = useEntertainment()
	const location = useLocation()
	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentEntertainment,
		context: 'entertainment'
	})
	const { changePage } = usePagination({ state, dispatch })

	const canBeAddedToProject = location?.state?.canbeAddedToProject ?? false


	return (
		<>
			<ListHeader
				title="Entertainment Shows"
				handleClick={createNewItem}
				searchItem={state.searchTerm}
				filterList={(e: ChangeEvent<HTMLInputElement>) =>
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}
				page={state.page}
				totalPages={state.totalPages ?? 1}
				onChangePage={changePage}
			>
				<CityFilter
					city={state.currentEntertainment?.city || ''}
					setCity={(city: string) => {
						handleChange({
							target: { name: 'city', value: city }
						} as ChangeEvent<HTMLInputElement>)
					}}
				/>
				{/* <LanguageFilter language={language} setLanguage={setLanguage} /> */}
			</ListHeader>
			<hr />
			<ListTable
				items={state.entertainments || []}
				headers="entertainmentShow"
				ListItemComponent={EntertainmentListItem}
				isLoading={
					state.entertainments === undefined ||
					state.entertainments?.length === 0
				}
				canBeAddedToProject={canBeAddedToProject}
			/>
		</>
	)
}
