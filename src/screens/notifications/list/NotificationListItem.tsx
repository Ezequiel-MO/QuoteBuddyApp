import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatDayMonthYear } from 'src/helper'
import { ButtonDeleteWithAuth } from 'src/components/atoms'
import { formatCamelCaseToWords } from "src/helper/helperFunctions"
import { INotafication } from '@interfaces/notification'
import { listStyles } from 'src/constants/listStyles'

interface NotificationListItemProps {
	notification: INotafication
	notifications: INotafication[]
	setNotification: React.Dispatch<React.SetStateAction<INotafication[]>>
}

export const NotificationListItem: FC<NotificationListItemProps> = ({
	notification,
	notifications,
	setNotification
}) => {
	const navigate = useNavigate()

	const handleNavigate = () => {
		navigate('/app/notification/specs', {
			state: { notification: notification }
		})
	}

	const nameModule = (module: string) => {
		if (module === "General" || module === "Projects") {
			return module
		}
		if (module === "DBMaster") {
			return module.slice(0, 2) + " " + module.slice(2)
		}
		return module[0]  + formatCamelCaseToWords(notification.module.slice(1))
	}

	return (
		<tbody className={listStyles.tbody}>
			<tr className={listStyles.tr}>
				<td
					className="hover:text-blue-600 hover:underline cursor-pointer"
					onClick={handleNavigate}
				>
					{notification.title}
				</td>
				<td>
					{
						nameModule(notification.module)
					}
				</td>
				<td className={listStyles.td}>
					{formatDayMonthYear(notification.createdAt as string)}
				</td>
				<td>{formatDayMonthYear(notification.updatedAt as string)}</td>
				<td className="cursor-pointer">
					<ButtonDeleteWithAuth
						endpoint={'notifications'}
						ID={notification._id}
						setter={setNotification}
						items={notifications}
					/>
				</td>
			</tr>
		</tbody>
	)
}
