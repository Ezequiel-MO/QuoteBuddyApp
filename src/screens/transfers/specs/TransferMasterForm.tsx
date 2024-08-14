import { useNavigate } from 'react-router-dom'
import { useTransfer } from '../context/TransfersContext'
import { TransferFormFields } from './TransferFormFields'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { resetTransferFilters } from './resetTransferFields'
import { Button } from '@components/atoms'

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
			await createEntity('transfers', state.currentTransfer, [], dispatch)
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
				<Button type="submit" icon="iconoir:submit-document" widthIcon={30}>
					{state.update ? 'Edit & Exit' : 'Submit'}
				</Button>
			</div>
		</form>
	)
}
