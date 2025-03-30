import { ChangeEvent, FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TransferListItem from './TransferListItem'
import { VehicleSizeFilter, TransferVendorFilter } from '../../../ui'
import { useTransfer } from '../context/TransfersContext'
import { ListHeader } from '@components/molecules'
import { ListTable } from '@components/molecules/table/ListTable'
import { LocationSelector } from '@components/molecules/LocationSelector'
import initialState from '../context/initialState'
import { useCreateNewItem } from 'src/hooks/forms/useCreateNewItem'
import { usePagination } from 'src/hooks/lists/usePagination'
import { Button } from 'src/components/atoms'
import { useAuth } from 'src/context/auth/AuthProvider'
import { TransferListRestoreItem } from './restore/TransferListRestoreItem'

const classButton =
	'flex items-center uppercase  px-3 py-1 text-sm  text-white-0 bg-green-800 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:bg-green-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:bg-gray-900 active:scale-95'

const TransferList: FC = () => {
	const {
		state,
		dispatch,
		handleChange,
		isLoading,
		setForceRefresh,
		setFilterIsDeleted,
		filterIsDeleted
	} = useTransfer()

	const { auth } = useAuth()

	const { createNewItem } = useCreateNewItem({
		dispatch,
		initialState: initialState.currentTransfer,
		context: 'transfer'
	})
	const { changePage } = usePagination({ state, dispatch })

	return (
		<>
			<ListHeader
				title={!filterIsDeleted ? 'Transfers' : 'Transfers Restore'}
				titleCreate="Transfer"
				handleClick={() => {
					setFilterIsDeleted(false)
					createNewItem()
				}}
				searchItem={state.searchTerm}
				placeHolderSearch="company name"
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
				<div className="sm:w-[300px]">
					<LocationSelector
						city={state.currentTransfer?.city as string}
						name="city"
						handleChange={handleChange}
					/>
				</div>
				<TransferVendorFilter
					setCompany={(e: ChangeEvent<HTMLSelectElement>) =>
						handleChange({
							target: { name: 'company', value: e.target.value }
						} as ChangeEvent<HTMLInputElement>)
					}
					company={state.currentTransfer?.company || ''}
					city={state.currentTransfer?.city || ''}
				/>
				<VehicleSizeFilter
					setVehicleCapacity={(e: ChangeEvent<HTMLSelectElement>) =>
						handleChange({
							target: { name: 'vehicleCapacity', value: e.target.value }
						} as ChangeEvent<HTMLInputElement>)
					}
					vehicleCapacity={
						state.currentTransfer?.vehicleCapacity?.toString() || ''
					}
					company={state.currentTransfer?.company || ''}
					city={state.currentTransfer?.city || ''}
				/>
			</ListHeader>
			{auth.role === 'admin' && (
				<div className="flex justify-end -mt-8 mb-3 mr-2">
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
					items={state.transfers || []}
					headers={!filterIsDeleted ? 'transfer' : 'transferRestore'}
					ListItemComponent={!filterIsDeleted ? TransferListItem : TransferListRestoreItem}
					isLoading={isLoading || state.transfers === undefined}
					searchTerm={state.searchTerm}
				/>
			</div>
		</>
	)
}

export default TransferList
