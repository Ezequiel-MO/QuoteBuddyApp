import { useNavigate } from 'react-router-dom'
import { useTransfer } from '../context/TransfersContext'
import baseAPI from 'src/axios/axiosConfig'
import { toast } from 'react-toastify'
import { toastOptions } from 'src/helper/toast'
import { TransferFormFields } from './TransferFormFields'

export const TransferMasterForm = () => {
	const { state, dispatch } = useTransfer()
	const navigate = useNavigate()

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			if (!state.update) {
				const response = await baseAPI.post(
					'transfers',
					state.currentTransfer,
					{
						headers: {
							'Content-Type': 'application/json'
						}
					}
				)
				const newTransfer = response.data.data.data
				dispatch({
					type: 'SET_TRANSFER',
					payload: newTransfer
				})
				toast.success('Transfer created successfully', toastOptions)
			} else {
				await baseAPI.patch(
					`transfers/${state.currentTransfer?._id}`,
					state.currentTransfer
				)
				toast.success('Transfer updated successfully', toastOptions)
			}
			navigate('/app/transfer')
		} catch (error: any) {
			toast.error(
				`Failed to create/update transfer: ${error.message}`,
				toastOptions
			)
		}
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
