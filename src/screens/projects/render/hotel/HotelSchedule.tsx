import { toast } from 'react-toastify'
import { toastOptions } from '../../../../helper/toast'
import { useCurrentProject } from '../../../../hooks'
import { HotelList } from './HotelList'
import styles from '../DayEvents.module.css'
import { TableHotel } from './overnight/TableHotel'
import { DELETE_HOTEL_ALERT_CONFIG } from '@helper/mySwalAlert'
import { useSweetAlert } from 'src/hooks/alerts/useSweetAlert'

export const HotelSchedule: React.FC = () => {
	const { removeHotelFromProject, currentProject } = useCurrentProject()
	const { showAlert } = useSweetAlert()

	const handleDeleteHotel = async (hotelId: string) => {
		const result = await showAlert(DELETE_HOTEL_ALERT_CONFIG)
		if (result.isConfirmed) {
			removeHotelFromProject(hotelId)
			toast.success('Hotel Removed', toastOptions)
		}
		return result.isConfirmed
	}

	return (
		<div className="text-white-0">
			{currentProject?.multiDestination ? (
				<div className="mb-4 overflow-x-auto">
					<TableHotel onDelete={handleDeleteHotel} />
				</div>
			) : (
				<div className={styles.dayEventsContainer}>
					<HotelList
						hotels={currentProject['hotels']}
						onDelete={handleDeleteHotel}
					/>
				</div>
			)}
		</div>
	)
}
