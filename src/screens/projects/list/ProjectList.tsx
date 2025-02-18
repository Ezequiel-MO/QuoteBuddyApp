import { ChangeEvent, useEffect } from 'react'
import { CityFilter } from '../../../components/atoms'
import { ProjectListItem } from './ProjectListItem'
import { useProject } from '../context/ProjectContext'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import initialState from '../context/initialState'
import { usePagination } from 'src/hooks/lists/usePagination'
import { ListHeader } from '@components/molecules'
import { ListTable } from '@components/molecules/table/ListTable'
import { useCurrentProject } from 'src/hooks'
import { ContractPdfModal } from '../specs/modal/ContractPdfModal'

export const ProjectList: React.FC = () => {
	const { state, dispatch, setForceRefresh, isLoading } = useProject()
	const { clearProject } = useCurrentProject()
	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentProject,
		context: 'project'
	})

	useEffect(() => {
		return () => {
			dispatch({ type: 'SET_SEARCH_TERM', payload: '' })
			dispatch({ type: 'SET_GROUP_LOCATION', payload: '' })
		}
	}, [])

	useEffect(() => {
		dispatch({ type: 'SET_PAGE', payload: 1 })
	}, [state.searchTerm, state.groupLocation])

	const { changePage } = usePagination({ state, dispatch })

	const handleCreateNewItem = () => {
		clearProject()
		createNewItem()
	}

	return (
		<div className="h-screen">
			<ListHeader
				title="Projects"
				handleClick={handleCreateNewItem}
				searchItem={state.searchTerm}
				filterList={(e: ChangeEvent<HTMLInputElement>) =>
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}
				page={state.page ?? 1}
				totalPages={state.totalPages ?? 1}
				onChangePage={(direction) => {
					changePage(direction)
					setForceRefresh((prev) => prev + 1)
				}}
			>
				<CityFilter
					city={state.groupLocation || ''}
					setCity={(city: string) => {
						dispatch({
							type: 'SET_GROUP_LOCATION',
							payload: city
						})
					}}
				/>
			</ListHeader>
			<hr />
			<ListTable
				items={state.projects || []}
				headers="project"
				ListItemComponent={ProjectListItem}
				isLoading={isLoading || state.projects === undefined}
				canBeAddedToProject={false}
				searchTerm={state.searchTerm}
			/>
			<ContractPdfModal
				isOpen={state.imagesModal}
				onClose={() =>
					dispatch({ type: 'SET_IMAGES_MODAL_OPEN', payload: false })
				}
				projectId={state.currentProject?._id || ''}
				refreshProject={() => setForceRefresh((prev) => prev + 1)}
			/>
		</div>
	)
}
