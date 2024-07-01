import { ChangeEvent, FC, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TransferListItem from './TransferListItem'
import {
	VehicleSizeFilter,
	CityFilter,
	TransferVendorFilter,
	TransferServiceFilter
} from '../../../ui'

import { useTransfer } from '../context/TransfersContext'
import { ListHeader } from '@components/molecules'
import { ListTable } from '@components/molecules/table/ListTable'

const TransferList: FC = () => {
	const { state, dispatch, handleChange } = useTransfer()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch({
			type: 'SET_TRANSFER',
			payload: {
				city: '',
				company: '',
				transfer_in: 0,
				transfer_out: 0,
				dispo_4h: 0,
				hextra: 0,
				hextra_night: 0,
				dispo_5h_out: 0,
				dispo_4h_airport: 0,
				dispo_4h_night: 0,
				transfer_in_out_night: 0,
				dispo_6h: 0,
				dispo_6h_night: 0,
				dispo_9h: 0,
				vehicleType: '',
				vehicleCapacity: 0,
				nrVehicles: 0,
				meetGreet: 0,
				meetGreetCost: 0,
				assistance: 0,
				assistanceCost: 0,
				selectedService: ''
			}
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
				filterList={(e: ChangeEvent<HTMLInputElement>) =>
					dispatch({ type: 'SET_SEARCH_TERM', payload: e.target.value })
				}
				page={state.page}
				totalPages={state.totalPages ?? 1}
				onChangePage={handleChangePage}
			>
				<CityFilter
					city={state.currentTransfer?.city || ''}
					setCity={(city: string) => {
						handleChange({
							target: { name: 'city', value: city }
						} as ChangeEvent<HTMLInputElement>)
					}}
				/>
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
