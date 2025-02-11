import { FC, ChangeEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { AudiovisualListItem } from './AudiovisualListItem'
import { CityFilter } from '../../../ui'
import { ListHeader } from '@components/molecules'
import { useAudiovisual } from '../context/AudiovisualsContext'

import { ListTable } from '@components/molecules/table/ListTable'
import initialState from '../context/initialState'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import { usePagination } from 'src/hooks/lists/usePagination'

export const AudiovisualList: FC = () => {
	const { state, dispatch, handleChange, setForceRefresh, isLoading } =
		useAudiovisual()
	const location = useLocation()
	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentAudiovisual,
		context: 'audiovisual'
	})
	const { changePage } = usePagination({ state, dispatch })

	const canBeAddedToProject = location?.state?.canbeAddedToProject ?? false

	return (
		<>
			<ListHeader
				title="Audiovisuals"
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
				<div className="grid grid-cols-2 gap-2">
					<div className="space-y-2">
						<CityFilter
							city={state.currentAudiovisual?.city || ''}
							setCity={(city: string) => {
								handleChange({
									target: { name: 'city', value: city }
								} as ChangeEvent<HTMLInputElement>)
							}}
						/>
					</div>
				</div>
			</ListHeader>

			<hr />
			<ListTable
				items={state.audiovisuals || []}
				headers="audiovisual"
				ListItemComponent={AudiovisualListItem}
				isLoading={isLoading || state.audiovisuals === undefined}
				searchTerm={state.searchTerm}
				canBeAddedToProject={canBeAddedToProject}
			/>
		</>
	)
}
