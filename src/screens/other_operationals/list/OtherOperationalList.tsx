import { FC, ChangeEvent } from 'react'
import { ListHeader } from '../../../components/molecules'
import { useOtherOperational } from '../context/OtherOperationalsContext'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import initialState from '../context/initialState'
import { usePagination } from 'src/hooks/lists/usePagination'
import { ListTable } from '@components/molecules/table/ListTable'
import { OtherOperationalListItem } from './OtherOperationalListItem'
import { CityFilter } from '@components/atoms'
import { Button } from 'src/components/atoms'
import { useAuth } from 'src/context/auth/AuthProvider'
import { OtherOperationalListRestoreItem } from './restore/OtherOperationalListRestoreItem'

const classButton =
	'flex items-center uppercase  px-3 py-1 text-sm  text-white-0 bg-green-800 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-gray-900 active:scale-95'

export const OtherOperationalList: FC = () => {
	const {
		state,
		dispatch,
		handleChange,
		setForceRefresh,
		isLoading,
		setFilterIsDeleted,
		filterIsDeleted
	} = useOtherOperational()

	const { auth } = useAuth()

	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentOtherOperational,
		context: 'other_operational',
		dispatchType:'OTHEROPERATIONAL'
	})
	const { changePage } = usePagination({ state, dispatch })

	return (
		<>
			<ListHeader
				title={
					!filterIsDeleted ? 'Other Operationals' : 'Other Operationals Restore'
				}
				titleCreate="Other Operational"
				handleClick={() => {
					setFilterIsDeleted(false)
					createNewItem()
				}}
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
				<CityFilter
					city={state.currentOtherOperational?.city || ''}
					setCity={(city: string) => {
						handleChange({
							target: { name: 'city', value: city }
						} as ChangeEvent<HTMLInputElement>)
					}}
				/>
			</ListHeader>
			{auth.role === 'admin' && (
				<div className="flex justify-end mb-3 mr-2">
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
			<div className={filterIsDeleted ? 'mb-40' : ''}>
				<ListTable
					items={state.otherOperationals || []}
					headers={
						!filterIsDeleted ? 'otherOperational' : 'otherOperationalRestore'
					}
					ListItemComponent={!filterIsDeleted ? OtherOperationalListItem : OtherOperationalListRestoreItem}
					isLoading={isLoading}
					searchTerm={state.searchTerm}
					canBeAddedToProject={false}
				/>
			</div>
		</>
	)
}
