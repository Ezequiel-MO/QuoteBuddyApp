import { ChangeEvent } from 'react'
import { ListHeader } from '../../../components/molecules'
import { useClient } from '../context/ClientContext'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import { usePagination } from 'src/hooks/lists/usePagination'
import initialState from '../context/initialState'
import { CountryFilter } from '@components/atoms'
import { ListTable } from '@components/molecules/table/ListTable'
import ClientListItem from './ClientListItem'
import { Button } from 'src/components/atoms'
import { useAuth } from 'src/context/auth/AuthProvider'
import {ClientListRestoreItem} from './restore/ClientListRestoreItem'

const classButton = 'flex items-center uppercase  px-3 py-1 text-sm  text-white-0 bg-green-800 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-gray-900 active:scale-95'


const ClientList = () => {

	const {
		state,
		dispatch,
		handleChange,
		isLoading,
		setForceRefresh,
		setFilterIsDeleted,
		filterIsDeleted
	} = useClient()

	const { auth } = useAuth()

	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentClient,
		context: 'client',
		path: 'app/marketing'
	})
	const { changePage } = usePagination({ state, dispatch })

	return (
		<>
			<ListHeader
				title={!filterIsDeleted ? 'Clients' : 'Clients Restore'}
				handleClick={() => {
					setFilterIsDeleted(false)
					createNewItem()
				}}
				titleCreate='Client'
				searchItem={state.searchTerm}
				placeHolderSearch="name, email"
				filterList={(e: ChangeEvent<HTMLInputElement>) =>
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}
				page={state.page ?? 1}
				totalPages={state.totalPages ?? 1}
				onChangePage={(direction) => {
					setForceRefresh((prev) => prev + 1)
					changePage(direction)
				}}
			>
				<CountryFilter
					country={state.currentClient?.country || ''}
					setCountry={(country: string) => {
						handleChange({
							target: { name: 'country', value: country }
						} as ChangeEvent<HTMLInputElement>)
					}}
				/>
			</ListHeader>
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
				items={state.clients || []}
				headers={!filterIsDeleted ? 'client' : 'clientRestore' }
				ListItemComponent={!filterIsDeleted ? ClientListItem : ClientListRestoreItem}
				isLoading={isLoading || state.clients === undefined}
				searchTerm={state.searchTerm}
			/>
		</>
	)
}

export default ClientList
