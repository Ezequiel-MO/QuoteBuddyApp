import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDayMonthYear } from 'src/helper'
import { ButtonDeleteWithAuth } from 'src/components/atoms'
import { formatCamelCaseToWords } from 'src/helper/helperFunctions'
import { INotification } from '@interfaces/notification'
import { listStyles } from 'src/constants/listStyles'
import { useNotification } from '../context/NotificationContext'

interface NotificationListItemProps {
	item: INotification
	canBeAddedToProject: boolean
}

export const NotificationListItem: FC<NotificationListItemProps> = ({
	item: notification,
	canBeAddedToProject = false
}) => {
	const { state, dispatch } = useNotification()
	const navigate = useNavigate()
	const [open, setOpen] = useState(false)

	const handleNavigateToNotificationSpecs = () => {
		dispatch({
			type: 'TOGGLE_UPDATE',
			payload: true
		})
		dispatch({
			type: 'SET_NOTIFICATION',
			payload: notification
		})
		navigate('/app/notification/specs')
	}

	const nameModule = (module: string) => {
		if (module === 'General' || module === 'Projects') {
			return module
		}
		if (module === 'DBMaster') {
			return module.slice(0, 2) + ' ' + module.slice(2)
		}
		return module[0] + formatCamelCaseToWords(notification.module.slice(1))
	}

	return (
		<tbody className={listStyles.tbody}>
			<tr className={listStyles.tr}>
				<td
					className="hover:text-blue-600 hover:underline cursor-pointer"
					onClick={handleNavigateToNotificationSpecs}
				>
					{notification.title}
				</td>
				<td>{nameModule(notification.module)}</td>
				<td className={listStyles.td}>
					{formatDayMonthYear(notification.createdAt as string)}
				</td>
				<td>{formatDayMonthYear(notification.updatedAt as string)}</td>
				<td className="cursor-pointer">
					<ButtonDeleteWithAuth
						endpoint={'notifications'}
						ID={notification._id}
						setter={(updatedNotifications: INotification[]) =>
							dispatch({
								type: 'SET_NOTIFICATIONS',
								payload: updatedNotifications
							})
						}
						items={state.notifications || []}
					/>
				</td>
			</tr>
		</tbody>
	)
}
