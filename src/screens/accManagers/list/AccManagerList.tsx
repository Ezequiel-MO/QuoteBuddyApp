import { ChangeEvent } from 'react'
import AccManagerListItem from './AccManagerListItem'
import { ListHeader } from '../../../components/molecules'
import { useAccManager } from '../context/AccManagersContext'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import initialState from '../context/initialState'
import { usePagination } from 'src/hooks/lists/usePagination'
import { ListTable } from '@components/molecules/table/ListTable'
import { Button } from 'src/components/atoms'
import { useAuth } from 'src/context/auth/AuthProvider'
import { AccManagerListRestoreItem } from './restore/AccManagerListRestoreItem'

const classButton = 'flex items-center uppercase  px-3 py-1 text-sm  text-white-0 bg-green-800 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-gray-900 active:scale-95'

const AccManagerList = () => {

	const { auth } = useAuth()

	const {
		state,
		dispatch,
		setForceRefresh,
		isLoading,
		setFilterIsDeleted,
		filterIsDeleted
	} = useAccManager()

	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentAccManager,
		context: 'accManager'
	})
	const { changePage } = usePagination({ state, dispatch })

	return (
		<>
			<ListHeader
				title={!filterIsDeleted ? 'Acc Managers' : 'Acc Managers Restore'}
				handleClick={() => {
					setFilterIsDeleted(false)
					createNewItem()
				}}
				titleCreate='Acc Manager'
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
			/>
			{
				auth.role === 'admin' &&
				<div className='flex justify-end  mb-3 mr-2'>
					<Button
						icon='hugeicons:data-recovery'
						widthIcon={20}
						newClass={classButton}
						type='button'
						handleClick={() => setFilterIsDeleted(prev => !prev)}
					>
						{!filterIsDeleted ? `activate restore` : 'exit restore'}
					</Button>
				</div>
			}
			<hr />

			<ListTable
				items={state.accManagers || []}
				headers={!filterIsDeleted ? 'accManager' : 'accManagerRestore'}
				ListItemComponent={!filterIsDeleted ? AccManagerListItem : AccManagerListRestoreItem}
				isLoading={isLoading || state.currentAccManager === undefined}
			/>
		</>
	)
}

export default AccManagerList
