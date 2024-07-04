import { useNavigate } from 'react-router-dom'
import { useNotification } from '../context/NotificationContext'
import { NotificationFormFields } from './NotificationFormFields'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { resetNotificationFilters } from './resetNotificationFields'

export const NotificationMasterForm = () => {
	const { state, dispatch } = useNotification()
	const navigate = useNavigate()
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const isUpdating = state.update

		if (isUpdating) {
			await updateEntity(
				'notifications',
				state.currentNotification,
				state.notifications || [],
				dispatch
			)
		} else {
			await createEntity(
				'notifications',
				state.currentNotification,
				[],
				dispatch
			)
		}
		resetNotificationFilters(dispatch, {})
		navigate('/app/notification')
	}
	return (
		<form onSubmit={handleSubmit}>
			<NotificationFormFields />
			<div className="flex justify-center m-6">
				<button
					type="submit"
					className="mx-2 px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				>
					Submit
				</button>
			</div>
		</form>
	)
}
