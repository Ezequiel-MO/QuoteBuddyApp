import { ListHeader } from '@components/molecules'
import { Spinner } from '@components/atoms'
import { CityFilter, TableHeaders } from 'src/ui'
import { EntertainmentListItem } from './EntertainmentListItem'
import { listStyles } from 'src/constants/listStyles'
import { useEntertainment } from '../context/EntertainmentsContext'
import { useCurrentProject } from 'src/hooks'
import { useNavigate } from 'react-router-dom'
import { ChangeEvent, useEffect } from 'react'
import { IEntertainment } from '@interfaces/entertainment'

export const EntertainmentList = () => {
	const { state, dispatch, handleChange } = useEntertainment()
	const { currentProject } = useCurrentProject()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch({
			type: 'SET_ENTERTAINMENT',
			payload: {
				name: '',
				city: '',
				vendor: '',
				contact: '',
				email: '',
				category: 'Other',
				duration: '',
				nrArtists: '',
				textContent: '',
				price: {
					artistsFee: 0,
					aavv: 0,
					travelAllowance: 0,
					mealAllowance: 0
				},
				imageContentUrl: [],
				descriptions: []
			}
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
			{state.entertainments ? (
				<table className={listStyles.table}>
					<TableHeaders headers="entertainmentShow" />
					{state.entertainments?.map((entertainment: IEntertainment) => (
						<EntertainmentListItem
							key={entertainment._id}
							entertainmentShow={entertainment}
							canBeAddedToProject={currentProject?._id !== undefined}
						/>
					))}
				</table>
			) : (
				<Spinner />
			)}
		</>
	)
}
