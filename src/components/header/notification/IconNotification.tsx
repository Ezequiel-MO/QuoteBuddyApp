import { useState, FC } from 'react'
import { Icon } from '@iconify/react'
import Badge from '@mui/material/Badge'
import { useFetchAccManagers } from 'src/hooks/fetchData/useFetchAccManagers'
import { useFetchNotifications } from 'src/hooks/fetchData/useFetchNotifications'
import { ModalNotifications } from './ModalNotifications'
import { IAccManager } from '@interfaces/accManager'
import { IAccManagerNotification } from '@interfaces/accManagerNotification'
import { useAuth } from 'src/context/auth/AuthProvider'
import { useLocalStorageItem } from 'src/hooks'

interface IconNotificationProps {
	modoleQuery?: 'DBMaster' | 'Projects' | 'FinancialReports' | 'General'
}

export const IconNotification: FC<IconNotificationProps> = ({
	modoleQuery = 'General'
}) => {
	const [openModal, setOpenModal] = useState(false)

	const [accManager] = useLocalStorageItem<IAccManager>('accManager', {} as IAccManager)

	const [forceRefresh, setForceRefresh] = useState(0)
	const {
		notifications: notificationsRead,
		isLoading,
		setData
	} = useFetchNotifications({
		params: `accManager/${accManager._id}/false?module=${modoleQuery}`,
		forceRefresh
	})

	const refresh = () => {
		setForceRefresh((prevCount) => prevCount + 1)
	}

	const handleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation()
		refresh()
		setTimeout(() => {
			setOpenModal((prev) => !prev)
		}, 180)
	}

	if (notificationsRead.length === 0) return null

	return (
		<>
			{!isLoading && (
				<ModalNotifications
					open={openModal}
					setOpen={setOpenModal}
					refresh={refresh}
					notifications={notificationsRead as IAccManagerNotification[]}
				/>
			)}
			<button onClick={(e) => handleOpen(e)}>
				<Badge badgeContent={notificationsRead.length} color="error">
					<Icon
						icon="iconamoon:notification-duotone"
						width="35px"
						className="text-green-700 hover:text-green-400"
					/>
				</Badge>
			</button>
		</>
	)
}
