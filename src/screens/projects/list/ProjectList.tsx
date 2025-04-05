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
import { Button } from 'src/components/atoms'
import { useAuth } from 'src/context/auth/AuthProvider'
import { ProjectListRestoreItem } from './restore/ProjectListRestoreItem'

const classButton = 'flex items-center uppercase  px-3 py-1 text-sm  text-white-0 bg-green-800 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-gray-900 active:scale-95'

export const ProjectList: React.FC = () => {

	const { state, dispatch, setForceRefresh, isLoading, setFilterIsDeleted, filterIsDeleted } = useProject()

	const { auth } = useAuth()

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
				title={!filterIsDeleted ? 'Projects' : 'Projects Restore'}
				titleCreate='Project'
				handleClick={() => {
					setFilterIsDeleted(false)
					createNewItem()
				}}
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
			{auth.role === 'admin' && (
				<div className="flex justify-end  mb-3 mr-2">
					<Button
						icon="hugeicons:data-recovery"
						widthIcon={20}
						newClass={classButton}
						type="button"
						handleClick={() => setFilterIsDeleted((prev) => !prev)}
					>
						{!filterIsDeleted ? `activate restore` : 'exit restore'}
					</Button>
				</div>
			)}
			<hr />
			<ListTable
				items={state.projects || []}
				headers={!filterIsDeleted ? 'project' : 'projectRestore'}
				ListItemComponent={!filterIsDeleted ? ProjectListItem : ProjectListRestoreItem}
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
