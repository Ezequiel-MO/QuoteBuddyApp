import { ListHeader } from '@components/molecules'
import { CityFilter } from 'src/ui'
import { EntertainmentListItem } from './EntertainmentListItem'
import { useEntertainment } from '../context/EntertainmentsContext'
import { useNavigate } from 'react-router-dom'
import { ChangeEvent, useEffect } from 'react'
import { ListTable } from '@components/molecules/table/ListTable'
import initialState from '../context/initialState'

export const EntertainmentList = () => {
	const { state, dispatch, handleChange } = useEntertainment()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch({
			type: 'SET_ENTERTAINMENT',
			payload: { ...initialState.currentEntertainment }
		})
	}, [dispatch])

	const handleCreateNewEntertainment = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: false
		})
		navigate('/app/entertainment/specs')
	}

	const handleChangePage = (direction: 'prev' | 'next') => {
		const newPage =
			direction === 'prev'
				? Math.max(1, state.page - 1)
				: Math.min(state.totalPages, state.page + 1)
		dispatch({ type: 'SET_PAGE', payload: newPage })
	}

	return (
		<>
			<ListHeader
				title="Entertainment Shows"
				handleClick={handleCreateNewEntertainment}
				searchItem={state.searchTerm}
				filterList={(e: ChangeEvent<HTMLInputElement>) =>
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}
				page={state.page}
				totalPages={state.totalPages ?? 1}
				onChangePage={handleChangePage}
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
				headers="restaurant"
				ListItemComponent={EntertainmentListItem}
				isLoading={
					state.entertainments === undefined ||
					state.entertainments?.length === 0
				}
			/>
		</>
	)
}
