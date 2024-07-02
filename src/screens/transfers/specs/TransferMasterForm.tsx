import { useNavigate } from 'react-router-dom'
import { useTransfer } from '../context/TransfersContext'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { toastOptions } from 'src/helper/toast'
import { TransferFormFields } from './TransferFormFields'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { resetTransferFilters } from './resetTransferFields'

export const TransferMasterForm = () => {
	const { state, dispatch } = useTransfer()
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isUpdating = state.update
		if (isUpdating) {
			await updateEntity(
				'transfers',
				state.currentTransfer,
				state.transfers || [],
				dispatch
			)
		} else {
			await createEntity('tranfers', state.currentTransfer, [], dispatch)
		}
		resetTransferFilters(dispatch, {
			city: '',
			company: '',
			vehicleSize: ''
		})
		navigate('/app/transfer')
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-4xl mx-auto p-8 shadow-lg rounded-lg"
		>
			<TransferFormFields />
			<div className="flex justify-center mt-8">
				<button
					type="submit"
					className="mx-2 px-6 py-3 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				>
					Submit
				</button>
			</div>
		</form>
	)
}
