import { useNavigate } from 'react-router-dom'
import { useNotification } from '../context/NotificationContext'
import { NotificationFormFields } from './NotificationFormFields'
import { updateEntity } from 'src/helper/forms/updateEntity'
import { createEntity } from 'src/helper/forms/createEntity'
import { resetNotificationFilters } from './resetNotificationFields'
import { Button } from '@components/atoms'

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
				<Button type="submit" icon="iconoir:submit-document" widthIcon={30}>
					{state.update ? 'Edit & Exit' : 'Submit'}
				</Button>
			</div>
		</form>
	)
}
