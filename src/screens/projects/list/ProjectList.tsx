import { ChangeEvent } from 'react'
import { CityFilter } from '../../../components/atoms'
import { ProjectListItem } from './ProjectListItem'
import { useProject } from '../context/ProjectContext'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import initialState from '../context/initialState'
import { usePagination } from 'src/hooks/lists/usePagination'
import { ListHeader } from '@components/molecules'
import { ListTable } from '@components/molecules/table/ListTable'

export const ProjectList: React.FC = () => {
	const { state, dispatch, handleChange } = useProject()
	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentProject,
		context: 'project'
	})
	const { changePage } = usePagination({ state, dispatch })

	return (
		<>
			<ListHeader
				title="Projects"
				handleClick={createNewItem}
				searchItem={state.searchTerm}
				filterList={(e: ChangeEvent<HTMLInputElement>) =>
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}
				page={state.page ?? 1}
				totalPages={state.totalPages ?? 1}
				onChangePage={changePage}
			>
				<CityFilter
					city={state.currentProject?.groupLocation || ''}
					setCity={(city: string) => {
						handleChange({
							target: { name: 'groupLocation', value: city }
						} as ChangeEvent<HTMLInputElement>)
					}}
				/>
			</ListHeader>
			<hr />
			<ListTable
				items={state.projects || []}
				headers="project"
				ListItemComponent={ProjectListItem}
				isLoading={state.projects === undefined || state.projects?.length === 0}
			/>
		</>
	)
}
