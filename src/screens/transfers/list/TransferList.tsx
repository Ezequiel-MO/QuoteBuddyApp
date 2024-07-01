import { ChangeEvent, FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TransferListItem from './TransferListItem'
import { VehicleSizeFilter, TransferVendorFilter } from '../../../ui'

import { useTransfer } from '../context/TransfersContext'
import { ListHeader } from '@components/molecules'
import { ListTable } from '@components/molecules/table/ListTable'
import { LocationSelector } from '@components/molecules/LocationSelector'
import initialState from '../context/initialState'

const TransferList: FC = () => {
	const { state, dispatch, handleChange } = useTransfer()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch({
			type: 'SET_TRANSFER',
			payload: { ...initialState.currentTransfer }
		})
	}, [dispatch])

	const handleCreateNewTransfer = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: false
		})
		navigate('/app/transfer/specs')
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
				title="Transfers"
				handleClick={handleCreateNewTransfer}
				searchItem={state.searchTerm}
				filterList={undefined}
				page={state.page}
				totalPages={state.totalPages ?? 1}
				onChangePage={handleChangePage}
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
			<hr />
			<ListTable
				items={state.transfers || []}
				headers="transfer"
				ListItemComponent={TransferListItem}
				isLoading={
					state.transfers === undefined || state.transfers?.length === 0
				}
			/>
		</>
	)
}

export default TransferList
